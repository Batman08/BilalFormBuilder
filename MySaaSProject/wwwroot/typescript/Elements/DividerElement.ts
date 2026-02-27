class DividerElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "divider";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(DividerElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const div = document.createElement("div") as HTMLDivElement;
        div.id = this.GetUniqueId();
        div.classList.add("divider");

        div.setAttribute("name", this.formElementNames.Name)
        div.setAttribute("data-property-reference", this.formElementNames.Reference);
        divWrapper.appendChild(div);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(timeElement: HTMLElement): HTMLElement[] {
        return [];
    }

    //#endregion
}