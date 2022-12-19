/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormBuilder {
    constructor() {
        this._customFormWrapper = document.querySelector('#customFormWrapper');
        this._btnFormElements = document.querySelector('#btnFormElements');
        this._btnFormDesigner = document.querySelector("#btnFormDesigner");
        this._offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel");
        this._rightDesignerBody = document.querySelector('#rightDesigner');
        this._customFormSection = document.querySelector("#customFormSection");
        this._formElementProperties = new FormElementProperties();
        this._utils = new Utilities();
        this._formElementsOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesignerOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tabContent = document.querySelector("#myTabContent");
        //#endregion
    }
    Init(tinymce) {
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
    ManageClicksOutsideFormField() {
        const bodyEl = document.querySelector('body');
        const customFormAreaEl = document.querySelector('#customFormArea');
        bodyEl.onclick = (ev) => {
            let btnControls = null;
            const isClickInsideElement = customFormAreaEl.contains(ev.target);
            if (!isClickInsideElement) {
                btnControls = document.querySelector('#selectedFormElementControl');
                if (btnControls != null)
                    btnControls.remove();
                this.RemoveSelectedFormElementStyle();
                //this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            }
        };
    }
    DisableFormFields(formElement) {
        formElement.querySelectorAll('input, select, textarea').forEach((el) => {
            if (!el.disabled) {
                el.disabled = true;
                switch (el.nodeName) {
                    case "INPUT":
                        const inputEle = el;
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
                        const textareaEle = el;
                        textareaEle.value = "";
                        break;
                    case "SELECT":
                        const selectEle = el;
                        selectEle.selectedIndex = 0;
                        break;
                }
            }
        });
        const retrievedElementType = formElement.getAttribute("data-wrapper-type");
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            return;
        }
        if (formElement != null) {
            formElement.onclick = (ev) => this.SelectedFormElementToEdit(formElement);
        }
    }
    EnableFormFields() {
        this._customFormWrapper.querySelectorAll('input, select, textarea').forEach((el) => {
            if (el.disabled) {
                el.disabled = false;
                //#loop through each children of _customFormWrapper and remove onclick
                this._customFormWrapper.querySelectorAll('div').forEach((el) => {
                    el.onclick = null;
                });
            }
        });
    }
    //#region Preview Form
    PreviewForm(ev, inputEl) {
        if (inputEl.checked) {
            this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
            this._utils.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._btnFormElements.disabled = true;
            this._btnFormDesigner.disabled = true;
            this.EnableFormFields();
        }
        else {
            this._customFormSection.querySelectorAll('[data-wrapper-type]').forEach((el) => {
                this.DisableFormFields(el);
            });
            this._btnFormElements.disabled = false;
            this._btnFormDesigner.disabled = false;
        }
    }
    PreviewFormOnClick() {
        const switchCheckPreviewForm = document.querySelector('#switchCheckPreviewForm');
        switchCheckPreviewForm.oninput = (ev) => this.PreviewForm(ev, switchCheckPreviewForm);
    }
    //#endregion
    //#region Form Designer
    FormDesigner(ev) {
        ev.preventDefault();
        this._offcanvasDesignerRightLabel.textContent = "Form Designer";
        this._rightDesignerBody.innerHTML = "";
        //#region Page Color
        const divPageColor = document.createElement("div");
        divPageColor.classList.add("mb-3");
        const labelPageColor = document.createElement("label");
        labelPageColor.htmlFor = "inputPageColor";
        labelPageColor.classList.add("form-label");
        labelPageColor.textContent = "Page Color";
        divPageColor.appendChild(labelPageColor);
        const inputPageColor = document.createElement("input");
        inputPageColor.type = "color";
        inputPageColor.classList.add("form-control");
        inputPageColor.id = "inputPageColor";
        const currentPageColor = this._utils.RgbToHex(document.body.style.backgroundColor);
        inputPageColor.value = currentPageColor;
        this.UpdateFormDesign("pageColor", inputPageColor, document.body);
        divPageColor.appendChild(inputPageColor);
        //#endregion
        //#region Form Color
        const divFormColor = document.createElement("div");
        divFormColor.classList.add("mb-3");
        const labelFormColor = document.createElement("label");
        labelFormColor.htmlFor = "inputFormColor";
        labelFormColor.classList.add("form-label");
        labelFormColor.textContent = "Form Color";
        divFormColor.appendChild(labelFormColor);
        const inputFormColor = document.createElement("input");
        inputFormColor.type = "color";
        inputFormColor.classList.add("form-control");
        inputFormColor.id = "inputFormColor";
        const currentFormColor = this._utils.RgbToHex(this._customFormSection.style.backgroundColor);
        inputFormColor.value = currentFormColor;
        this.UpdateFormDesign("formColor", inputFormColor, this._customFormSection);
        divFormColor.appendChild(inputFormColor);
        //#endregion
        //#region Font Color
        const divFontColor = document.createElement("div");
        divFontColor.classList.add("mb-3");
        const labelFontColor = document.createElement("label");
        labelFontColor.htmlFor = "inputFontColor";
        labelFontColor.classList.add("form-label");
        labelFontColor.textContent = "Font Color";
        divFontColor.appendChild(labelFontColor);
        const inputFontColor = document.createElement("input");
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
    UpdateFormDesign(type, input, elToUpdate) {
        input.oninput = (ev) => {
            const inputFontColor = ev.target;
            const fontColor = inputFontColor.value;
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
    FormDesignerOnClick() {
        this._btnFormDesigner.onclick = (ev) => this.FormDesigner(ev);
    }
    //#endregion
    //#region Create
    AddFormElement() {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper[data-element-type]");
        _formElements.forEach((element) => {
            this.AddFormClick(element);
        });
    }
    AddFormClick(element) {
        if (element != null) {
            element.onclick = (ev) => {
                this.AppendCreatedFormElement(element, false);
            };
        }
    }
    AddElementFromDrag(element) {
        this.AppendCreatedFormElement(element, true);
    }
    AppendCreatedFormElement(element, shouldInsert) {
        //get attribute value
        const retrievedElementType = element.getAttribute("data-element-type");
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            if (shouldInsert) {
                element.remove();
            }
            return;
        }
        const formElement = new FormElements();
        const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType);
        if (createdFormElement != null) {
            createdFormElement.onclick = (ev) => this.SelectedFormElementToEdit(createdFormElement);
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
    SelectedFormElementToEdit(element) {
        const formElement = new FormElements();
        this.AddEditDesign(element);
        const previousSelectedElementExists = this._currentSelectedFormElement !== undefined;
        if (previousSelectedElementExists) {
            //remove edit btns from previously selected element
            const previousBtnControls = this._currentSelectedFormElement.querySelector('#selectedFormElementControl');
            if (previousBtnControls !== null) {
                previousBtnControls.remove();
            }
        }
        //set new current form element
        this._currentSelectedFormElement = element;
        //create button scontrols
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);
        //if properties designer already open then show form properties in designer
        const propertiesDesigner = document.querySelector('#offcanvasRight');
        if (propertiesDesigner.classList.contains("show")) {
            this.Edit();
        }
        //#region edit buttons
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty');
        selectedControlBtnProperty.onclick = (ev) => {
            this.Edit();
            this._utils.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._utils.BTSP_OpenOffCanvas(this._formDesignerOffCanvas);
        };
        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete');
        selectedControlDeleteBtn.onclick = (ev) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
        };
        //#endregion
    }
    Edit() {
        const elementWrapper = this._currentSelectedFormElement.getAttribute("data-wrapper-type");
        const elementName = this._currentSelectedFormElement.querySelector("[data-property-reference]").getAttribute("data-property-reference");
        this._offcanvasDesignerRightLabel.textContent = `${elementName} Properties`;
        if (elementWrapper === "paragraphWrapper") {
            this._formElementProperties.GetElementProperties(elementWrapper, this._currentSelectedFormElement, this.UpdateFormElement);
        }
        else {
            this._formElementProperties.GetElementProperties(elementWrapper, this._currentSelectedFormElement);
        }
    }
    AddEditDesign(element) {
        this.RemoveSelectedFormElementStyle();
        //add createdFormElement class to the element
        element.classList.add("formElementSelected");
    }
    RemoveSelectedFormElementStyle() {
        const createdFormElements = document.querySelectorAll(".createdFormElement");
        createdFormElements.forEach((element) => {
            element.classList.remove("formElementSelected");
        });
    }
    //#endregion
    //#region Update
    UpdateFormElement(tinymce, element) {
        console.log(element);
        element.innerHTML = tinymce.activeEditor.getContent();
    }
    //#endregion
    //#region Delete
    RemoveFormElement(element) {
        element.remove();
    }
}
//# sourceMappingURL=FormBuilder.js.map