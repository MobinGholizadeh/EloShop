using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyShop.Data.UserService
{
	public class UserRepository
	{
		private readonly MyDbContext _dbContext;

		public UserRepository(MyDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<User> GetUserByUsernameAsync(string username)
		{
			return await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
		}

		public bool UserExists(string username)
		{
			return _dbContext.Users.Any(u => u.Username == username);
		}
	}

}
