using System.ComponentModel.DataAnnotations;
using Example.InterviewQuestion002.Api.Security;

namespace Example.InterviewQuestion002.Api.Contracts;

public sealed class RegisterRequest : IValidatableObject
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    [RegularExpression("^[A-Za-z0-9._-]+$", ErrorMessage = "Username contains unsupported characters.")]
    public string Username { get; init; } = string.Empty;

    [Required]
    [StringLength(128, MinimumLength = 8)]
    public string Password { get; init; } = string.Empty;

    [Required]
    public string ConfirmPassword { get; init; } = string.Empty;

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (!CredentialRules.IsStrongPassword(Password))
        {
            yield return new ValidationResult(
                "Password must contain an uppercase letter, a lowercase letter, and a number.",
                [nameof(Password)]);
        }

        if (!string.Equals(Password, ConfirmPassword, StringComparison.Ordinal))
        {
            yield return new ValidationResult("Passwords do not match.", [nameof(ConfirmPassword)]);
        }
    }
}
