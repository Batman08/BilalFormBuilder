class FullNameElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "full_name";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(FullNameElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divFullNameRow = document.createElement("div") as HTMLDivElement;
        divFullNameRow.id = this.GetUniqueId();
        divFullNameRow.setAttribute(`name`, this.formElementNames.Name);
        divFullNameRow.setAttribute(`data-property-reference`, this.formElementNames.Reference);
        divFullNameRow.classList.add("row");
        divWrapper.appendChild(divFullNameRow);

        /*First Name*/
        const divFirstNameColumn = document.createElement("div") as HTMLDivElement;
        divFirstNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divFirstNameColumn);

        const labelFirstName = document.createElement("label") as HTMLLabelElement;
        labelFirstName.setAttribute(`data-FirstName`, ``);
        labelFirstName.classList.add("form-label");
        labelFirstName.innerText = "First Name";
        divFirstNameColumn.appendChild(labelFirstName);

        const inputFirstName = document.createElement("input") as HTMLInputElement;
        inputFirstName.type = "text";
        inputFirstName.classList.add("form-control");
        inputFirstName.ariaLabel = "First Name";
        divFirstNameColumn.appendChild(inputFirstName);

        /*Last Name*/
        const divLastNameColumn = document.createElement("div") as HTMLDivElement;
        divLastNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divLastNameColumn);

        const labelLastName = document.createElement("label") as HTMLLabelElement;
        labelLastName.setAttribute(`data-LastName`, ``);
        labelLastName.classList.add("form-label");
        labelLastName.innerText = "Last Name";
        divLastNameColumn.appendChild(labelLastName);

        const inputLastName = document.createElement("input") as HTMLInputElement;
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(fullNameElement: HTMLElement): HTMLElement[] {
        const firstNameLabelEl = fullNameElement.querySelector("[data-FirstName]") as HTMLHeadElement;
        const firstNameFieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "First Name",
            InputVal: firstNameLabelEl.textContent,
            AriaRoleDesc: "Edit First Name",
            ElementToUpdate: firstNameLabelEl,
            Title: `First Name Label`
        }
        const editFirstNameLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(firstNameFieldLabelPropertyData);

        const lastNameLabelEl = fullNameElement.querySelector("[data-LastName]") as HTMLHeadElement;
        const lastNameFieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Last Name Label",
            InputVal: lastNameLabelEl.textContent,
            AriaRoleDesc: "Edit Last Name",
            ElementToUpdate: lastNameLabelEl,
            Title: `Last Name Label`
        }
        const editLastNameLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(lastNameFieldLabelPropertyData);

        return [editFirstNameLabelFieldWrapper, editLastNameLabelFieldWrapper];
    }

    //#endregion
}