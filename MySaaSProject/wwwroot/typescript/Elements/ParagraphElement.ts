class ParagraphElement extends BaseElement {
    protected static readonly formElementBase: string = "paragraph";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(ParagraphElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    public Render(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();
        const p = document.createElement("p");

        p.id = this.GetUniqueId();
        p.className = "text-break";
        p.setAttribute("name", this.formElementNames.Name);
        p.setAttribute("data-property-reference", this.formElementNames.Reference);
        p.innerText = "This is a paragraph";

        divWrapper.appendChild(p);
        return divWrapper;
    }
}