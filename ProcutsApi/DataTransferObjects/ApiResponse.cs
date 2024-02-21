namespace ProcutsApi.DataTransferObjects
{
	public class ApiResponse
	{
        public string Message{ get; set; }
        public bool Success { get; set; }
        public int StatusCode { get; set; }
    }
}
