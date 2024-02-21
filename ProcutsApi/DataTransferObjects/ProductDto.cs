namespace ProcutsApi.DataTransferObjects
{
	public class ProductDto
	{
		public int ProductId { get; set; }
		public string ProductName { get; set; }
		public string ProductDesc { get; set; }
		public byte[] ProductIamge { get; set; }
		public string CreatorUserId { get; set; }
	}
}
