class Utilities {
    //#region Boostrap Modals
    BTSP_GetOffCanvas(selector) {
        const offCanvasElement = document.querySelector(selector);
        return new bootstrap.Offcanvas(offCanvasElement);
    }
    BTSP_OpenOffCanvas(offCanvas) {
        offCanvas.show();
    }
    BTSP_CloseOffCanvas(offCanvas) {
        offCanvas.hide();
    }
    //#endregion
    //#region TinyMCE
    InitTinyMCE(tinymce, editorSelector) {
        // Initialize tinymce editor
        tinymce.init({
            selector: editorSelector
        });
    }
    AddTinymceListeners(tinymce, element, callback) {
        const btnTinymceUpgrade = document.querySelector('.tox-promotion');
        btnTinymceUpgrade.classList.add("hideElement");
        const iconTinymce = document.querySelector('.tox-statusbar__branding');
        iconTinymce.classList.add("hideElement");
        //add input event listner for tinymce
        tinymce.activeEditor.getBody().oninput = (ev) => {
            if (ev.target) {
                //update paragraph element
                callback(tinymce, element);
            }
        };
    }
    //#endregion
    //#region Form Utils
    CreateDropdownOption(ddlOptionData) {
        const ddlOption = document.createElement("option");
        ddlOption.value = ddlOptionData.dropdownValue;
        ddlOption.textContent = ddlOptionData.dropdownTextContent;
        return ddlOption;
    }
    CreateSingleChoiceOption(scOptionData) {
        const divSinglChoiceWrapper = document.createElement("div");
        divSinglChoiceWrapper.classList.add("form-check");
        const singleChoiceInput = document.createElement("input");
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        divSinglChoiceWrapper.appendChild(singleChoiceInput);
        const singleChoiceLabel = document.createElement("label");
        singleChoiceLabel.classList.add("form-check-label");
        singleChoiceLabel.htmlFor = scOptionData.singleChoiceOptionId;
        singleChoiceLabel.textContent = scOptionData.singleChoiceOptionTextContent;
        divSinglChoiceWrapper.appendChild(singleChoiceLabel);
        return divSinglChoiceWrapper;
    }
    CreateMultipleChoiceOption(mcOptionData) {
        const divCheckboxOption = document.createElement("div");
        divCheckboxOption.classList.add("form-check");
        const checkboxInput = document.createElement("input");
        checkboxInput.classList.add("form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        divCheckboxOption.appendChild(checkboxInput);
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.htmlFor = mcOptionData.multipleChoiceOptionId;
        checkboxLabel.textContent = mcOptionData.multipleChoiceOptionTextContent;
        divCheckboxOption.appendChild(checkboxLabel);
        return divCheckboxOption;
    }
    //#endregion
    RgbToHex(rgbVal) {
        const rgb = rgbVal.substring(4, rgbVal.length - 1).replace(/ /g, '').split(',');
        const r = parseInt(rgb[0], 10).toString(16);
        const g = parseInt(rgb[1], 10).toString(16);
        const b = parseInt(rgb[2], 10).toString(16);
        const hex = "#" + r + g + b;
        return hex;
    }
}
//# sourceMappingURL=Utilities.js.map