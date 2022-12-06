﻿/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _btnFormDesigner = document.querySelector("#btnFormDesigner") as HTMLButtonElement;
    private _offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel") as HTMLHeadingElement;

    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private _currentSelectedFormElement: HTMLDivElement;

    private _formElementProperties: FormElementProperties = new FormElementProperties();
    private _utils: Utilities = new Utilities();
    private _formElementsOffCanvas: bootstrap.Offcanvas = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesignerOffCanvas: bootstrap.Offcanvas = this._utils.BTSP_GetOffCanvas('#offcanvasRight');

    private readonly _tabContent = document.querySelector("#myTabContent") as HTMLDivElement;

    public Init(tinymce: any): void {
        this._formElementProperties.Init(tinymce);

        const formElement = new FormElements();
        formElement.Init();

        this._btnFormDesigner.onclick = (ev: MouseEvent) => this._offcanvasDesignerRightLabel.textContent = "Form Designer";
        this.AddFormElement();

        const body = document.querySelector('body') as HTMLBodyElement;
        const customFormArea = document.querySelector('#customFormArea') as HTMLBodyElement;

        body.onclick = (ev: MouseEvent) => {
            let btnControls: HTMLDivElement | null = null;
            const isClickInsideElement = customFormArea.contains(ev.target as Node);
            if (!isClickInsideElement) {
                btnControls = document.querySelector('#selectedFormElementControl');
                if (btnControls != null)
                    btnControls.remove();
                this.RemoveSelectedFormElementStyle();
            }
        };
    }

    //#region Create
    private AddFormElement(): void {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper") as NodeListOf<HTMLDivElement>;
        _formElements.forEach((element) => {
            this.AddFormClick(element);
        });
    }

    private AddFormClick(element: any): void {
        if (element != null) {
            element.onclick = (ev: MouseEvent) => {
                this.AppendCreatedFormElement(element, false);
            };
        }
    }

    public AddElementFromDrag(element: any): void {
        this.AppendCreatedFormElement(element, true);
    }

    private AppendCreatedFormElement(element: any, shouldInsert: boolean): void {
        //get attribute value
        const retrievedElementType = element.getAttribute("data-element-type") as string;
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            if (shouldInsert) {
                element.remove();
            }
            return;
        }

        const formElement = new FormElements();
        const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType) as HTMLDivElement;

        if (createdFormElement != null) {
            createdFormElement.onclick = (ev: MouseEvent) => this.SelectedFormElementToEdit(createdFormElement);
            //createdFormElement.onblur = (ev: FocusEvent) => this.RemoveSelectedFormElementStyle();

            /*need to look at this again*/
            //createdFormElement.onmouseenter = (ev: Event) => { createFormElement.removeAttribute("dataindex")!; }
            //createdFormElement.onmouseleave = (ev: Event) => { createFormElement.setAttribute("dataindex", "1"); }

            if (shouldInsert) {
                element.after(createdFormElement);
            }
            else if (!shouldInsert) {
                this._customFormSection.append(createdFormElement);
            }
        }

        if (shouldInsert)
            element.remove();

        this.AddFormElement();
    }
    //#endregion

    //#region Edit
    public SelectedFormElementToEdit(element: HTMLDivElement): void {
        const formElement = new FormElements();

        this.AddEditDesign(element);

        const previousSelectedElementExists: boolean = this._currentSelectedFormElement !== undefined;
        if (previousSelectedElementExists) {
            //remove edit btns from previously selected element
            const previousBtnControls: HTMLDivElement | null = this._currentSelectedFormElement!.querySelector('#selectedFormElementControl');
            if (previousBtnControls !== null) {
                previousBtnControls.remove();
            }
        }

        //set new current form element
        this._currentSelectedFormElement = element;

        //create button scontrols
        const btnControls: HTMLDivElement = formElement.FormElementControls();
        element.appendChild(btnControls);

        //if properties designer already open then show form properties in designer
        const propertiesDesigner = document.querySelector('#offcanvasRight') as HTMLDivElement;
        if (propertiesDesigner.classList.contains("show")) {
            this.Edit();
        }

        //#region edit buttons
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty') as HTMLDivElement;
        selectedControlBtnProperty.onclick = (ev: MouseEvent) => {
            this.Edit();
            this._utils.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._utils.BTSP_OpenOffCanvas(this._formDesignerOffCanvas);
        }

        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete') as HTMLDivElement;
        selectedControlDeleteBtn.onclick = (ev: MouseEvent) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
        }
        //#endregion
    }

    private Edit(): void {
        const elementWrapper: string = this._currentSelectedFormElement.getAttribute("data-wrapper-type") as string;
        const elementName: string = this._currentSelectedFormElement.querySelector("[data-property-reference]").getAttribute("data-property-reference");
        this._offcanvasDesignerRightLabel.textContent = `${elementName} Properties`;

        if (elementWrapper === "paragraphWrapper") {
            this._formElementProperties.GetElementProperties(elementWrapper, this._currentSelectedFormElement, this.UpdateFormElement);
        }
        else {
            this._formElementProperties.GetElementProperties(elementWrapper, this._currentSelectedFormElement);
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
    //#endregion

    //#region Update
    private UpdateFormElement(tinymce: any, element: HTMLDivElement): void {
        console.log(element);
        element.innerHTML = tinymce.activeEditor.getContent();
    }
    //#endregion

    //#region Delete
    private RemoveFormElement(element: HTMLDivElement): void {
        element.remove();
    }
    //#endregion
}