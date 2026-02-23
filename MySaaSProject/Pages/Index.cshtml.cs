using Domain.Features.FormElements;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MySaaSProject.Pages
{
    public class IndexModel : PageModel
    {
        public ComponentsToCreateDTO ComponentsToCreate { get; set; } = new();

        private readonly IWebHostEnvironment _env;
        private readonly IFormElementQueries _formElementQueries;

        public IndexModel(IWebHostEnvironment env, IFormElementQueries formElementQueries)
        {
            _env = env;
            _formElementQueries = formElementQueries;
        }

        public void OnGet()
        {
            var jsonFilePath = Path.Combine(_env.ContentRootPath, "Code", "Data", "FormElements.json");
            if (System.IO.File.Exists(jsonFilePath))
            {
                var jsonString = System.IO.File.ReadAllText(jsonFilePath);
                ComponentsToCreate = _formElementQueries.GetAvailableComponents(jsonString);
            }
        }
    }
}