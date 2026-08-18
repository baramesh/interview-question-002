namespace Example.InterviewQuestion002.Api.Security;

public static class CredentialRules
{
    public static string NormalizeUsername(string username) => username.Trim().ToUpperInvariant();
}
