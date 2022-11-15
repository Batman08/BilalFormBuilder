class Utilities {
    /*  Boostrap Modals  */
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
}
//# sourceMappingURL=Utilities.js.map