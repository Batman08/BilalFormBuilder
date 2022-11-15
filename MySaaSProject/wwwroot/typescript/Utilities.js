class Utilities {
    /*  Boostrap Modals  */
    BTSP_GetOffCanvas(selector) {
        const offCanvasElement = document.querySelector(selector);
        return new bootstrap.Offcanvas(offCanvasElement);
    }
    BTSP_OpenOffCanvas(offCanvas) {
        debugger;
        offCanvas.show();
    }
    BTSP_CloseOffCanvas(offCanvas) {
        debugger;
        offCanvas.hide();
    }
}
//# sourceMappingURL=Utilities.js.map