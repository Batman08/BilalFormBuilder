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
            //themes: 'modern',
            //height: 200
        });
    }
    AddTinymceListeners(tinymce, element, callback) {
        //add new key up event listner for _tinymce
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
}
//# sourceMappingURL=Utilities.js.map