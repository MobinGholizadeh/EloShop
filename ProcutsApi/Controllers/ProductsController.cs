using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyShop.Data;
using ProcutsApi.DataTransferObjects;
using SQLitePCL;
using System.IO;

namespace ProcutsApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IConfiguration _configuration;

	public ProductsController(MyDbContext context, IConfiguration configuration)
	{
		_context = context;
		_configuration = configuration;
	}

    // GET 
    [HttpGet("DownloadImage")]
    public IActionResult GetProductImage(string imageName)
    {
		var Address = _configuration.GetSection("ImageAddresses").Value;
		string filePath = Address+ "\\" + imageName;
        if (System.IO.File.Exists(filePath))
        {
            return PhysicalFile(filePath , "image/jpeg", true);   
        }
        else 
        {
            return NotFound();
        }
    }

	// GET 
	[HttpGet]
    public ActionResult<IEnumerable<Product>> GetProducts()
    {
        return _context.Products.ToList();
    }

	// GET: with Id
	[HttpGet("{id}")]
    public ActionResult<ProductDto> GetProduct(int id) 
    {

        var db  = _context.Products.Find(id);
        var product = new ProductDto();
        if (product == null) return product;
        product.ProductDesc = db.ProductDesc;
        product.ProductId = id; 
        product.ProductName = db.ProductName;
		var Address = _configuration.GetSection("ImageAddresses").Value;
        var productImageData=System.IO.File.ReadAllBytes(Address + db.ProductIamge);
        product.ProductIamge = productImageData;
        return product;
    }

	// POST:
	[HttpPost]
    public ActionResult<Product> PostProduct(Product product) 
    { 
        _context.Products.Add(product);
        _context.SaveChanges();

        return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
    }

	// PUT: 
	[HttpPut]
    public ActionResult<Product> PutProduct(int id , Product product) 
    {
        if (id != product.ProductId)
        {
            return BadRequest();
        }

        _context.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        _context.SaveChanges();

        return NoContent();
    }

	// DELETE:
	[HttpDelete("{id}")]
    public ActionResult DeleteProduct(int id) 
    {
        var product = _context.Products.Find(id);
        if (product == null)
        {
            return BadRequest();
        }
        _context.Products.Remove(product);
        _context.SaveChanges();

        return NoContent();
    }
}
