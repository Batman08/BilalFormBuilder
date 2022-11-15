/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

//import { Editor} from "tinymce";

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    
    /*private _tinymce: Editor;*/
    private _tinymce: any;
    private _editor = document.querySelector("#default-editor") as HTMLSelectElement;

    private _utils = new Utilities();
    private _formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');

    constructor(tinymce: any) {
        this._tinymce = tinymce;
        this.AddFormElement();
    }

    private AddFormElement(): void {
        const _formElements = document.querySelectorAll(".formElementWrapper") as NodeListOf<HTMLDivElement>;
        _formElements.forEach((element) => {
            this.AddFormClick(element);
        });
    }

    private AddFormClick(element: any): void {
        if (element != null) {
            element.onclick = (ev: MouseEvent) => {
                //get attribute value
                const retrievedElementType = element.getAttribute("data-element-type") as string;
                if (retrievedElementType === null) {
                    alert("missing components, please refresh the page!!!");
                    return;
                }

                const formElement: FormElements = new FormElements();
                ev.preventDefault();
                const createFormElement = formElement.FindFormElementToCreate(retrievedElementType) as HTMLDivElement;

                if (createFormElement != null) {
                    createFormElement.onclick = (ev: MouseEvent) => this.EditFormElement(createFormElement);
                    this._customFormSection.append(createFormElement);
                }
            };
        }
    }

    public AddElementFromDrag(element: any): void {
        //get attribute value
        const retrievedElementType = element.getAttribute("data-element-type") as string;
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            element.remove();
            return;
        }

        const formElement: FormElements = new FormElements();
        const divHeadingWrapper = formElement.FindFormElementToCreate(element.getAttribute("data-element-type") as string);

        if (divHeadingWrapper != null) {
            element.after(divHeadingWrapper);
        }

        element.remove();
        this.AddFormElement();
    }


    public EditFormElement(element: HTMLDivElement): void {
        console.log(this._tinymce);
        //remove key up event listner from _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = null;

        this._utils.BTSP_CloseOffCanvas(this._formElements);
        this._utils.BTSP_OpenOffCanvas(this._formDesigner);

        const formElementData = element.innerHTML;
        this._tinymce.activeEditor.setContent(formElementData);
        //this._tinymce.setContent(formElementData);

        //add new key up event listner for _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = (ev: KeyboardEvent) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev)
            }
        };
    }

    public UpdateFormElement(element: HTMLDivElement, ev: KeyboardEvent): void {
        debugger
        ev.preventDefault();
        console.log(element);
        element.innerHTML = this._tinymce.activeEditor.getContent();
    }
}