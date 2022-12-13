/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />

class FormElementProperties {
    private readonly rightDesigner = document.querySelector('#rightDesigner') as HTMLDivElement;
    private _tinymce: any;
    private _utils: Utilities = new Utilities();

    public Init(tinymce: any): void {
        this._tinymce = tinymce;
    }

    public GetElementProperties(elementType: string, element: HTMLElement, callback?: Function) {

        switch (elementType) {
            case "paragraphWrapper":
                this.ParagraphProperties(element, callback);
                break;
            case "singleChoiceWrapper":
                this.SingleChoiceProperties(element);
                break;
            case "dropdownWrapper":
                this.DropdownProperties(element);
                break;
            case "multipleChoiceWrapper":
                this.MultipleChoiceProperties(element);
                break;
            case "headingWrapper":
                this.HeadingProperties(element);
                break;
            case "fullNameWrapper":
                this.FullNameProperties(element);
                break;
            default:
                break;
        }
    }

    //#region Generic Multi-Selection Functions
    private UpdateTextAreaOptions(textarea: HTMLTextAreaElement, options: string[]): void {
        //add options to textarea
        if (options !== null && options !== undefined) {
            textarea.value = options.join('\n');
        }
    }

    private GetOptionsFromTextarea(textarea: HTMLTextAreaElement): string[] {
        //split data into array
        const options = textarea.value.split(/[\n,]+/);
        return options;
    }
    //#endregion

    //#region Basic Properties

    //#region Paragraph Properties
    private ParagraphProperties(paragraphElement: HTMLElement, callback?: Function): void {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]") as HTMLParagraphElement;
        const currentText: string = elementToUpdateText.textContent;

        this.rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea') as HTMLTextAreaElement;
        textArea.id = 'paragraph-editor';
        this.rightDesigner.appendChild(textArea);
        //this._tinymce.activeEditor.setContent("this is a test");

