class DatePickerElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "date_picker";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(DatePickerElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const datePickerLabel = document.createElement("label") as HTMLLabelElement;
        datePickerLabel.classList.add("form-label");
        datePickerLabel.innerText = "Date";
        divTextStart.appendChild(datePickerLabel);

        const datePicker = document.createElement("input") as HTMLInputElement;
        datePicker.id = this.GetUniqueId();
        datePicker.type = "date";
        datePicker.classList.add("form-control");
        datePicker.setAttribute("name", this.formElementNames.Name)
        datePicker.setAttribute("data-property-reference", this.formElementNames.Reference);
        datePicker.disabled = true;

        divWrapper.appendChild(datePicker);
        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(paragraphElement: HTMLElement): HTMLElement[] {
        const datePickerLabelEl = paragraphElement.querySelector(".form-label") as HTMLParagraphElement;
        const datePickerLabelText: string = datePickerLabelEl.textContent;
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Date",
            InputVal: datePickerLabelText,
            AriaRoleDesc: "Edit Date Picker",
            ElementToUpdate: datePickerLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);

        return [editLabelFieldWrapper];
    }

    //#endregion
}