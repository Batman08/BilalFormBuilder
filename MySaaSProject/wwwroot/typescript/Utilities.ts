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
    public GetElOptionTotal(dataWrapperType: string, elName: string): number {
        const allFormEls = document.querySelectorAll(`[data-wrapper-type=${dataWrapperType}`) as NodeListOf<HTMLDivElement>;
        let totalOptionCount: number = 0;
        allFormEls.forEach((elWrapper) => {
            const optionCount: number = elWrapper.querySelector(`[name=${elName}]`).children.length;
            totalOptionCount += optionCount;
        });
        return totalOptionCount;
    }

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
    //#endregion
}