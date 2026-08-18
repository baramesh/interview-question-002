namespace Example.InterviewQuestion002.Api.Security;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";
    public required string Issuer { get; init; }
    public required string Audience { get; init; }
    public required string SigningKey { get; init; }
    public int ExpiresMinutes { get; init; } = 15;
}
