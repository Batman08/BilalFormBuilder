var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages().AddJsonOptions(options =>
{
    // Optional: preserve PascalCase instead of camelCase
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});

// DI
RegisterDIMarkers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();


#region Helper methods

void RegisterDIMarkers()
{
    void Register(Func<Type, Type, IServiceCollection> registerMethod, Type implementation)
    {
        var interfaces = implementation.GetInterfaces();
        foreach (var interfaceType in interfaces)
        {
            registerMethod(interfaceType, implementation);
        }
    }

    string[] assemblies = { "MySaaSProject.Server.dll", "Domain.dll" };
    foreach (var assemblyPathName in assemblies)
    {
        string assemblyPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, assemblyPathName);
        var assembly = System.Runtime.Loader.AssemblyLoadContext.Default.LoadFromAssemblyPath(assemblyPath);
        var types = assembly.GetTypes();
        foreach (var type in types)
        {
            if (!type.IsClass || type.IsAbstract) continue;

            // Determine lifetime based on attribute
            var attrs = type.GetCustomAttributes(inherit: true);
            if (attrs.Any(attr => attr is ScopedAttribute))
            {
                Register(builder.Services.AddScoped, type);
            }
            else if (attrs.Any(attr => attr is TransientAttribute))
            {
                Register(builder.Services.AddTransient, type);
            }
            else if (attrs.Any(attr => attr is SingletonAttribute))
            {
                Register(builder.Services.AddSingleton, type);
            }
        }
    }
}


#endregion