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
            case "datePickerWrapper":
                this.DatePickerProperties(element);
                break;
            case "timeWrapper":
                this.TimeProperties(element);
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

    //#region Generic Functions
    private FieldLabelProperty(data: FieldLabelPropertyData): HTMLDivElement {
        const fieldLabelWrapper = document.createElement("div") as HTMLDivElement;
        fieldLabelWrapper.classList.add("mb-3");

        const fieldLabel = document.createElement("label") as HTMLLabelElement;
        fieldLabel.htmlFor = "editField";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "Field Label";

        const fieldLabelInput = document.createElement("input") as HTMLInputElement;
        fieldLabelInput.id = "editField";
        fieldLabelInput.classList.add("form-control");
        fieldLabelInput.type = "text";
        fieldLabelInput.placeholder = data.PlaceHolder;
        fieldLabelInput.value = data.InputVal;
        fieldLabelInput.ariaRoleDescription = data.AriaRoleDesc;
        fieldLabelInput.oninput = (ev: InputEvent) => { data.ElementToUpdate.textContent = fieldLabelInput.value; };

        fieldLabelWrapper.appendChild(fieldLabel);
        fieldLabelWrapper.appendChild(fieldLabelInput);

        return fieldLabelWrapper;
    }

    private TextareaLabelProperty(wrapperId: string, textVal: string): HTMLDivElement {
        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = wrapperId;
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = textVal;
        optionsWrapper.appendChild(optionsLabel);

        return optionsWrapper;
    }

    private MultiSelectTextAreaProperty(optionsFromMultiSelectEl: NodeListOf<Node>, elementToUpdate: HTMLElement, updateFunc: Function): HTMLDivElement {
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");

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
        optionsFromMultiSelectEl.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            optionsFromElement.push(option.textContent);
        });

        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            const options: string[] = this.GetOptionsFromTextarea(textarea);
            updateFunc(this._utils, elementToUpdate, options);
        };

        return divTextarea;
    }

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
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Dropdown Question",
            ElementToUpdate: dropdownLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Dropdown Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("ddlOptions", "Dropdown Options");
        //#endregion

        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromDropdown, dropdownElement, this.UpdateDropdownOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateDropdownOptions(utils: Utilities, dropdownElWrapper: HTMLElement, options: string[]): void {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]") as HTMLSelectElement;
        const currentDropdownOptions = ddlEl.querySelectorAll("option") as NodeListOf<HTMLOptionElement>;
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            option.remove();
        });

        for (let i = 0; i < options.length; i++) {
            const ddlOptionData: DropdownOptionDTO = { dropdownValue: options[i], dropdownTextContent: options[i] };
            const newOption: HTMLOptionElement = utils.CreateDropdownOption(ddlOptionData);
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
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Single Choice Question",
            ElementToUpdate: singleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Single Choice Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("scOptions", "Single Choice Options");
        //#endregion

        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromSingleChoice, singleChoiceElement, this.UpdateSingleChoiceOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateSingleChoiceOptions(utils: Utilities, singlchoiceElWrapper: HTMLElement, options: string[]): void {
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
            const divSinglChoiceWrapper: HTMLDivElement = utils.CreateSingleChoiceOption(scOptionData);
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

        //#region Multiple Choice Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: multipleChoiceLabelText,
            AriaRoleDesc: "Edit Multiple Choice Question",
            ElementToUpdate: multipleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Multiple Choice Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("mcOptions", "Multiple Choice Options");
        //#endregion

        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromMultipleChoice, multipleChoiceElement, this.UpdateMultipleChoiceOptions);
        optionsWrapper.appendChild(textarea);

        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateMultipleChoiceOptions(utils: Utilities, multipleChoiceElWrapper: HTMLElement, options: string[]): void {
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
            const divSinglChoiceWrapper: HTMLDivElement = utils.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion

    //#region Date Picker Properties
    private DatePickerProperties(dropdownElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        const datePickerLabelEl = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const datePickerLabelText: string = datePickerLabelEl.textContent;

        //#region Date Picker Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Date",
            InputVal: datePickerLabelText,
            AriaRoleDesc: "Edit Date Picker",
            ElementToUpdate: datePickerLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion

    //#region Time Properties
    private TimeProperties(dropdownElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        const timeLabelEl = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const timeLabelText: string = timeLabelEl.textContent;

        //#region Time Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Time",
            InputVal: timeLabelText,
            AriaRoleDesc: "Edit Time",
            ElementToUpdate: timeLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
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