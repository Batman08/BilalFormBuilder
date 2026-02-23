namespace Domain.Common
{
    public class ComponentsToCreateDTO
    {
        public List<FormElementDTO> BasicFormElements { get; set; } = [];
        public List<FormElementDTO> ComplexFormElements { get; set; } = [];
    }

    public class FormElementDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public List<string>? Icon { get; set; }
    }
}
