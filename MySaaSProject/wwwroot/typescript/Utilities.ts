class Utilities {
    /*  Boostrap Modals  */

    public BTSP_GetOffCanvas(selector: string): bootstrap.Offcanvas{
        const offCanvasElement = document.querySelector(selector) as HTMLDivElement
        return new bootstrap.Offcanvas(offCanvasElement);
    }

    public BTSP_OpenOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.show();
    }

    public BTSP_CloseOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.hide();
    }
}