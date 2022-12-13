/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    constructor() {
        this.rightDesigner = document.querySelector('#rightDesigner');
        this._utils = new Utilities();
        //#endregion
    }
    Init(tinymce) {
        this._tinymce = tinymce;
    }
    GetElementProperties(elementType, element, callback) {
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
    //#region Generic Functions
    FieldLabelProperty(data) {
        const fieldLabelWrapper = document.createElement("div");
        fieldLabelWrapper.classList.add("mb-3");
        const fieldLabel = document.createElement("label");
        fieldLabel.htmlFor = "editField";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "Field Label";
        const fieldLabelInput = document.createElement("input");
        fieldLabelInput.id = "editField";
        fieldLabelInput.classList.add("form-control");
        fieldLabelInput.type = "text";
        fieldLabelInput.placeholder = data.PlaceHolder;
        fieldLabelInput.value = data.InputVal;
        fieldLabelInput.ariaRoleDescription = data.AriaRoleDesc;
        fieldLabelInput.oninput = (ev) => { data.ElementToUpdate.textContent = fieldLabelInput.value; };
        fieldLabelWrapper.appendChild(fieldLabel);
        fieldLabelWrapper.appendChild(fieldLabelInput);
        return fieldLabelWrapper;
    }
    TextareaLabelProperty(wrapperId, textVal) {
        const optionsWrapper = document.createElement("div");
        optionsWrapper.id = wrapperId;
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = textVal;
        optionsWrapper.appendChild(optionsLabel);
        return optionsWrapper;
    }
    MultiSelectTextAreaProperty(optionsFromMultiSelectEl, elementToUpdate, updateFunc) {
        const divTextarea = document.createElement("div");
        divTextarea.classList.add("form-floating");
        const textarea = document.createElement("textarea");
        textarea.id = "txtAreaOptions";
        textarea.classList.add("form-control");
        textarea.placeholder = "Enter each option on a new line";
        textarea.style.height = "100px";
        const textareaLabel = document.createElement("label");
        textareaLabel.htmlFor = "txtAreaOptions";
        textareaLabel.textContent = "Enter each option on a new line";
        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);
        let optionsFromElement = [];
        optionsFromMultiSelectEl.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            optionsFromElement.push(option.textContent);
        });
        this.UpdateTextAreaOptions(textarea, optionsFromElement);
        textarea.oninput = (ev) => {
            const options = this.GetOptionsFromTextarea(textarea);
            updateFunc(this._utils, elementToUpdate, options);
        };
        return divTextarea;
    }
    UpdateTextAreaOptions(textarea, options) {
        //add options to textarea
        if (options !== null && options !== undefined) {
            textarea.value = options.join('\n');
        }
    }
    GetOptionsFromTextarea(textarea) {
        //split data into array
        const options = textarea.value.split(/[\n,]+/);
        return options;
    }
    //#endregion
    //#region Basic Properties
    //#region Paragraph Properties
    ParagraphProperties(paragraphElement, callback) {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]");
        const currentText = elementToUpdateText.textContent;
        this.rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea');
        textArea.id = 'paragraph-editor';
        this.rightDesigner.appendChild(textArea);
        //this._tinymce.activeEditor.setContent("this is a test");
        //delay to init tinymce
        setTimeout(() => {
            const utils = new Utilities();
            utils.InitTinyMCE(this._tinymce, 'textarea#paragraph-editor');
            setTimeout(() => {
                this._tinymce.activeEditor.setContent(currentText);
                utils.AddTinymceListeners(this._tinymce, elementToUpdateText, callback);
            }, 1000);
        }, 0.0001);
    }
    //#endregion
    //#region Dropdown Properties
    DropdownProperties(dropdownElement, callback) {
        this.rightDesigner.innerHTML = '';
        const dropdownLabelEl = dropdownElement.querySelector(".form-label");
        const dropdownLabelText = dropdownLabelEl.textContent;
        const optionsFromDropdown = dropdownElement.querySelector("[data-property-reference]").childNodes;
        //#region Dropdown Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Dropdown Question",
            ElementToUpdate: dropdownLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Dropdown Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("ddlOptions", "Dropdown Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromDropdown, dropdownElement, this.UpdateDropdownOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateDropdownOptions(utils, dropdownElWrapper, options) {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]");
        const currentDropdownOptions = ddlEl.querySelectorAll("option");
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            option.remove();
        });
        for (let i = 0; i < options.length; i++) {
            const ddlOptionData = { dropdownValue: options[i], dropdownTextContent: options[i] };
            const newOption = utils.CreateDropdownOption(ddlOptionData);
            ddlEl.appendChild(newOption);
        }
    }
    //#endregion
    //#region Single Choice Properties
    SingleChoiceProperties(singleChoiceElement, callback) {
        this.rightDesigner.innerHTML = '';
        const singleChoiceLabelEl = singleChoiceElement.querySelector(".form-label");
        const dropdownLabelText = singleChoiceLabelEl.textContent;
        const optionsFromSingleChoice = singleChoiceElement.querySelector("[data-property-reference]").childNodes;
        //#region Single Choice Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Single Choice Question",
            ElementToUpdate: singleChoiceLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Single Choice Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("scOptions", "Single Choice Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromSingleChoice, singleChoiceElement, this.UpdateSingleChoiceOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateSingleChoiceOptions(utils, singlchoiceElWrapper, options) {
        const singleChoicelEl = singlchoiceElWrapper.querySelector("[data-property-reference]");
        singleChoicelEl.innerHTML = "";
        const singleChoicelElNumber = singleChoicelEl.id.substring(12);
        const singleChoiceElName = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelElNumber}`;
        for (let i = 0; i < options.length; i++) {
            const singleChoiceOptionNum = i + 1;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;
            const scOptionData = {
                singleChoiceOptionId: singleChoiceOptionId,
                singleChoiceElName: singleChoiceElName,
                singleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper = utils.CreateSingleChoiceOption(scOptionData);
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion
    //#region Multiple Choice Properties
    MultipleChoiceProperties(multipleChoiceElement, callback) {
        this.rightDesigner.innerHTML = '';
        const multipleChoiceLabelEl = multipleChoiceElement.querySelector(".form-label");
        const multipleChoiceLabelText = multipleChoiceLabelEl.textContent;
        const optionsFromMultipleChoice = multipleChoiceElement.querySelector("[data-property-reference]").childNodes;
        //#region Multiple Choice Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: multipleChoiceLabelText,
            AriaRoleDesc: "Edit Multiple Choice Question",
            ElementToUpdate: multipleChoiceLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Multiple Choice Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("mcOptions", "Multiple Choice Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromMultipleChoice, multipleChoiceElement, this.UpdateMultipleChoiceOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateMultipleChoiceOptions(utils, multipleChoiceElWrapper, options) {
        const multipleChoicelEl = multipleChoiceElWrapper.querySelector("[data-property-reference]");
        multipleChoicelEl.innerHTML = "";
        const multipleChoicelElNumber = multipleChoicelEl.id.substring(14);
        for (let i = 0; i < options.length; i++) {
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;
            const mcOptionData = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: options[i],
                multipleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper = utils.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion
    //#endregion
    //#region Complex Properties
    HeadingProperties(headingElement) {
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
    FullNameProperties(headingElement) {
    }
}
//# sourceMappingURL=FormElementProperties.js.map