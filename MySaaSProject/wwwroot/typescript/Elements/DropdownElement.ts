class DropdownElement extends BaseElement {
    protected static readonly formElementBase: string = "dropdown";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(DropdownElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    public Render(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();
        const dropdownId = this.GetUniqueId();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const dropdownLabel = document.createElement("label") as HTMLLabelElement;
        dropdownLabel.classList.add("form-label");
        dropdownLabel.innerText = "Type a question";
        dropdownLabel.setAttribute(`for`, dropdownId)
        divTextStart.appendChild(dropdownLabel);

        const select = document.createElement("select") as HTMLSelectElement;
        select.id = dropdownId;
        select.classList.add("form-select");
        select.setAttribute("name", this.formElementNames.Name);
        select.ariaLabel = "Dropdown";
        select.setAttribute("data-property-reference", this.formElementNames.Reference);
        select.disabled = true;
        divWrapper.appendChild(select);

        const ddlOptionData: DropdownOptionDTO = { dropdownValue: "", dropdownTextContent: "Select an option" };
        const defaultOption: HTMLOptionElement = Utilities.CreateDropdownOption(ddlOptionData);
        defaultOption.setAttribute("selected", "");
        select.appendChild(defaultOption);

        return divWrapper;
    }
}