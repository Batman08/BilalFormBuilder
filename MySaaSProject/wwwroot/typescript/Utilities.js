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
        //add new key up event listner for tinymce
        tinymce.activeEditor.getBody().onkeyup = (ev) => {
            if (ev.target) {
                //do something
                callback(tinymce, element);
            }
        };
        tinymce.activeEditor.getContentAreaContainer().onmousedown = (ev) => {
            if (ev.target) {
                //do something
                callback(tinymce, element);
            }
        };
    }
    //#endregion
    //#region Form Utils
    GetElOptionTotal(dataWrapperType, elName) {
        let totalOptionCount = 0;
        const allFormEls = document.querySelectorAll(`[data-wrapper-type=${dataWrapperType}`);
        allFormEls.forEach((elWrapper) => {
            const optionCount = elWrapper.querySelector(`[name=${elName}]`).children.length;
            totalOptionCount += optionCount;
        });
        return totalOptionCount;
    }
}
//# sourceMappingURL=Utilities.js.map