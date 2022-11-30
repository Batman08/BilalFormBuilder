/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    constructor() {
        this.rightDesigner = document.querySelector('#rightDesigner');
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
    DropdownProperties(paragraphElement, callback) {
        this.rightDesigner.innerHTML = '';
        //region Extract Data
        const labelTextElement = paragraphElement.querySelector(".form-label");
        const currentLabelText = labelTextElement.textContent;
        //find element within paragraphElement that is a select element
        const allDropdownOptions = paragraphElement.querySelector("[data-property-reference]").childNodes;
        //#endregion
        //#region Create/Fill Property Fields
        const editLabelFieldWrapper = document.createElement("div");
        editLabelFieldWrapper.classList.add("mb-3");
        const editLabel = document.createElement("label");
        editLabel.htmlFor = "txtDropdown";
        editLabel.classList.add("form-label");
        editLabel.textContent = currentLabelText;
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = "Enter Option";
        editInput.classList.add("form-control");
        editInput.id = "txtDropdown";
        editInput.ariaRoleDescription = "Edit Dropdown Question";
        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);
        const optionsWrapper = document.createElement("div");
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.textContent = "Dropdown Options";
        optionsWrapper.appendChild(optionsLabel);
        allDropdownOptions.forEach((option) => {
            const dropdownOption = document.createElement("input");
            dropdownOption.type = "text";
            dropdownOption.classList.add("form-control");
            dropdownOption.value = option.textContent;
            optionsWrapper.appendChild(dropdownOption);
        });
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
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