        //delay to init tinymce
        setTimeout(() => {//todo: should only show right designer when tinymce editor has been initialized
            const utils = new Utilities();
            utils.InitTinyMCE(this._tinymce, 'textarea#paragraph-editor');
            setTimeout(() => {//todo: should only show right designer when tinymce editor has been initialized
                this._tinymce.activeEditor.setContent(currentText);
                utils.AddTinymceListeners(this._tinymce, elementToUpdateText, callback);
            }, 1000);
        }, 0.0001);
    }
    //#endregion

    //#region Dropdown Properties
    private DropdownProperties(dropdownElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        const dropdownLabelEl = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const dropdownLabelText: string = dropdownLabelEl.textContent;
        const optionsFromDropdown = dropdownElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Dropdown Label Property
        const editLabelFieldWrapper = document.createElement("div") as HTMLDivElement;
        editLabelFieldWrapper.classList.add("mb-3");

        const editLabel = document.createElement("label") as HTMLLabelElement;
        editLabel.htmlFor = "txtDropdown";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";

        const editInput = document.createElement("input") as HTMLInputElement;
        editInput.id = "txtDropdown";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question"
        editInput.value = dropdownLabelText;
        editInput.ariaRoleDescription = "Edit Dropdown Question";
        editInput.oninput = (ev: InputEvent) => { dropdownLabelEl.textContent = editInput.value; };

        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion

        //#region Dropdown Options

        //#region Label Property Element
        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = "ddlOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = "Dropdown Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion

        //#region Textarea Property Element
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = "txtAreaOptions";
        textarea.classList.add("form-control");
        textarea.placeholder = "Enter each option on a new line";
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = "txtAreaOptions";
        textareaLabel.textContent = "Enter each option on a new line";

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        optionsFromDropdown.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            optionsFromElement.push(option.textContent);
        });

        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            const options: string[] = this.GetOptionsFromTextarea(textarea);
            this.UpdateDropdownOptions(dropdownElement, options);
        };
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateDropdownOptions(dropdownElWrapper: HTMLElement, options: string[]): void {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]") as HTMLSelectElement;
        const currentDropdownOptions = ddlEl.querySelectorAll("option") as NodeListOf<HTMLOptionElement>;
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            option.remove();
        });

        for (let i = 0; i < options.length; i++) {
            const ddlOptionData: DropdownOptionDTO = { dropdownValue: options[i], dropdownTextContent: options[i] };
            const newOption: HTMLOptionElement = this._utils.CreateDropdownOption(ddlOptionData);
            ddlEl.appendChild(newOption);
        }
    }
    //#endregion

    //#region Single Choice Properties
    private SingleChoiceProperties(singleChoiceElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        const singleChoiceLabelEl = singleChoiceElement.querySelector(".form-label") as HTMLParagraphElement;
        const dropdownLabelText: string = singleChoiceLabelEl.textContent;
        const optionsFromSingleChoice = singleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Single Choice Label Property
        const editLabelFieldWrapper = document.createElement("div") as HTMLDivElement;
        editLabelFieldWrapper.classList.add("mb-3");

        const editLabel = document.createElement("label") as HTMLLabelElement;
        editLabel.htmlFor = "txtSingleChoice";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";

        const editInput = document.createElement("input") as HTMLInputElement;
        editInput.id = "txtSingleChoice";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question"
        editInput.value = dropdownLabelText;
        editInput.ariaRoleDescription = "Edit Single Question";
        editInput.oninput = (ev: InputEvent) => { singleChoiceLabelEl.textContent = editInput.value; };

        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion

        //#region Single Choice Options

        //#region Label Property Element
        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = "scOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "scOptions";
        optionsLabel.textContent = "Single Choice Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion

        //#region Textarea Property Element
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = "txtAreaOptions";
        textarea.classList.add("form-control");
        textarea.placeholder = "Enter each option on a new line";
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = "txtAreaOptions";
        textareaLabel.textContent = "Enter each option on a new line";

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        optionsFromSingleChoice.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            optionsFromElement.push(option.textContent);
        });

        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            const options: string[] = this.GetOptionsFromTextarea(textarea);
            this.UpdateSingleChoiceOptions(singleChoiceElement, options);
        };
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateSingleChoiceOptions(singlchoiceElWrapper: HTMLElement, options: string[]): void {
        const singleChoicelEl = singlchoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        singleChoicelEl.innerHTML = "";

        const singleChoicelElNumber: string = singleChoicelEl.id.substring(12);
        const singleChoiceElName: string = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelElNumber}`;
        for (let i = 0; i < options.length; i++) {
            const singleChoiceOptionNum = i + 1;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;

            const scOptionData: SingleChoiceOptionDTO = {
                singleChoiceOptionId: singleChoiceOptionId,
                singleChoiceElName: singleChoiceElName,
                singleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = this._utils.CreateSingleChoiceOption(scOptionData);
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion

    //#region Multiple Choice Properties
    private MultipleChoiceProperties(multipleChoiceElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        const multipleChoiceLabelEl = multipleChoiceElement.querySelector(".form-label") as HTMLParagraphElement;
        const multipleChoiceLabelText: string = multipleChoiceLabelEl.textContent;
        const optionsFromMultipleChoice = multipleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Single Choice Label Property
        const editLabelFieldWrapper = document.createElement("div") as HTMLDivElement;
        editLabelFieldWrapper.classList.add("mb-3");

        const editLabel = document.createElement("label") as HTMLLabelElement;
        editLabel.htmlFor = "txtMultipleChoice";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";

        const editInput = document.createElement("input") as HTMLInputElement;
        editInput.id = "txtMultipleChoice";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question"
        editInput.value = multipleChoiceLabelText;
        editInput.ariaRoleDescription = "Edit Multiple Question";
        editInput.oninput = (ev: InputEvent) => { multipleChoiceLabelEl.textContent = editInput.value; };

        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion

        //#region Single Choice Options

        //#region Label Property Element
        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = "mcOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "scOptions";
        optionsLabel.textContent = "Single Choice Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion

        //#region Textarea Property Element
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = "txtAreaOptions";
        textarea.classList.add("form-control");
        textarea.placeholder = "Enter each option on a new line";
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = "txtAreaOptions";
        textareaLabel.textContent = "Enter each option on a new line";

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        optionsFromMultipleChoice.forEach((option) => {
            optionsFromElement.push(option.textContent);
        });

        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            const options: string[] = this.GetOptionsFromTextarea(textarea);
            this.UpdateMultipleChoiceOptions(multipleChoiceElement, options);
        };
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateMultipleChoiceOptions(multipleChoiceElWrapper: HTMLElement, options: string[]): void {
        const multipleChoicelEl = multipleChoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        multipleChoicelEl.innerHTML = "";

        const multipleChoicelElNumber: string = multipleChoicelEl.id.substring(14);
        for (let i = 0; i < options.length; i++) {
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;

            const mcOptionData: MultipleChoiceOptionDTO = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: options[i],
                multipleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = this._utils.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion

    //#endregion

    //#region Complex Properties
    private HeadingProperties(headingElement: HTMLElement) {
        this.rightDesigner.innerHTML = '';
        this.rightDesigner.innerHTML = `
                    <div class="mb-3">
                        <label for="txtHeading" class="form-label">Heading Texts</label>
                        <input type="text" class="form-control" id="txtHeading" data-reference aria-describedby="Heading Text">
                    </div>
                    <div class="mb-3">
                        <label for="txtSubHeading" class="form-label">Subheading Text</label>
                        <input type="text" class="form-control" id="txtSubHeading">
                    </div>`;

    }

    private FullNameProperties(headingElement: HTMLElement) {
    }
    //#endregion
}