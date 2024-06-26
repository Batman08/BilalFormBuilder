﻿/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormBuilder {
    private _customFormWrapper: HTMLDivElement = document.querySelector('#customFormWrapper') as HTMLDivElement

    private _btnFormElements: HTMLButtonElement = document.querySelector('#btnFormElements');
    private _btnFormDesigner: HTMLButtonElement = document.querySelector("#btnFormDesigner");
    private _offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel") as HTMLHeadingElement;
    private _rightDesignerBody: HTMLDivElement = document.querySelector('#rightDesigner');

    private _generalTab = document.querySelector('#general-tab') as HTMLButtonElement;
    private _generalTabPane = document.querySelector('#general-tab-pane') as HTMLDivElement;
    private _formHtmlTab = document.querySelector('#form-html-tab') as HTMLButtonElement;
    private _formHtmlTabPane = document.querySelector('#form-html-tab-pane') as HTMLDivElement;
    
    private _formBuilderArea = document.querySelector('#FormBuilderArea') as HTMLFormElement;
    private _formHtmlCodeInput = document.querySelector('#formHtmlCode') as HTMLTextAreaElement;

    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private _currentSelectedFormElement: HTMLDivElement;

    private _formElementProperties: FormElementProperties = new FormElementProperties();
    private _formElementsOffCanvas: bootstrap.Offcanvas = Utilities.BTSP_GetOffCanvas('#offcanvasScrolling');
    private _formDesignerOffCanvas: bootstrap.Offcanvas = Utilities.BTSP_GetOffCanvas('#offcanvasRight');

    public Init(sortableFormElements: any): void {
        /*define default form colours*/
        document.body.style.backgroundColor = "#f8f9fa";
        this._customFormSection.style.backgroundColor = "#FFFFFF";
        this._customFormSection.style.color = "#000000";

        const formElement = new FormElements();
        formElement.Init();

        this.PreviewFormOnClick(sortableFormElements);
        this.FormDesignerOnClick();
        this.AddFormElement();
        this.ManageClicksOutsideFormField();

        this.Bind_ShowFormHtml();
        this.Bind_CopyFormHtml();
        this.Bind_CopyBootstrapLinkTag();
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
                //Utilities.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            }
        };
    }

    private ResetElementValues(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void {
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

                    case "date":
                        inputEle.value = "";
                        break;

                    case "time":
                        inputEle.value = "";
                        break;

                    case "number":
                        inputEle.value = "";

                    case "file":
                        inputEle.value = "";
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

    private DisableFormFields(formElement: HTMLDivElement): void {
        formElement.querySelectorAll('input, select, textarea').forEach((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            this.ResetElementValues(el);
            if (!el.disabled) {
                el.disabled = true;
            }
        });

        const retrievedElementType = formElement.getAttribute("data-wrapper-type") as string;
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            return;
        }

        if (formElement != null) formElement.onclick = (ev: MouseEvent) => this.SelectedFormElementToEdit(formElement);
    }

    private EnableFormFields(): void {
        this._customFormWrapper.querySelectorAll('input, select, textarea').forEach((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            this.ResetElementValues(el);
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
    private PreviewForm(ev: Event, inputEl: HTMLInputElement, sortableFormElements: any): void {
        if (inputEl.checked) {
            Utilities.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            Utilities.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._btnFormElements.disabled = true;
            this._btnFormDesigner.disabled = true;
            this.EnableFormFields();
            sortableFormElements.options.disabled = true;
        } else {
            this._customFormSection.querySelectorAll('[data-wrapper-type]').forEach((el: HTMLDivElement) => {
                this.DisableFormFields(el);
            });
            sortableFormElements.options.disabled = false;
            this._btnFormElements.disabled = false;
            this._btnFormDesigner.disabled = false;
        }
    }

    private PreviewFormOnClick(sortableFormElements: any): void {
        const switchCheckPreviewForm: HTMLInputElement = document.querySelector('#switchCheckPreviewForm');
        switchCheckPreviewForm.oninput = (ev: Event) => this.PreviewForm(ev, switchCheckPreviewForm, sortableFormElements);
    }

    //#endregion

    //#region Form Html
    private ExtractFormHtml(): string {
        //make copy of this._formBuilderArea
        const originalFormEl = this._formBuilderArea.cloneNode(true) as HTMLFormElement;
        let sanitizedFormEl: HTMLFormElement = originalFormEl;

        //remove selectedFormElementControl element if it exists
        if (sanitizedFormEl.querySelector('#selectedFormElementControl') != null) sanitizedFormEl.querySelector('#selectedFormElementControl').remove();

        sanitizedFormEl.removeAttribute("id");
        sanitizedFormEl.querySelector('#customFormArea').removeAttribute('id');
        sanitizedFormEl.querySelector('#customFormWrapper').removeAttribute('id');
        sanitizedFormEl.querySelector('#customFormSection').removeAttribute('id');
        
        //remove all createdFormElement and formElementSelected classes from sanitizedFormEl
        sanitizedFormEl.querySelectorAll('[data-wrapper-type]').forEach((el: HTMLDivElement) => {
            el.classList.remove('createdFormElement');
            el.classList.remove('formElementSelected');
            el.classList.remove('sortable-chosen');
            
            el.removeAttribute('data-wrapper-type');
            el.removeAttribute('draggable');

            el.querySelector('[data-property-reference]').removeAttribute('data-property-reference');
        });

        sanitizedFormEl.querySelectorAll('input, select, textarea').forEach((el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            if (el.disabled) {
                el.disabled = false;
            }
        });

        //convert sanitizedFormEl to string
        const formHtml: string = sanitizedFormEl.outerHTML;
        console.log(formHtml);

        return formHtml;
    }

    private Bind_ShowFormHtml(): void {
        window.onkeydown = (ev: KeyboardEvent) => this._formHtmlCodeInput.value = this.ExtractFormHtml();
        window.onmouseup = (ev: MouseEvent) => this._formHtmlCodeInput.value = this.ExtractFormHtml();
        //window.onmousedown = (ev: MouseEvent) => this._formHtmlCodeInput.value = this.PreviewFormHtml();
    }

    private CopyFormHtml(btnCopyFormHtml: HTMLButtonElement): void {
        const formHtml: string = this.ExtractFormHtml();
        Utilities.CopyToClipboard(formHtml);

        Utilities.BTSP_UpdateTooltip(btnCopyFormHtml, 'Copied!');
    }

    private Bind_CopyFormHtml(): void {
        const btnCopyFormHtml: HTMLButtonElement = document.querySelector('#btnCopyFormHtml');
        const tooltipElement = bootstrap.Tooltip.getInstance(btnCopyFormHtml) as bootstrap.Tooltip;
        tooltipElement.toggleEnabled();
        
        btnCopyFormHtml.onclick = (ev: MouseEvent) => this.CopyFormHtml(btnCopyFormHtml);
    }

    private Bind_CopyBootstrapLinkTag(): void {
        const inputBootstrapLinkText: HTMLInputElement = document.querySelector('#txtBootstrapLinkTag');
        inputBootstrapLinkText.value = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
        
        const btnCopyBootstrapLinkTag: HTMLButtonElement = document.querySelector('#btnCopyBootstrapLinkTag');
        const tooltipElement = bootstrap.Tooltip.getInstance(btnCopyBootstrapLinkTag) as bootstrap.Tooltip;
        tooltipElement.toggleEnabled();

        const bootstrapLinkTag = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">';
        btnCopyBootstrapLinkTag.onclick = (ev: MouseEvent) => {
            Utilities.CopyToClipboard(bootstrapLinkTag);
            Utilities.BTSP_UpdateTooltip(btnCopyBootstrapLinkTag, 'Copied!');
        }
    }
    //#endregion

    //#region Form Designer
    private FormDesigner(ev: MouseEvent): void {
        ev.preventDefault();

        this._formHtmlTab.parentElement.classList.remove("d-none");
        
        this._offcanvasDesignerRightLabel.textContent = "Form Designer";
        this._rightDesignerBody.innerHTML = "";

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

        const currentFormColor = Utilities.RgbToHex(this._customFormSection.style.backgroundColor);
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

        const currentFontColor = Utilities.RgbToHex(this._customFormSection.style.color);
        inputFontColor.value = currentFontColor;

        this.UpdateFormDesign("fontColor", inputFontColor, this._customFormSection);
        divFontColor.appendChild(inputFontColor);
        //#endregion

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
        this._formHtmlTab.parentElement.classList.add("d-none");
        this._formHtmlTab.classList.remove("active", "show");
        this._formHtmlTabPane.classList.remove("active", "show");
        
        this._generalTab.classList.add("active", "show");
        this._generalTabPane.classList.add("active", "show");
        
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
            Utilities.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            Utilities.BTSP_OpenOffCanvas(this._formDesignerOffCanvas);
        }

        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete') as HTMLDivElement;
        selectedControlDeleteBtn.onclick = (ev: MouseEvent) => {
            this.RemoveFormElement(element);
            Utilities.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
        }
        //#endregion
    }

    private Edit(): void {
        const elementWrapper: string = this._currentSelectedFormElement.getAttribute("data-wrapper-type") as string;
        const elementName: string = this._currentSelectedFormElement.querySelector("[data-property-reference]").getAttribute("data-property-reference");
        this._offcanvasDesignerRightLabel.textContent = `${elementName} Properties`;

        this._formElementProperties.GetElementProperties(elementWrapper, this._currentSelectedFormElement);
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

    //#region Delete
    private RemoveFormElement(element: HTMLDivElement): void {
        element.remove();
    }
    //#endregion
}