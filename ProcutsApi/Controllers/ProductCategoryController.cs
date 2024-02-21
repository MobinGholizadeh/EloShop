using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyShop.Data;
using System.Collections.Generic;
using System.Linq;

namespace MyShop.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductCategoryController : ControllerBase
	{
		private readonly MyDbContext _context;

		public ProductCategoryController(MyDbContext context)
		{
			_context = context;
		}

		// GET: 
		[HttpGet]
		public ActionResult<IEnumerable<ProductCategory>> GetProductCategories()
		{
			return _context.ProductCategories.ToList();
		}

		// GET: with Id
		[HttpGet("{productId}/{categoryId}")]
		public ActionResult<ProductCategory> GetProductCategory(int productId, int categoryId)
		{
			var productCategory = _context.ProductCategories.FirstOrDefault(pc => pc.ProductId == productId && pc.CategoryId == categoryId);

			if (productCategory == null)
			{
				return NotFound();
			}

			return productCategory;
		}

		// POST: 
		[HttpPost]
		public ActionResult<ProductCategory> PostProductCategory(ProductCategory productCategory)
		{
			_context.ProductCategories.Add(productCategory);
			_context.SaveChanges();

			return CreatedAtAction(nameof(GetProductCategory), new { productId = productCategory.ProductId, categoryId = productCategory.CategoryId }, productCategory);
		}

		// PUT: 
		[HttpPut("{productId}/{categoryId}")]
		public IActionResult PutProductCategory(int productId, int categoryId, ProductCategory productCategory)
		{
			if (productId != productCategory.ProductId || categoryId != productCategory.CategoryId)
			{
				return BadRequest();
			}

			_context.Entry(productCategory).State = EntityState.Modified;
			_context.SaveChanges();

			return NoContent();
		}

		// DELETE: 
		[HttpDelete("{productId}/{categoryId}")]
		public IActionResult DeleteProductCategory(int productId, int categoryId)
		{
			var productCategory = _context.ProductCategories.FirstOrDefault(pc => pc.ProductId == productId && pc.CategoryId == categoryId);
			if (productCategory == null)
			{
				return NotFound();
			}

			_context.ProductCategories.Remove(productCategory);
			_context.SaveChanges();

			return NoContent();
		}
	}
}
