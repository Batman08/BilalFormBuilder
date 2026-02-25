class NumberElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "number";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(NumberElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const numberLabel = document.createElement("label") as HTMLLabelElement;
        numberLabel.classList.add("form-label");
        numberLabel.innerText = "Number";
        divTextStart.appendChild(numberLabel);

        const numberInput = document.createElement("input") as HTMLInputElement;
        numberInput.id = this.GetUniqueId();
        numberInput.type = "number";
        numberInput.classList.add("form-control");
        numberInput.setAttribute("name", this.formElementNames.Name)
        numberInput.setAttribute("data-property-reference", this.formElementNames.Reference);
        numberInput.placeholder = "e.g 21";
        numberInput.disabled = true;
        divWrapper.appendChild(numberInput);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(numberElement: HTMLElement, rightDesigner: HTMLDivElement): void {
        const numberLabelEl = numberElement.querySelector(".form-label") as HTMLParagraphElement;
        const numberLabelText: string = numberLabelEl.textContent;
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Number",
            InputVal: numberLabelText,
            AriaRoleDesc: "Edit Number",
            ElementToUpdate: numberLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);

        rightDesigner.appendChild(editLabelFieldWrapper);
    }

    //#endregion
}