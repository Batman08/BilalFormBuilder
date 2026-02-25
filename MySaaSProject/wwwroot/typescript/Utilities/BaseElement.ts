abstract class BaseElement {
    constructor(protected formElementNames: FormElementNames) { }

    // Shared logic for generating unique IDs
    protected GetUniqueId(): string {
        const trimmedName = this.formElementNames.Name.replace(/\s+/g, '');
        const existing = document.querySelectorAll(`[name=${trimmedName}]`);
        let highest = 0;
        existing.forEach(el => {
            const num = parseInt(el.id.replace(trimmedName, '')) || 0;
            if (num > highest) highest = num;
        });
        return `${trimmedName}${highest + 1}`;
    }

    //private GetFormElementId(elementName: string): string {
    //    //remove spaces form elementName
    //    const trimmedElementName = elementName.split(" ").join("") as string;


    //    const allElementsWithWrapperClass = document.querySelectorAll(`[name=${trimmedElementName}]`);
    //    console.log(allElementsWithWrapperClass);

    //    //find the highest number from ids
    //    let highestNumber = 0;
    //    allElementsWithWrapperClass.forEach((element: Element) => {
    //        const elementNumber = parseInt(element.id.replace(trimmedElementName, ''));
    //        if (elementNumber > highestNumber) {
    //            highestNumber = elementNumber;
    //        }
    //    });

    //    return `${trimmedElementName}${highestNumber + 1}` as string;
    //}

    // Shared wrapper logic
    protected CreateFormElementWrapper(): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("createdFormElement", "pad15", "position-relative", "text-start");
        div.setAttribute("data-wrapper-type", `${this.formElementNames.Name}Wrapper`);
        return div;
    }

    // Every child must implement this
    public abstract RenderElement(): HTMLDivElement;

    // Optional - may not exist on all elements
    public RenderPropertiesPanel?(element: HTMLElement): HTMLElement[];
}