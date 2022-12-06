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
    //#region Generic Multi-Selection Functions
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
        const editLabelFieldWrapper = document.createElement("div");
        editLabelFieldWrapper.classList.add("mb-3");
        const editLabel = document.createElement("label");
        editLabel.htmlFor = "txtDropdown";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";
        const editInput = document.createElement("input");
        editInput.id = "txtDropdown";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question";
        editInput.value = dropdownLabelText;
        editInput.ariaRoleDescription = "Edit Dropdown Question";
        editInput.oninput = (ev) => { dropdownLabelEl.textContent = editInput.value; };
        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion
        //#region Dropdown Options
        //#region Label Property Element
        const optionsWrapper = document.createElement("div");
        optionsWrapper.id = "ddlOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = "Dropdown Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion
        //#region Textarea Property Element
        const divTextarea = document.createElement("div");
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);
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
        optionsFromDropdown.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            optionsFromElement.push(option.textContent);
        });
        this.UpdateTextAreaOptions(textarea, optionsFromElement);
        textarea.oninput = (ev) => {
            const options = this.GetOptionsFromTextarea(textarea);
            this.UpdateDropdownOptions(dropdownElement, options);
        };
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateDropdownOptions(dropdownElWrapper, options) {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]");
        const currentDropdownOptions = ddlEl.querySelectorAll("option");
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            option.remove();
        });
        for (let i = 0; i < options.length; i++) {
            const ddlOptionData = { dropdownValue: options[i], dropdownTextContent: options[i] };
            const newOption = this._utils.CreateDropdownOption(ddlOptionData);
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
        const editLabelFieldWrapper = document.createElement("div");
        editLabelFieldWrapper.classList.add("mb-3");
        const editLabel = document.createElement("label");
        editLabel.htmlFor = "txtSingleChoice";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";
        const editInput = document.createElement("input");
        editInput.id = "txtSingleChoice";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question";
        editInput.value = dropdownLabelText;
        editInput.ariaRoleDescription = "Edit Single Question";
        editInput.oninput = (ev) => { singleChoiceLabelEl.textContent = editInput.value; };
        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion
        //#region Single Choice Options
        //#region Label Property Element
        const optionsWrapper = document.createElement("div");
        optionsWrapper.id = "scOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "scOptions";
        optionsLabel.textContent = "Single Choice Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion
        //#region Textarea Property Element
        const divTextarea = document.createElement("div");
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);
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
        optionsFromSingleChoice.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            optionsFromElement.push(option.textContent);
        });
        this.UpdateTextAreaOptions(textarea, optionsFromElement);
        textarea.oninput = (ev) => {
            const options = this.GetOptionsFromTextarea(textarea);
            this.UpdateSingleChoiceOptions(singleChoiceElement, options);
        };
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateSingleChoiceOptions(singlchoiceElWrapper, options) {
        const singleChoicelEl = singlchoiceElWrapper.querySelector("[data-property-reference]");
        singleChoicelEl.innerHTML = "";
        let totalSinglChoiceOptionCount = this._utils.GetElOptionTotal("singleChoiceWrapper", "singleChoice");
        const singleChoiceElName = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelEl.id.substring(12, 13)}`;
        for (let i = 0; i < options.length; i++) {
            totalSinglChoiceOptionCount += 1;
            const singleChoiceOptionNum = totalSinglChoiceOptionCount;
            const singleChoiceOptionId = `singleChoiceOption${singleChoiceOptionNum}`;
            const scOptionData = { singleChoiceOptionId: singleChoiceOptionId, singleChoiceElName: singleChoiceElName, singleChoiceOptionTextContent: options[i] };
            const divSinglChoiceWrapper = this._utils.CreateSingleChoiceOption(scOptionData);
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
        //#region Single Choice Label Property
        const editLabelFieldWrapper = document.createElement("div");
        editLabelFieldWrapper.classList.add("mb-3");
        const editLabel = document.createElement("label");
        editLabel.htmlFor = "txtMultipleChoice";
        editLabel.classList.add("form-label");
        editLabel.textContent = "Field Label";
        const editInput = document.createElement("input");
        editInput.id = "txtMultipleChoice";
        editInput.classList.add("form-control");
        editInput.type = "text";
        editInput.placeholder = "type a question";
        editInput.value = multipleChoiceLabelText;
        editInput.ariaRoleDescription = "Edit Multiple Question";
        editInput.oninput = (ev) => { multipleChoiceLabelEl.textContent = editInput.value; };
        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        //#endregion
        //#region Single Choice Options
        //#region Label Property Element
        const optionsWrapper = document.createElement("div");
        optionsWrapper.id = "mcOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "scOptions";
        optionsLabel.textContent = "Single Choice Options";
        optionsWrapper.appendChild(optionsLabel);
        //#endregion
        //#region Textarea Property Element
        const divTextarea = document.createElement("div");
        divTextarea.classList.add("form-floating");
        optionsWrapper.appendChild(divTextarea);
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
        optionsFromMultipleChoice.forEach((option) => {
            optionsFromElement.push(option.textContent);
        });
        this.UpdateTextAreaOptions(textarea, optionsFromElement);
        textarea.oninput = (ev) => {
            const options = this.GetOptionsFromTextarea(textarea);
            this.UpdateMultipleChoiceOptions(multipleChoiceElement, options);
        };
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateMultipleChoiceOptions(multipleChoiceElWrapper, options) {
        const multipleChoicelEl = multipleChoiceElWrapper.querySelector("[data-property-reference]");
        multipleChoicelEl.innerHTML = "";
        let totalSinglChoiceOptionCount = this._utils.GetElOptionTotal("multipleChoiceWrapper", "multipleChoice");
        for (let i = 0; i < options.length; i++) {
            totalSinglChoiceOptionCount += 1;
            const multipleChoiceOptionNum = totalSinglChoiceOptionCount;
            const multipleChoiceOptionId = `multipleChoiceOption${multipleChoiceOptionNum}`;
            const mcOptionData = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: options[i],
                multipleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper = this._utils.CreateMultipleChoiceOption(mcOptionData);
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