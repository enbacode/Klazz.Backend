namespace Klazz.Backend.Model.DTOs;

public class RegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
}

public class LoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class UserDto
{
    public string Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
}