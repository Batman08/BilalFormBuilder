﻿/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private _currentSelectedFormElement: HTMLDivElement;

    private _tinymce: any;

    private _utils = new Utilities();
    private _formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');

    constructor(tinymce: any) {
        this._tinymce = tinymce;
        this.AddFormElement();
    }

    private AddFormElement(): void {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper") as NodeListOf<HTMLDivElement>;
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
                const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType) as HTMLDivElement;

                if (createdFormElement != null) {
                    createdFormElement.onclick = (ev: MouseEvent) => { console.log("elmeent click"); this.EditFormElement(createdFormElement) };
                    createdFormElement.onblur = (ev: FocusEvent) => this.RemoveSelectedFormElementStyle();

                    /*need to look at this again*/
                    //createdFormElement.onmouseenter = (ev: Event) => { createFormElement.removeAttribute("dataindex")!; }
                    //createdFormElement.onmouseleave = (ev: Event) => { createFormElement.setAttribute("dataindex", "1"); }


                    this._customFormSection.append(createdFormElement);
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
        const createdFormElement = formElement.FindFormElementToCreate(element.getAttribute("data-element-type") as string);

        if (createdFormElement != null) {
            createdFormElement.onclick = (ev: MouseEvent) => { console.log("elmeent click"); this.EditFormElement(createdFormElement) };
            createdFormElement.onblur = (ev: FocusEvent) => this.RemoveSelectedFormElementStyle();

            /*need to look at this again*/
            //createFormElement.onmouseenter = (ev: Event) => { createFormElement.removeAttribute("dataindex")!; }
            //createFormElement.onmouseleave = (ev: Event) => { createFormElement.setAttribute("dataindex", "1"); }

            element.after(createdFormElement);
        }

        element.remove();
        this.AddFormElement();
    }


    private EditFormElement(element: HTMLDivElement): void {
        if (this._currentSelectedFormElement !== undefined) {
            console.log(this._currentSelectedFormElement);
            debugger
            console.log(this._currentSelectedFormElement!.querySelector('#selectedFormElementControl')!);
            this._currentSelectedFormElement!.querySelector('#selectedFormElementControl')!.remove();
        }


        //set new current form element
        this._currentSelectedFormElement = element;

        console.log(this._currentSelectedFormElement);
        const formElement: FormElements = new FormElements();
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);

        this.AddEditDesign(element);

        this.ResetTinymceListeners();

        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty') as HTMLDivElement;
        selectedControlBtnProperty.onclick = (ev: MouseEvent) => {
            this._utils.BTSP_CloseOffCanvas(this._formElements);
            this._utils.BTSP_OpenOffCanvas(this._formDesigner);

            const formElementData = element.innerHTML;
            this._tinymce.activeEditor.setContent(formElementData);

            this.AddTinymceListeners(element);
        }

        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete') as HTMLDivElement;
        selectedControlDeleteBtn.onclick = (ev: MouseEvent) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesigner);
        }

        //if designer already open then show form element value in tinymce field
        const designer = document.querySelector('#offcanvasRight') as HTMLDivElement;
        if (designer.classList.contains("show")) {
            const formElementData = element.innerHTML;
            this._tinymce.activeEditor.setContent(formElementData);

            this.AddTinymceListeners(element);
        }
    }

    private AddEditDesign(element: HTMLDivElement): void {
        this.RemoveSelectedFormElementStyle();

        //add createdFormElement class to the element
        element.classList.add("formElementSelected");
    }

    private RemoveSelectedFormElementStyle(): void {
        const createdFormElements = document.querySelectorAll(".createdFormElement") as NodeListOf<HTMLDivElement>;
        createdFormElements.forEach((element) => {
            element.classList.remove("formElementSelected");
        });
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

    private RemoveFormElement(element: HTMLDivElement): void {
        element.remove();
    }
}