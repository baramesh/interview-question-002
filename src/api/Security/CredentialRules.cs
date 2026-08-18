namespace Example.InterviewQuestion002.Api.Security;

public static class CredentialRules
{
    public static string NormalizeUsername(string username) => username.Trim().ToUpperInvariant();

    public static bool IsStrongPassword(string password) =>
        password.Length is >= 8 and <= 128 &&
        password.Any(char.IsUpper) &&
        password.Any(char.IsLower) &&
        password.Any(char.IsDigit);
}
