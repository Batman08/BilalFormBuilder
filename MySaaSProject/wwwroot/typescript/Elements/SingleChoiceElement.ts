class SingleChoiceElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "single_choice";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(SingleChoiceElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("form-label");
        singleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(singleChoiceLabel);

        const divRadioBtnsContainer = document.createElement("div") as HTMLDivElement;
        const formId = this.GetUniqueId();

        divRadioBtnsContainer.id = formId;
        divRadioBtnsContainer.setAttribute("name", this.formElementNames.Name);
        divRadioBtnsContainer.ariaLabel = "Single Choice";
        divRadioBtnsContainer.setAttribute("data-property-reference", this.formElementNames.Reference);
        divWrapper.appendChild(divRadioBtnsContainer);

        const singleChoicelElNumber: string = formId.substring(12);
        const singleChoiceElName: string = `${this.formElementNames.Name}Q${singleChoicelElNumber}`;
        const defaultCreateNumber = 3 as number;
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum: string = (i + 1).toString();
            const singleChoiceOptionNum = i;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;

            const scOptionData: SingleChoiceOptionDTO = { singleChoiceOptionId: singleChoiceOptionId, singleChoiceElName: singleChoiceElName, singleChoiceOptionTextContent: `Option ${itemNum}` };
            const divSinglChoiceWrapper: HTMLDivElement = Utilities.CreateSingleChoiceOption(scOptionData);
            divRadioBtnsContainer.appendChild(divSinglChoiceWrapper);
        }

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(singleChoiceElement: HTMLElement): HTMLElement[] {
        const singleChoiceLabelEl = singleChoiceElement.querySelector(".form-label") as HTMLLabelElement;
        const dropdownLabelText: string = singleChoiceLabelEl.textContent;
        const optionsFromSingleChoice = singleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //Single Choice Label Property

        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Single Choice Question",
            ElementToUpdate: singleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);


        //Single Choice Options

        const optionsWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("scOptions", "Single Choice Options");
        const functionData: SCLUpdateFuncDTO = { singlchoiceElWrapper: singleChoiceElement }
        const textarea = Utilities.MultiSelectTextAreaProperty(optionsFromSingleChoice, functionData, this.UpdateSingleChoiceOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);

        return [editLabelFieldWrapper, optionsWrapper];
    }

    private UpdateSingleChoiceOptions(scData: SCLUpdateFuncDTO): void {
        const singleChoicelEl = scData.singlchoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        singleChoicelEl.innerHTML = "";

        const singleChoicelElNumber: string = singleChoicelEl.id.substring(12);
        const singleChoiceElName: string = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelElNumber}`;
        for (let i = 0; i < scData.options.length; i++) {
            const singleChoiceOptionNum = i + 1;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;

            const scOptionData: SingleChoiceOptionDTO = {
                singleChoiceOptionId: singleChoiceOptionId,
                singleChoiceElName: singleChoiceElName,
                singleChoiceOptionTextContent: scData.options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = Utilities.CreateSingleChoiceOption(scOptionData);
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }

    //#endregion
}