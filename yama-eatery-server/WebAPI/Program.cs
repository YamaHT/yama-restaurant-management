using Infrastructure;
using WebAPI;
using WebAPI.Middlewares;

var apiPolicy = "YamaCorsPolicy";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructureService();
builder.Services.AddWebAPIService();

builder.Services.AddCors(options =>
{
	options.AddPolicy(apiPolicy, policy =>
	{
		policy.WithOrigins("http://localhost:3000")
		.AllowAnyMethod()
		.AllowAnyHeader();
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<JWTAuthenticationMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors(apiPolicy);

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
