using System.ComponentModel.DataAnnotations;

namespace Example.InterviewQuestion002.Api.Contracts;

public sealed class LoginRequest
{
    [Required]
    [StringLength(50, MinimumLength = 3)]
    public string Username { get; init; } = string.Empty;

    [Required]
    [StringLength(128, MinimumLength = 1)]
    public string Password { get; init; } = string.Empty;
}
