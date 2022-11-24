/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private _currentSelectedFormElement: HTMLDivElement;

    private _utils = new Utilities();
    private _formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');

    private readonly _tabContent = document.querySelector("#myTabContent") as HTMLDivElement;
    
    constructor() {
        this.AddFormElement();
    }

    /* Create */
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

        const formElement: FormElements = new FormElements();
        //ev.preventDefault();
        const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType) as HTMLDivElement;

        if (createdFormElement != null) {
            createdFormElement.onclick = (ev: MouseEvent) => { console.log("element click"); this.EditFormElement(createdFormElement) };
            createdFormElement.onblur = (ev: FocusEvent) => this.RemoveSelectedFormElementStyle();

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

        if (shouldInsert) {
            element.remove();
        }
    }


    /* Edit */
    private EditFormElement(element: HTMLDivElement): void {
        if (this._currentSelectedFormElement !== undefined) {
            console.log(this._currentSelectedFormElement);
            console.log(this._currentSelectedFormElement!.querySelector('#selectedFormElementControl')!);
            this._currentSelectedFormElement!.querySelector('#selectedFormElementControl')!.remove();
        }

        //set new current form element
        this._currentSelectedFormElement = element;

        const formElement: FormElements = new FormElements();
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);

        this.AddEditDesign(element);

        //if designer already open then show form properties in designer
        const designer = document.querySelector('#offcanvasRight') as HTMLDivElement;
        if (designer.classList.contains("show")) {
            
            const formElementProperties = new FormElementProperties(element.getAttribute("data-wrapper-type"), element);
            element.querySelectorAll("[data-element-value]").forEach((element) => {
                const editHeadingText = document.querySelector("#txtHeading") as HTMLInputElement;
                if (editHeadingText.id === element.getAttribute("data-property-reference")) {
                    editHeadingText.setAttribute("data-element-reference", element.id);
                    editHeadingText.value = element.textContent;
                }
            });
        }

        /* edit buttons */
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty') as HTMLDivElement;
        selectedControlBtnProperty.onclick = (ev: MouseEvent) => {
            this._utils.BTSP_CloseOffCanvas(this._formElements);
            this._utils.BTSP_OpenOffCanvas(this._formDesigner);

            //get all closest elements
            
            element.querySelectorAll("[data-element-value]").forEach((element) => {
                const editHeadingText = document.querySelector("#txtHeading") as HTMLInputElement;
                if (editHeadingText.id === element.getAttribute("data-element-value")) {        
                    editHeadingText.setAttribute("data-reference", element.id);
                    editHeadingText.value = element.textContent;
                }
            });
        }

        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete') as HTMLDivElement;
        selectedControlDeleteBtn.onclick = (ev: MouseEvent) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesigner);
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


    /* Update */
    private UpdateFormElement(element: HTMLDivElement): void {
        //ev.preventDefault();
        console.log(element);
        //element.innerHTML = this._tinymce.activeEditor.getContent();
    }

    private AddTabContentListeners(element: HTMLDivElement): void {
        //add new key up event listner for designer tabs
        this._tabContent.onkeyup = (ev: KeyboardEvent) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element)
            }
        };

        this._tabContent.onmousedown = (ev: MouseEvent) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element)
            }
        };
    }

    
    /* Delete */
    private RemoveFormElement(element: HTMLDivElement): void {
        element.remove();
    }
}