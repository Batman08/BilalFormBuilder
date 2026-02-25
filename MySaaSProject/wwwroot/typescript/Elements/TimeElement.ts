class TimeElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "time";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(TimeElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const timeLabel = document.createElement("label") as HTMLLabelElement;
        timeLabel.classList.add("form-label");
        timeLabel.innerText = "Time";
        divTextStart.appendChild(timeLabel);

        const timeInput = document.createElement("input") as HTMLInputElement;
        timeInput.id = this.GetUniqueId();
        timeInput.type = "time";
        timeInput.classList.add("form-control");
        timeInput.setAttribute("name", this.formElementNames.Name)
        timeInput.setAttribute("data-property-reference", this.formElementNames.Reference);
        timeInput.disabled = true;

        divWrapper.appendChild(timeInput);
        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(timeElement: HTMLElement, rightDesigner: HTMLDivElement): void {
        const timeLabelEl = timeElement.querySelector(".form-label") as HTMLParagraphElement;
        const timeLabelText: string = timeLabelEl.textContent;
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Time",
            InputVal: timeLabelText,
            AriaRoleDesc: "Edit Time",
            ElementToUpdate: timeLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);

        rightDesigner.appendChild(editLabelFieldWrapper);
    }

    //#endregion
}