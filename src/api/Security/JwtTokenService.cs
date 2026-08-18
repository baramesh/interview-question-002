using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Example.InterviewQuestion002.Api.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Example.InterviewQuestion002.Api.Security;

public sealed class JwtTokenService(IOptions<JwtOptions> options)
{
    private readonly JwtOptions _options = options.Value;

    public LoginToken Create(AppUser user)
    {
        var now = DateTime.UtcNow;
        var expires = now.AddMinutes(_options.ExpiresMinutes);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SigningKey)),
            SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            now,
            expires,
            credentials);

        return new LoginToken(
            new JwtSecurityTokenHandler().WriteToken(token),
            "Bearer",
            checked((int)(expires - now).TotalSeconds));
    }
}

public sealed record LoginToken(string AccessToken, string TokenType, int ExpiresIn);
