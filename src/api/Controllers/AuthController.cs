using System.IdentityModel.Tokens.Jwt;
using Example.InterviewQuestion002.Api.Contracts;
using Example.InterviewQuestion002.Api.Data;
using Example.InterviewQuestion002.Api.Models;
using Example.InterviewQuestion002.Api.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Example.InterviewQuestion002.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    ApplicationDbContext dbContext,
    IPasswordHasher<AppUser> passwordHasher,
    JwtTokenService tokenService) : ControllerBase
{
    private const string InvalidCredentialsMessage = "Invalid username or password.";
    private static readonly AppUser DummyUser = new()
    {
        Username = "dummy",
        NormalizedUsername = "DUMMY",
        PasswordHash = string.Empty
    };
    private static readonly string DummyHash = new PasswordHasher<AppUser>(Options.Create(
        new PasswordHasherOptions { IterationCount = 220_000 }))
        .HashPassword(DummyUser, "NeverValid1");

    [HttpPost("register")]
    [AllowAnonymous]
    [EnableRateLimiting("register-attempt")]
    public async Task<ActionResult> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var username = request.Username.Trim();
        var normalized = CredentialRules.NormalizeUsername(username);
        if (await dbContext.Users.AnyAsync(item => item.NormalizedUsername == normalized, cancellationToken))
        {
            return Conflict(new ProblemDetails
            {
                Status = StatusCodes.Status409Conflict,
                Title = "Username is already registered."
            });
        }

        var user = new AppUser
        {
            Username = username,
            NormalizedUsername = normalized,
            PasswordHash = string.Empty,
            CreatedAtUtc = DateTime.UtcNow
        };
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
        dbContext.Users.Add(user);

        try
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            return Conflict(new ProblemDetails
            {
                Status = StatusCodes.Status409Conflict,
                Title = "Username is already registered."
            });
        }

        return StatusCode(StatusCodes.Status201Created,
            new { username = user.Username, message = "Account created successfully." });
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login-attempt")]
    public async Task<ActionResult<LoginToken>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var normalized = CredentialRules.NormalizeUsername(request.Username);
        var user = await dbContext.Users.SingleOrDefaultAsync(
            item => item.NormalizedUsername == normalized,
            cancellationToken);
        var result = passwordHasher.VerifyHashedPassword(
            user ?? DummyUser,
            user?.PasswordHash ?? DummyHash,
            request.Password);

        if (user is null || result == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new ProblemDetails
            {
                Status = StatusCodes.Status401Unauthorized,
                Title = InvalidCredentialsMessage
            });
        }

        if (result == PasswordVerificationResult.SuccessRehashNeeded)
        {
            user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        return Ok(tokenService.Create(user));
    }

    [HttpGet("me")]
    [Authorize]
    public ActionResult GetCurrentUser()
    {
        var username = User.FindFirst(JwtRegisteredClaimNames.UniqueName)?.Value ?? User.Identity?.Name;
        return string.IsNullOrWhiteSpace(username)
            ? Unauthorized()
            : Ok(new { username });
    }
}
