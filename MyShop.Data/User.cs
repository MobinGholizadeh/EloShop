using System.ComponentModel.DataAnnotations;

namespace MyShop.Data;

public class User
{
	public int Id { get; set; }
	[Required]
	public string Username { get; set; }
	public byte[] PasswordHash { get; set; }
	public byte[] PasswordSalt { get; set; }
    public string Role { get; set; }
}