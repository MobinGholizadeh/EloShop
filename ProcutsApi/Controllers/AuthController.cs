using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyShop.Data;
using MyShop.Data.UserService;
using ProcutsApi.DataTransferObjects;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;



namespace ProcutsApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : Controller
	{
		
		public static User user = new User();

		private readonly UserRepository _userRepository;
		private readonly MyDbContext _dbContext;
		private readonly IConfiguration _configuration;


		public AuthController(UserRepository userRepository, IConfiguration configuration, MyDbContext dbContext)
		{
			_userRepository = userRepository;
			_configuration = configuration;
			_dbContext = dbContext;
		}

		//Register
		[HttpPost("register")]
		public async Task<ActionResult<ApiResponse>> Register(RegisterDto request)
		{
			try
			{
				var findUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.UserName);

                if (findUser != null)
                {
					return new ApiResponse()
					{
						Message = "The user exists",
						Success = false
					};
                }

                var (passwordHash, passwordSalt) = CreatePasswordHash(request.Password);

				var user = new User
				{
					Username = request.UserName,
					PasswordHash = passwordHash,
					PasswordSalt = passwordSalt
				};

				_dbContext.Users.Add(user);
				await _dbContext.SaveChangesAsync();
				

				return new ApiResponse()
				{
					Message = "User has been created",
					Success = true
					
				};
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"An error occurred: {ex.Message}");
			}
		}







		private (byte[] passwordHash, byte[] passwordSalt) CreatePasswordHash(string password)
		{
			using (var hmac = new HMACSHA512())
			{
				byte[] salt = hmac.Key;
				byte[] hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return (hash, salt);
			}
		}





		//todo : 
		//Login
		[HttpPost("login")]
		public async Task<ActionResult<ApiResponse>> Login(LoginDto request)
		{
			try
			{

				var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == request.UserName);


				if (user == null)
				{
					return new ApiResponse()
					{
						Message = "The user does not exist",
						Success = false
					};
				}

				using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt))
				{
					byte[] computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(request.Password));

					if (!computedHash.SequenceEqual(user.PasswordHash))
					{
						return Unauthorized("Invalid password.");
					}
				}

			

				return new ApiResponse()
				{
					Message = "You are successfully logged in , Hello !",
					Success = true
				};
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"An error occurred: {ex.Message}");
			}
		}



		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (var hmac = new HMACSHA512(passwordSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return computedHash.SequenceEqual(passwordHash);
			}
		}


		private bool ByteArraysAreEqual(byte[] array1, byte[] array2)
		{
			if (array1 == null || array2 == null || array1.Length != array2.Length)
			{
				return false;
			}

			for (int i = 0; i < array1.Length; i++)
			{
				if (array1[i] != array2[i])
				{
					return false;
				}
			}

			return true;
		}





		private string CreateToken(User user)
		{
			List<Claim> claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, user.Username),
				new Claim(ClaimTypes.Role, "Admin")


	   };

			var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
					_configuration.GetSection("Authentication:SecretKey").Value));
			var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
			var token = new JwtSecurityToken(
								   claims: claims,
								   expires: DateTime.UtcNow.AddDays(1),
								   signingCredentials: cred
   );
			var jwt = new JwtSecurityTokenHandler().WriteToken(token);
			return jwt;
		}
	}
}

