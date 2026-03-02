class HeadingElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "heading";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(HeadingElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const heading = document.createElement(`h2`) as HTMLHeadingElement
        heading.setAttribute(`data-Heading`, ``);
        heading.innerText = `Heading`;

        const subheading = document.createElement(`h6`) as HTMLHeadingElement
        subheading.setAttribute(`data-Subheading`, ``);
        subheading.classList.add(`fw-light`);
        subheading.innerText = ``;

        const divHeadingContainer = document.createElement(`div`) as HTMLDivElement
        divHeadingContainer.id = this.GetUniqueId();
        divHeadingContainer.setAttribute(`name`, this.formElementNames.Name);
        divHeadingContainer.setAttribute(`data-property-reference`, this.formElementNames.Reference);
        divHeadingContainer.appendChild(heading);
        divHeadingContainer.appendChild(subheading);

        divWrapper.appendChild(divHeadingContainer);
        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(timeElement: HTMLElement): HTMLElement[] {
        const headingLabelEl = timeElement.querySelector("[data-Heading]") as HTMLHeadElement;
        const headingFieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "",
            InputVal: headingLabelEl.textContent,
            AriaRoleDesc: "Edit Heading",
            ElementToUpdate: headingLabelEl,
            Title: `Heading Text`
        }
        const editHeadingLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(headingFieldLabelPropertyData);

        const subheadingLabelEl = timeElement.querySelector("[data-Subheading]") as HTMLHeadElement;
        const subheadingFieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "",
            InputVal: subheadingLabelEl.textContent,
            AriaRoleDesc: "Edit Subheading",
            ElementToUpdate: subheadingLabelEl,
            Title: `Subheading Text`
        }
        const editSubheadingLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(subheadingFieldLabelPropertyData);

        return [editHeadingLabelFieldWrapper, editSubheadingLabelFieldWrapper];
    }

    //#endregion
}