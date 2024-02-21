using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyShop.Data
{
	public class Category
	{
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryImg { get; set; }

		public ICollection<ProductCategory> ProductCategories { get; set; }
	}
}
