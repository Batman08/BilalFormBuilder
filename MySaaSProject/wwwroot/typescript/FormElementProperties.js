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
    FillPropertiesDesigner(elementType, element) {
        //loop through all inputs within element    
        var inputs = element.querySelectorAll("input");
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
            const newOption = document.createElement("option");
            newOption.value = options[i];
            newOption.textContent = options[i];
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
        const singleChoiceElName = singleChoicelEl.getAttribute("name");
        for (let i = 0; i < options.length; i++) {
            totalSinglChoiceOptionCount += 1;
            const singleChoiceOptionNum = totalSinglChoiceOptionCount;
            const singleChoiceOptionId = `singleChoiceOption${singleChoiceOptionNum}`;
            const divSinglChoiceWrapper = document.createElement("div");
            divSinglChoiceWrapper.classList.add("form-check");
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
            const singleChoiceInput = document.createElement("input");
            singleChoiceInput.type = "radio";
            singleChoiceInput.id = singleChoiceOptionId;
            singleChoiceInput.classList.add("form-check-input");
            singleChoiceInput.name = singleChoiceElName;
            divSinglChoiceWrapper.appendChild(singleChoiceInput);
            const singleChoiceLabel = document.createElement("label");
            singleChoiceLabel.classList.add("form-check-label");
            singleChoiceLabel.htmlFor = singleChoiceOptionId;
            singleChoiceLabel.textContent = options[i];
            divSinglChoiceWrapper.appendChild(singleChoiceLabel);
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