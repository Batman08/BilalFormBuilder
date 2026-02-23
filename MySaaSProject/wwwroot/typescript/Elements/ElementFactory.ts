class FormElementFactory {
    // Map the string type to the Class constructor
    private static registry: Record<string, new () => BaseElement> = {
        "Paragraph": ParagraphElement,
        "Dropdown": DropdownElement,
        //"Email": Elements.EmailElement,
        // Add new ones here...
    };

    public static Create(type: string): HTMLDivElement | null {
        debugger
        const cleanType = type.replace("formElement", "");
        const ElementClass = this.registry[cleanType];

        if (!ElementClass) {
            console.error(`Element type ${cleanType} not found`);
            return null;
        }

        return new ElementClass().Render();
    }
}