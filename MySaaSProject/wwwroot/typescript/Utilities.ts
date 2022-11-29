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
            //themes: 'modern',
            //height: 200
        });
    }

    public AddTinymceListeners(tinymce: any, element: HTMLElement, callback: Function): void {
        //add new key up event listner for _tinymce
        tinymce.activeEditor.getBody().onkeyup = (ev: KeyboardEvent) => {
            if (ev.target) {
                //do something
                callback(tinymce, element);
            }
        };

        tinymce.activeEditor.getContentAreaContainer().onmousedown = (ev: MouseEvent) => {
            if (ev.target) {
                //do something
                callback(tinymce, element);
            }
        };
    }
    //#endregion
}