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

    //#region dropdown
    private DropdownProperties(dropdownElement: HTMLElement, callback?: Function): void {
        this.rightDesigner.innerHTML = '';

        //region Extract Data
        const labelTextElement = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const currentLabelText: string = labelTextElement.textContent;

        //find element within paragraphElement that is a select element
        const allDropdownOptions = dropdownElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;
        //#endregion

        //#region Create/Fill Property Fields
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
        editInput.value = currentLabelText;
        editInput.ariaRoleDescription = "Edit Dropdown Question";
        editInput.oninput = (ev: InputEvent) => { labelTextElement.textContent = editInput.value; };

        editLabelFieldWrapper.appendChild(editLabel);
        editLabelFieldWrapper.appendChild(editInput);

        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = "ddlOptions";
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.textContent = "Dropdown Options";
        optionsWrapper.appendChild(optionsLabel);

        allDropdownOptions.forEach((option) => {
            if (option.firstChild.nodeValue === "Select an option")
                return
            this.AddNewOption(option.textContent, this.DeleteOption, optionsWrapper, dropdownElement);
        });

        //#region Add Option Section
        const addOptionFieldWrapper = document.createElement("div") as HTMLDivElement;
        addOptionFieldWrapper.classList.add("mb-3", "pt-3");

        const divRow = document.createElement("div") as HTMLDivElement;
        divRow.classList.add("row");
        addOptionFieldWrapper.appendChild(divRow);

        const addOptionLabel = document.createElement("label") as HTMLLabelElement;
        addOptionLabel.htmlFor = "txtAddOption";
        addOptionLabel.classList.add("form-label");
        addOptionLabel.textContent = "Add Option";
        divRow.appendChild(addOptionLabel);

        const addOptionInputWrapper = document.createElement("div") as HTMLDivElement;
        addOptionInputWrapper.classList.add("col-md-8");
        divRow.appendChild(addOptionInputWrapper);

        const addOptionInput = document.createElement("input") as HTMLInputElement;
        addOptionInput.id = "txtAddOption";
        addOptionInput.type = "text";
        addOptionInput.placeholder = "Enter Option";
        addOptionInput.classList.add("form-control");
        addOptionInputWrapper.appendChild(addOptionInput);

        const addOptionButtonWrapper = document.createElement("div") as HTMLDivElement;
        addOptionButtonWrapper.classList.add("col-md-4");
        divRow.appendChild(addOptionButtonWrapper);

        const addOptionButton = document.createElement("button") as HTMLButtonElement;
        addOptionButton.classList.add("btn", "btn-primary");
        addOptionButton.textContent = "Add";
        addOptionButtonWrapper.appendChild(addOptionButton);
        addOptionButton.onclick = (ev: MouseEvent) => this.AddNewOption(addOptionInput.value, this.DeleteOption, optionsWrapper, dropdownElement, this.UpdateDropdownOptions, dropdownElement);
        //#endregion
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(divRow);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private AddNewOption(optionValue: string, func: Function, areaToAppend: HTMLElement, editedEl: HTMLElement, inputEventFunc?: Function, funcParam?: HTMLElement): void {
        const newOptionFieldWrapper = document.createElement("div") as HTMLDivElement;
        newOptionFieldWrapper.classList.add("mb-3", "mt-2");

        const divRow = document.createElement("div") as HTMLDivElement;
        divRow.classList.add("row");
        newOptionFieldWrapper.appendChild(divRow);

        const newOptionInputWrapper = document.createElement("div") as HTMLDivElement;
        newOptionFieldWrapper.setAttribute("name", "ddlOptions");
        newOptionInputWrapper.classList.add("col-md-10");
        divRow.appendChild(newOptionInputWrapper);

        const newOptionInput = document.createElement("input") as HTMLInputElement;
        newOptionInput.type = "text";
        newOptionInput.setAttribute("data-option", "");

        const areaOnlyContainsLabelElement: boolean = areaToAppend.children.length <= 1;
        if (areaOnlyContainsLabelElement)
            newOptionInput.classList.add("form-control");
        else
            newOptionInput.classList.add("form-control");
        newOptionInput.value = optionValue;

        newOptionInputWrapper.appendChild(newOptionInput);

        const deleteOptionBtnWrapper = document.createElement("div") as HTMLDivElement;
        deleteOptionBtnWrapper.classList.add("col-md-2");
        divRow.appendChild(deleteOptionBtnWrapper);

        const deleteOptionBtn = document.createElement("button") as HTMLButtonElement;
        deleteOptionBtn.classList.add("btn", "btn-danger");
        deleteOptionBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteOptionBtn.onclick = (ev: MouseEvent) => {
            func(newOptionFieldWrapper);
            this.UpdateDropdownOptions(editedEl);
        };
        deleteOptionBtnWrapper.appendChild(deleteOptionBtn);

        areaToAppend.appendChild(newOptionFieldWrapper);

        if (inputEventFunc !== undefined && inputEventFunc !== null && funcParam !== undefined && funcParam !== null)
            inputEventFunc(funcParam);
    }

    private UpdateDropdownOptions(dropdownElWrapper: HTMLElement): void {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]") as HTMLSelectElement;
        const currentDropdownOptions = ddlEl.querySelectorAll("option") as NodeListOf<HTMLOptionElement>;
        const newDropdownOptions = document.querySelector("#ddlOptions").querySelectorAll("[data-option]") as NodeListOf<HTMLInputElement>;
        console.log(currentDropdownOptions);
        console.log(newDropdownOptions);
        currentDropdownOptions.forEach((option) => {
            if (option.firstChild.nodeValue === "Select an option")
                return

            /*const optionValue = allDropdownOptionsInput[allDropdownOptions.indexOf(option)].value;*/
            /*option.textContent = optionValue;*/

            //const optionValue = newDropdownOptions[newDropdownOptions.indexOf(option)].value;
            option.remove();
        });

        for (let i = 0; i < newDropdownOptions.length; i++) {
            const newOption = document.createElement("option") as HTMLOptionElement;
            newOption.value = newDropdownOptions[i].value;
            newOption.textContent = newDropdownOptions[i].value;
            ddlEl.appendChild(newOption);
        }
    }

    private DeleteOption(htmlElement: HTMLElement): void {
        htmlElement.remove();
    }

    private OptionListeners(): void {
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