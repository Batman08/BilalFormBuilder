/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />

class FormElementProperties {
    private readonly rightDesigner = document.querySelector('#rightDesigner') as HTMLDivElement;
    private _tinymce: any;

    public Init(tinymce: any): void {
        this._tinymce = tinymce;
    }

    public GetElementProperties(elementType: string, element: HTMLElement, callback?: Function) {

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

    private FillPropertiesDesigner(elementType: string, element: HTMLElement) {
        //loop through all inputs within element    
        var inputs = element.querySelectorAll("input");
    }

    //#region Basic Properties
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

    private DropdownProperties(paragraphElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        //region Extract Data
        const labelTextElement = paragraphElement.querySelector(".form-label") as HTMLParagraphElement;
        const currentLabelText: string = labelTextElement.textContent;

        //find element within paragraphElement that is a select element
        const allDropdownOptions = paragraphElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;
        //#endregion

        //#region Create/Fill Property Fields
        const editLabelFieldWrapper = document.createElement("div") as HTMLDivElement;
        editLabelFieldWrapper.classList.add("mb-3");

        const editLabel = document.createElement("label") as HTMLLabelElement;
        editLabel.htmlFor = "txtDropdown";
        editLabel.classList.add("form-label");
        editLabel.textContent = currentLabelText;

        const editInput = document.createElement("input") as HTMLInputElement;
        editInput.type = "text";
        editInput.value = "Enter Option";
        editInput.classList.add("form-control");
        editInput.id = "txtDropdown";
        editInput.ariaRoleDescription = "Edit Dropdown Question";

        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);

        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.textContent = "Dropdown Options";
        optionsWrapper.appendChild(optionsLabel);
        
        allDropdownOptions.forEach((option) => {
            const dropdownOption = document.createElement("input") as HTMLInputElement;
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