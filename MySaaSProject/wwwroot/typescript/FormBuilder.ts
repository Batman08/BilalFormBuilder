/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _customFormWrapper: HTMLDivElement = document.querySelector('#customFormWrapper') as HTMLDivElement

    private _btnFormElements: HTMLButtonElement = document.querySelector('#btnFormElements');
    private _btnFormDesigner: HTMLButtonElement = document.querySelector("#btnFormDesigner");
    private _offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel") as HTMLHeadingElement;
    private _rightDesignerBody: HTMLDivElement = document.querySelector('#rightDesigner');

    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private _currentSelectedFormElement: HTMLDivElement;

    private _formElementProperties: FormElementProperties = new FormElementProperties();
    private _utils: Utilities = new Utilities();
    private _formElementsOffCanvas: bootstrap.Offcanvas = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesignerOffCanvas: bootstrap.Offcanvas = this._utils.BTSP_GetOffCanvas('#offcanvasRight');

    private readonly _tabContent = document.querySelector("#myTabContent") as HTMLDivElement;

    public Init(tinymce: any): void {
        /*define default form colours*/
        document.body.style.backgroundColor = "#f8f9fa";
        this._customFormSection.style.backgroundColor = "#FFFFFF";
        this._customFormSection.style.color = "#000000";

        this._formElementProperties.Init(tinymce);

        const formElement = new FormElements();
        formElement.Init();

        this.PreviewFormOnClick();
        this.FormDesignerOnClick();
        this.AddFormElement();
        this.ManageClicksOutsideFormField();
    }

    private ManageClicksOutsideFormField(): void {
        const bodyEl = document.querySelector('body') as HTMLBodyElement;
        const customFormAreaEl = document.querySelector('#customFormArea') as HTMLBodyElement;

        bodyEl.onclick = (ev: MouseEvent) => {
            let btnControls: HTMLDivElement | null = null;
            const isClickInsideElement = customFormAreaEl.contains(ev.target as Node);
            if (!isClickInsideElement) {
                btnControls = document.querySelector('#selectedFormElementControl');
                if (btnControls != null)
                    btnControls.remove();
                this.RemoveSelectedFormElementStyle();
                //this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            }
        };
    }

    private DisableFormFields(formElement: HTMLDivElement): void {
        formElement.querySelectorAll('input, select, textarea').forEach((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            if (!el.disabled) {
                el.disabled = true;

                switch (el.nodeName) {
                    case "INPUT":
                        const inputEle = el as HTMLInputElement;

                        switch (inputEle.type) {
                            case "text":
                                break;

                            case "radio":
                                inputEle.checked = false;
                                break;

                            case "checkbox":
                                inputEle.checked = false;
                                break;

                            case "file":
                                break;
                        }
                        break;

                    case "TEXTAREA":
                        const textareaEle = el as HTMLTextAreaElement;
                        textareaEle.value = "";
                        break;

                    case "SELECT":
                        const selectEle = el as HTMLSelectElement;
                        selectEle.selectedIndex = 0;
                        break;
                }
            }
        });

        const retrievedElementType = formElement.getAttribute("data-wrapper-type") as string;
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            return;
        }

        if (formElement != null) {
            formElement.onclick = (ev: MouseEvent) => this.SelectedFormElementToEdit(formElement);
        }
    }

    private EnableFormFields(): void {
        this._customFormWrapper.querySelectorAll('input, select, textarea').forEach((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            if (el.disabled) {
                el.disabled = false;
                //#loop through each children of _customFormWrapper and remove onclick
                this._customFormWrapper.querySelectorAll('div').forEach((el: HTMLDivElement) => {
                    el.onclick = null;
                });
            }
        });
    }

    //#region Preview Form
    private PreviewForm(ev: Event, inputEl: HTMLInputElement): void {
        if (inputEl.checked) {
            this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            this._utils.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._btnFormElements.disabled = true;
            this._btnFormDesigner.disabled = true;
            this.EnableFormFields();
        } else {
            this._customFormSection.querySelectorAll('[data-wrapper-type]').forEach((el: HTMLDivElement) => {
                this.DisableFormFields(el);
            });
            this._btnFormElements.disabled = false;
            this._btnFormDesigner.disabled = false;
        }
    }

    private PreviewFormOnClick(): void {
        const switchCheckPreviewForm: HTMLInputElement = document.querySelector('#switchCheckPreviewForm');
        switchCheckPreviewForm.oninput = (ev: Event) => this.PreviewForm(ev, switchCheckPreviewForm);
    }
    //#endregion

    //#region Form Designer
    private FormDesigner(ev: MouseEvent): void {
        ev.preventDefault();

        this._offcanvasDesignerRightLabel.textContent = "Form Designer";
        this._rightDesignerBody.innerHTML = "";

        //#region Page Color
        const divPageColor = document.createElement("div") as HTMLDivElement;
        divPageColor.classList.add("mb-3");

        const labelPageColor = document.createElement("label") as HTMLLabelElement;
        labelPageColor.htmlFor = "inputPageColor";
        labelPageColor.classList.add("form-label");
        labelPageColor.textContent = "Page Color";
        divPageColor.appendChild(labelPageColor);

        const inputPageColor = document.createElement("input") as HTMLInputElement;
        inputPageColor.type = "color";
        inputPageColor.classList.add("form-control");
        inputPageColor.id = "inputPageColor";

        const currentPageColor = this._utils.RgbToHex(document.body.style.backgroundColor);
        inputPageColor.value = currentPageColor;

        this.UpdateFormDesign("pageColor", inputPageColor, document.body);
        divPageColor.appendChild(inputPageColor);
        //#endregion

        //#region Form Color
        const divFormColor = document.createElement("div") as HTMLDivElement;
        divFormColor.classList.add("mb-3");

        const labelFormColor = document.createElement("label") as HTMLLabelElement;
        labelFormColor.htmlFor = "inputFormColor";
        labelFormColor.classList.add("form-label");
        labelFormColor.textContent = "Form Color";
        divFormColor.appendChild(labelFormColor);

        const inputFormColor = document.createElement("input") as HTMLInputElement;
        inputFormColor.type = "color";
        inputFormColor.classList.add("form-control");
        inputFormColor.id = "inputFormColor";

        const currentFormColor = this._utils.RgbToHex(this._customFormSection.style.backgroundColor);
        inputFormColor.value = currentFormColor;

        this.UpdateFormDesign("formColor", inputFormColor, this._customFormSection);
        divFormColor.appendChild(inputFormColor);
        //#endregion

        //#region Font Color
        const divFontColor = document.createElement("div") as HTMLDivElement;
        divFontColor.classList.add("mb-3");

        const labelFontColor = document.createElement("label") as HTMLLabelElement;
        labelFontColor.htmlFor = "inputFontColor";
        labelFontColor.classList.add("form-label");
        labelFontColor.textContent = "Font Color";
        divFontColor.appendChild(labelFontColor);

        const inputFontColor = document.createElement("input") as HTMLInputElement;
        inputFontColor.type = "color";
        inputFontColor.classList.add("form-control");
        inputFontColor.id = "inputFontColor";

        const currentFontColor = this._utils.RgbToHex(this._customFormSection.style.color);
        inputFontColor.value = currentFontColor;

        this.UpdateFormDesign("fontColor", inputFontColor, this._customFormSection);
        divFontColor.appendChild(inputFontColor);
        //#endregion

        this._rightDesignerBody.appendChild(divPageColor);
        this._rightDesignerBody.appendChild(divFormColor);
        this._rightDesignerBody.appendChild(divFontColor);
    }

    private UpdateFormDesign(type: string, input: HTMLInputElement, elToUpdate: HTMLElement): void {
        input.oninput = (ev: InputEvent) => {
            const inputFontColor = ev.target as HTMLInputElement;
            const fontColor: string = inputFontColor.value;

            switch (type) {
                case "pageColor":
                    elToUpdate.style.backgroundColor = fontColor;
                    break;
                case "formColor":
                    elToUpdate.style.backgroundColor = fontColor;
                    break;
                case "fontColor":
                    elToUpdate.style.color = fontColor;
                    break;
            }
        };
    }

    private FormDesignerOnClick(): void {
        this._btnFormDesigner.onclick = (ev: MouseEvent) => this.FormDesigner(ev);
    }
    //#endregion

    //#region Create
    private AddFormElement(): void {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper[data-element-type]") as NodeListOf<HTMLDivElement>;
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