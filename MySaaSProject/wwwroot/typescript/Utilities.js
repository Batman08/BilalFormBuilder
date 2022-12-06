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
    GetElOptionTotal(dataWrapperType, elName) {
        const allFormEls = document.querySelectorAll(`[data-wrapper-type=${dataWrapperType}`);
        let totalOptionCount = 0;
        allFormEls.forEach((elWrapper) => {
            const optionCount = elWrapper.querySelector(`[name=${elName}]`).children.length;
            totalOptionCount += optionCount;
        });
        return totalOptionCount;
    }
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
}
//# sourceMappingURL=Utilities.js.map