using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyShop.Data
{
	public class Product
	{
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDesc { get; set; }
        public string ProductIamge{ get; set; }
        public bool Disabled { get; set; }
        public string CreatorUserId { get; set; }

		public ICollection<ProductCategory> ProductCategories { get; set; }
	}
}
