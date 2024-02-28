namespace ProcutsApi.Middleware
{
	namespace Api.Extensions
	{
		public static class CorsExtensions
		{
			public const string CORS_POLICY = "CorsPolicy";

			public static IServiceCollection AddMobinCors(this IServiceCollection services)
			{
				services.AddCors(options =>
				{
					options.AddPolicy(CORS_POLICY, policy =>
					{
						policy
						//.AllowAnyOrigin()
						.SetIsOriginAllowed((host) => true)
						//.AllowAnyHeader()
						.WithHeaders("Access-Control-Allow-Headers",
						"Origin", "Authorization", "X-Requested-With",
						"Content-Type", "Accept", "Access-Control-Allow-Origin")
						.WithExposedHeaders("X-Pagination", "X-Total-Count")
						.AllowAnyMethod()
						.AllowCredentials();
					});
				});
				return services;
			}

			public static void UseMobinCors(this IApplicationBuilder app)
			{
				if (app == null)
					throw new ArgumentNullException();

				app.UseMiddleware<OptionsMiddleware>();
				//app.UseMiddleware<CorsOverride>();
				app.UseCors(CORS_POLICY);
			}
		}

		public class CorsOverride
		{
			private readonly RequestDelegate _next;

			public CorsOverride(RequestDelegate next)
			{
				_next = next;
			}

			public async Task Invoke(HttpContext httpContext)
			{
				const string allowOriginHeaderName = "Access-Control-Allow-Origin";
				if (httpContext.Response.Headers.ContainsKey(allowOriginHeaderName))
				{
					httpContext.Response.Headers.Remove(allowOriginHeaderName);
				}

				httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
				httpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin," +
					"Authorization,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Origin,X-Pagination," +
					$"X-Total-Count");

				if (httpContext.Request.Headers["Access-Control-Request-Method"].Count > 0)
				{
					foreach (var header in httpContext.Request.Headers["Access-Control-Request-Method"])
					{
						httpContext.Response.Headers.Add("Access-Control-Allow-Methods", header);
					}
				}
				else
				{
					httpContext.Response.Headers.Add("Access-Control-Allow-Methods", httpContext.Request.Method);
				}

				foreach (var origin in httpContext.Request.Headers.Where(h => h.Key == "Origin"))
				{
					httpContext.Response.Headers.Add(allowOriginHeaderName, origin.Value);
				}

				if (httpContext.Request.Method == "OPTIONS")
				{
					httpContext.Response.StatusCode = 200;
					await httpContext.Response.WriteAsync("OK");
				}
				else
				{
					await _next.Invoke(httpContext);
				}
			}
		}
	}
}
