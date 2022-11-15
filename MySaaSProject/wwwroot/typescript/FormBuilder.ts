﻿/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;

    private _tinymce: any;

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


    private AddEditDesign(element: HTMLDivElement): void {
        //remove createdFormElement class from all elements
        const createdFormElements = document.querySelectorAll(".createdFormElement") as NodeListOf<HTMLDivElement>;
        createdFormElements.forEach((element) => {
            element.classList.remove("formElementSelected");
        });

        //add createdFormElement class to the element
        element.classList.add("formElementSelected");
    }
    
    private EditFormElement(element: HTMLDivElement): void {
        this.AddEditDesign(element);

        this.ResetTinymceListeners();

        this._utils.BTSP_CloseOffCanvas(this._formElements);
        this._utils.BTSP_OpenOffCanvas(this._formDesigner);

        const formElementData = element.innerHTML;
        this._tinymce.activeEditor.setContent(formElementData);

        this.AddTinymceListeners(element);
    }

    
    private UpdateFormElement(element: HTMLDivElement, ev: Event): void {
        ev.preventDefault();
        console.log(element);
        element.innerHTML = this._tinymce.activeEditor.getContent();
    }

    private AddTinymceListeners(element: HTMLDivElement): void {
        //add new key up event listner for _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = (ev: KeyboardEvent) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev)
            }
        };

        this._tinymce.activeEditor.getContentAreaContainer().onmousedown = (ev: MouseEvent) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev)
            }
        };
    }

    private ResetTinymceListeners(): void {
        //remove key up event listner from _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = null;
        this._tinymce.activeEditor.getContentAreaContainer().onmousedown = null;
    }
}