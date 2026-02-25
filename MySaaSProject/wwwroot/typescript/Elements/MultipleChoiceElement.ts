class MultipleChoiceElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "multiple_choice";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(MultipleChoiceElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const multipleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        multipleChoiceLabel.classList.add("form-label");
        multipleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(multipleChoiceLabel);

        const divCheckboxBtnsContainer = document.createElement("div") as HTMLDivElement;
        const formId = this.GetUniqueId() as string;

        divCheckboxBtnsContainer.id = formId;
        divCheckboxBtnsContainer.setAttribute("name", this.formElementNames.Name)
        divCheckboxBtnsContainer.ariaLabel = "Multiple Choice"
        divCheckboxBtnsContainer.setAttribute("data-property-reference", this.formElementNames.Reference);
        divWrapper.appendChild(divCheckboxBtnsContainer);

        const defaultCreateNumber = 3 as number;
        const multipleChoicelElNumber: string = formId.substring(14);
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId: string = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;

            const mcOptionData: MultipleChoiceOptionDTO = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: `Option ${itemNum}`,
                multipleChoiceOptionTextContent: `Option ${itemNum}`
            };
            const divOptionWrapper: HTMLDivElement = Utilities.CreateMultipleChoiceOption(mcOptionData);
            divCheckboxBtnsContainer.appendChild(divOptionWrapper);
        }

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(multipleChoiceElement: HTMLElement): HTMLElement[] {
        const multipleChoiceLabelEl = multipleChoiceElement.querySelector(".form-label") as HTMLParagraphElement;
        const multipleChoiceLabelText: string = multipleChoiceLabelEl.textContent;
        const optionsFromMultipleChoice = multipleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //Multiple Choice Label Property

        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: multipleChoiceLabelText,
            AriaRoleDesc: "Edit Multiple Choice Question",
            ElementToUpdate: multipleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);


        //Multiple Choice Options

        const optionsWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("mcOptions", "Multiple Choice Options");
        const functionData: MCLUpdateFuncDTO = { multipleChoiceElWrapper: multipleChoiceElement };
        const textarea = Utilities.MultiSelectTextAreaProperty(optionsFromMultipleChoice, functionData, this.UpdateMultipleChoiceOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);

        return [editLabelFieldWrapper, optionsWrapper];
    }

    private UpdateMultipleChoiceOptions(mcData: MCLUpdateFuncDTO): void {
        const multipleChoicelEl = mcData.multipleChoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        multipleChoicelEl.innerHTML = "";

        const multipleChoicelElNumber: string = multipleChoicelEl.id.substring(14);
        for (let i = 0; i < mcData.options.length; i++) {
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;

            const mcOptionData: MultipleChoiceOptionDTO = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: mcData.options[i],
                multipleChoiceOptionTextContent: mcData.options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = Utilities.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }

    //#endregion
}