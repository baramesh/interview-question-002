using System.Buffers.Binary;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Example.InterviewQuestion002.Api.Contracts;
using Example.InterviewQuestion002.Api.Controllers;
using Example.InterviewQuestion002.Api.Data;
using Example.InterviewQuestion002.Api.Models;
using Example.InterviewQuestion002.Api.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace InterviewQuestion002.Api.Tests;

public sealed class AuthenticationTests
{
    [Theory]
    [InlineData("ab")]
    [InlineData("invalid user")]
    public void Register_rejects_invalid_username(string username)
    {
        var request = new RegisterRequest { Username = username, Password = "StrongPass1", ConfirmPassword = "StrongPass1" };
        Assert.False(IsValid(request));
    }

    [Theory]
    [InlineData("")]
    [InlineData("short1A")]
    [InlineData("1234567")]
    public void Register_rejects_password_shorter_than_eight_characters(string password)
    {
        var request = new RegisterRequest { Username = "tester", Password = password, ConfirmPassword = password };
        Assert.False(IsValid(request));
    }

    [Fact]
    public void Register_accepts_passwords_without_composition_rules()
    {
        var request = new RegisterRequest
        {
            Username = "tester",
            Password = "all lowercase passphrase",
            ConfirmPassword = "all lowercase passphrase"
        };
        Assert.True(IsValid(request));
    }

    [Fact]
    public void Register_rejects_mismatched_confirmation()
    {
        var request = new RegisterRequest { Username = "tester", Password = "StrongPass1", ConfirmPassword = "StrongPass2" };
        Assert.False(IsValid(request));
    }

    [Fact]
    public void Username_normalization_is_trimmed_and_case_insensitive()
    {
        Assert.Equal("BARAMESH.USER", CredentialRules.NormalizeUsername("  Baramesh.User "));
    }

    [Fact]
    public void Password_hash_is_not_plaintext_and_can_be_verified()
    {
        var user = User("tester");
        var hasher = SecureHasher();
        user.PasswordHash = hasher.HashPassword(user, "StrongPass1");
        Assert.NotEqual("StrongPass1", user.PasswordHash);
        Assert.NotEqual(PasswordVerificationResult.Failed, hasher.VerifyHashedPassword(user, user.PasswordHash, "StrongPass1"));
    }

    [Fact]
    public void Password_hash_uses_the_documented_pbkdf2_work_factor()
    {
        var hash = Convert.FromBase64String(SecureHasher().HashPassword(User("tester"), "StrongPass1"));
        var iterations = BinaryPrimitives.ReadUInt32BigEndian(hash.AsSpan(5, 4));
        Assert.Equal(220_000U, iterations);
    }

    [Fact]
    public async Task Register_creates_a_hashed_user()
    {
        await using var db = CreateDb();
        var controller = Controller(db);
        var result = await controller.Register(
            new RegisterRequest { Username = "Tester", Password = "StrongPass1", ConfirmPassword = "StrongPass1" },
            CancellationToken.None);
        Assert.IsType<ObjectResult>(result);
        var user = Assert.Single(db.Users);
        Assert.Equal("TESTER", user.NormalizedUsername);
        Assert.NotEqual("StrongPass1", user.PasswordHash);
    }

    [Fact]
    public async Task Register_returns_conflict_for_duplicate_username()
    {
        await using var db = CreateDb();
        db.Users.Add(User("tester"));
        await db.SaveChangesAsync();
        var result = await Controller(db).Register(
            new RegisterRequest { Username = "TESTER", Password = "StrongPass1", ConfirmPassword = "StrongPass1" },
            CancellationToken.None);
        Assert.IsType<ConflictObjectResult>(result);
    }

    [Fact]
    public async Task Login_returns_a_signed_jwt_for_valid_credentials()
    {
        await using var db = CreateDb();
        var user = User("tester");
        var hasher = SecureHasher();
        user.PasswordHash = hasher.HashPassword(user, "StrongPass1");
        db.Users.Add(user);
        await db.SaveChangesAsync();
        var result = await Controller(db, hasher).Login(
            new LoginRequest { Username = "tester", Password = "StrongPass1" }, CancellationToken.None);
        var token = Assert.IsType<LoginToken>(Assert.IsType<OkObjectResult>(result.Result).Value);
        Assert.Equal("Bearer", token.TokenType);
        Assert.Equal(3, token.AccessToken.Split('.').Length);
    }

    [Fact]
    public async Task Login_returns_the_same_generic_error_for_unknown_user_or_wrong_password()
    {
        await using var db = CreateDb();
        var unknown = await Controller(db).Login(
            new LoginRequest { Username = "unknown", Password = "WrongPass1" }, CancellationToken.None);
        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(unknown.Result);
        var details = Assert.IsType<ProblemDetails>(unauthorized.Value);
        Assert.Equal("Invalid username or password.", details.Title);
    }

    [Fact]
    public void Jwt_contains_expected_identity_and_lifetime_claims()
    {
        var token = TokenService().Create(User("tester"));
        var parsed = new JwtSecurityTokenHandler().ReadJwtToken(token.AccessToken);
        Assert.Equal("https://auth.example.com", parsed.Issuer);
        Assert.Contains("https://question-002.example.com", parsed.Audiences);
        Assert.Equal("tester", parsed.Claims.Single(item => item.Type == JwtRegisteredClaimNames.UniqueName).Value);
        Assert.True(parsed.ValidTo > DateTime.UtcNow);
        Assert.Equal(900, token.ExpiresIn);
    }

    [Fact]
    public void Me_returns_username_only_from_validated_claims()
    {
        using var db = CreateDb();
        var controller = Controller(db);
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(
                    [new Claim(JwtRegisteredClaimNames.UniqueName, "tester")], "Bearer"))
            }
        };
        var result = Assert.IsType<OkObjectResult>(controller.GetCurrentUser());
        Assert.Contains("tester", result.Value?.ToString());
    }

    private static bool IsValid(object value)
    {
        var results = new List<ValidationResult>();
        return Validator.TryValidateObject(value, new ValidationContext(value), results, true);
    }

    private static ApplicationDbContext CreateDb() => new(new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

    private static AppUser User(string username) => new()
    {
        Username = username,
        NormalizedUsername = CredentialRules.NormalizeUsername(username),
        PasswordHash = "not-set",
        CreatedAtUtc = DateTime.UtcNow
    };

    private static AuthController Controller(ApplicationDbContext db, IPasswordHasher<AppUser>? hasher = null) =>
        new(db, hasher ?? SecureHasher(), TokenService());

    private static PasswordHasher<AppUser> SecureHasher() => new(Options.Create(
        new PasswordHasherOptions { IterationCount = 220_000 }));

    private static JwtTokenService TokenService() => new(Options.Create(new JwtOptions
    {
        Issuer = "https://auth.example.com",
        Audience = "https://question-002.example.com",
        SigningKey = "unit-test-signing-key-with-at-least-32-bytes-002",
        ExpiresMinutes = 15
    }));
}
