using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyShop.Data;
using System;

namespace ProcutsApi.Controllers

{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : Controller
	{
		private readonly MyDbContext _context;

        public UsersController(MyDbContext context)
        {
			_context = context;
		}
        // GET
        [HttpGet]
		public List<User> GetUsers()
		{
			var users = _context.Users.ToList();
			return users;
		}
	}
}
