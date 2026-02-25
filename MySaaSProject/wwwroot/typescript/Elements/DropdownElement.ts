class DropdownElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "dropdown";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(DropdownElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
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

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(dropdownElement: HTMLElement): HTMLElement[] {
        const dropdownLabelEl = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const dropdownLabelText: string = dropdownLabelEl.textContent;
        const optionsFromDropdown = dropdownElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //Dropdown Label Property

        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Dropdown Question",
            ElementToUpdate: dropdownLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);


        //Dropdown Options

        const optionsWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("ddlOptions", "Dropdown Options");
        const functionData: DDLUpdateFuncDTO = { dropdownElWrapper: dropdownElement }
        const textarea = Utilities.MultiSelectTextAreaProperty(optionsFromDropdown, functionData, this.UpdateDropdownOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);

        return [editLabelFieldWrapper, optionsWrapper];
    }

    private UpdateDropdownOptions(dropdownData: DDLUpdateFuncDTO): void {
        const ddlEl = dropdownData.dropdownElWrapper.querySelector("[data-property-reference]") as HTMLSelectElement;
        const currentDropdownOptions = ddlEl.querySelectorAll("option") as NodeListOf<HTMLOptionElement>;
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            option.remove();
        });

        for (let i = 0; i < dropdownData.options.length; i++) {
            const ddlOptionData: DropdownOptionDTO = { dropdownValue: dropdownData.options[i], dropdownTextContent: dropdownData.options[i] };
            const newOption: HTMLOptionElement = Utilities.CreateDropdownOption(ddlOptionData);
            ddlEl.appendChild(newOption);
        }
    }

    //#endregion
}