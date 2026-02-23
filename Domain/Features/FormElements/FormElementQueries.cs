using System.Text.Json;

namespace Domain.Features.FormElements
{
    public interface IFormElementQueries
    {
        ComponentsToCreateDTO GetAvailableComponents(string formElementsFilePath);
    }

    [Transient]
    public class FormElementQueries : IFormElementQueries
    {
        private static readonly JsonSerializerOptions _jsonOptions = new() { PropertyNameCaseInsensitive = true, ReadCommentHandling = JsonCommentHandling.Skip, AllowTrailingCommas = true };

        public FormElementQueries()
        {
        }

        public ComponentsToCreateDTO GetAvailableComponents(string formElementsJson)
        {
            var components = JsonSerializer.Deserialize<ComponentsToCreateDTO>(formElementsJson, _jsonOptions) ?? new ComponentsToCreateDTO();
            return components;
        }
    }
}
