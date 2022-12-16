class Utilities {
    //#region Boostrap Modals
    public BTSP_GetOffCanvas(selector: string): bootstrap.Offcanvas {
        const offCanvasElement = document.querySelector(selector) as HTMLDivElement
        return new bootstrap.Offcanvas(offCanvasElement);
    }

    public BTSP_OpenOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.show();
    }

    public BTSP_CloseOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.hide();
    }
    //#endregion

    //#region TinyMCE
    public InitTinyMCE(tinymce: any, editorSelector: string) {
        // Initialize tinymce editor
        tinymce.init({
            selector: editorSelector
        });
    }

    public AddTinymceListeners(tinymce: any, element: HTMLElement, callback: Function): void {
        const btnTinymceUpgrade = document.querySelector('.tox-promotion') as HTMLDivElement;
        btnTinymceUpgrade.classList.add("hideElement");
        const iconTinymce = document.querySelector('.tox-statusbar__branding') as HTMLSpanElement;
        iconTinymce.classList.add("hideElement");

        //add input event listner for tinymce
        tinymce.activeEditor.getBody().oninput = (ev: InputEvent) => {
            if (ev.target) {
                //update paragraph element
                callback(tinymce, element);
            }
        };
    }
    //#endregion

    //#region Form Utils
    public CreateDropdownOption(ddlOptionData: DropdownOptionDTO): HTMLOptionElement {
        const ddlOption = document.createElement("option") as HTMLOptionElement;
        ddlOption.value = ddlOptionData.dropdownValue;
        ddlOption.textContent = ddlOptionData.dropdownTextContent;
        return ddlOption;
    }

    public CreateSingleChoiceOption(scOptionData: SingleChoiceOptionDTO): HTMLDivElement {
        const divSinglChoiceWrapper = document.createElement("div") as HTMLDivElement;
        divSinglChoiceWrapper.classList.add("form-check");

        const singleChoiceInput = document.createElement("input") as HTMLInputElement;
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        divSinglChoiceWrapper.appendChild(singleChoiceInput);

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("form-check-label");
        singleChoiceLabel.htmlFor = scOptionData.singleChoiceOptionId;
        singleChoiceLabel.textContent = scOptionData.singleChoiceOptionTextContent;
        divSinglChoiceWrapper.appendChild(singleChoiceLabel);

        return divSinglChoiceWrapper;
    }

    public CreateMultipleChoiceOption(mcOptionData: MultipleChoiceOptionDTO): HTMLDivElement {
        const divCheckboxOption = document.createElement("div") as HTMLDivElement;
        divCheckboxOption.classList.add("form-check");

        const checkboxInput = document.createElement("input") as HTMLInputElement;
        checkboxInput.classList.add("form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        divCheckboxOption.appendChild(checkboxInput);

        const checkboxLabel = document.createElement("label") as HTMLLabelElement;
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.htmlFor = mcOptionData.multipleChoiceOptionId;
        checkboxLabel.textContent = mcOptionData.multipleChoiceOptionTextContent;
        divCheckboxOption.appendChild(checkboxLabel);

        return divCheckboxOption;
    }
    //#endregion

    public RgbToHex(rgbVal: string): string {
        const rgb: string[] = rgbVal.substring(4, rgbVal.length - 1).replace(/ /g, '').split(',');
        const r = parseInt(rgb[0], 10).toString(16);
        const g = parseInt(rgb[1], 10).toString(16);
        const b = parseInt(rgb[2], 10).toString(16);
        const hex = "#" + r + g + b;
        return hex;
    }
}