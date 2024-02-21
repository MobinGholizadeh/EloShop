using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyShop.Data;

namespace ProcutsApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly MyDbContext _context;

        public CategoryController(MyDbContext context)
        {
            _context = context;
        }

		// GET: 
		[HttpGet]
		public ActionResult<IEnumerable<Category>> GetCategory() 
		{ 
			return _context.Categories.ToList();
		}

		// GET: with Id
		[HttpGet("{id}")]
		public ActionResult<Category> GetCategory(int id) 
		{
			var category = _context.Categories.Find(id);
			
			if (category == null) 
			{
				return BadRequest();
			}
			return category;

		}

		// POST:
		[HttpPost]
		public ActionResult<Category> PostCategory(Category category)
		{
			_context.Categories.Add(category);
			_context.SaveChanges();

			return category;

		}

		// DELETE:
		[HttpDelete("{id}")]
		public ActionResult DeleteCategory(int id) 
		{
			var category = _context.Categories.Find(id);

            if (category == null)
            {
				return NotFound();
            }
			_context.Categories.Remove(category);
			_context.SaveChanges();

			return NoContent();
        }

	}
}
