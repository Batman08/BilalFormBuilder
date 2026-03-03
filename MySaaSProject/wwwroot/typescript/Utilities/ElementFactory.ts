class FormElementFactory {
    // Map the string type to the Class constructor
    private static registry: Record<string, new () => BaseElement> = {
        "Paragraph": ParagraphElement,
        "Dropdown": DropdownElement,
        "SingleChoice": SingleChoiceElement,
        "MultipleChoice": MultipleChoiceElement,
        "DatePicker": DatePickerElement,
        "Time": TimeElement,
        "Number": NumberElement,
        "Image": ImageElement,
        "FileUpload": FileUploadElement,
        "Submit": SubmitElement,
        "Table": TableElement,
        "Divider": DividerElement,
        "Heading": HeadingElement,
        "FullName": FullNameElement,
        "Email": EmailElement,
        // Add new ones here...
    };

    private static instanceMap = new WeakMap<HTMLElement, BaseElement>();

    public static Create(type: string): HTMLDivElement | null {
        const cleanType = type.replace("formElement", "");
        const ElementClass = this.registry[cleanType];

        if (!ElementClass) {
            console.error(`Element type ${cleanType} not found`);
            return null;
        }

        //return new ElementClass().RenderElement();

        const instance = new ElementClass();
        const wrapper = instance.RenderElement();

        //attach instance directly to DOM node
        //(wrapper as any).__instance = instance;
        this.instanceMap.set(wrapper, instance);

        return wrapper;
    }

    public static GetInstance(wrapper: HTMLElement): BaseElement | undefined {
        return this.instanceMap.get(wrapper);
    }
}