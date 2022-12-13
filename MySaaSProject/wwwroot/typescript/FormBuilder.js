/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormBuilder {
    constructor() {
        this._btnFormDesigner = document.querySelector("#btnFormDesigner");
        this._offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel");
        this._customFormSection = document.querySelector("#customFormSection");
        this._formElementProperties = new FormElementProperties();
        this._utils = new Utilities();
        this._formElementsOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesignerOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tabContent = document.querySelector("#myTabContent");
        //#endregion
    }
    Init(tinymce) {
        this._formElementProperties.Init(tinymce);
        const formElement = new FormElements();
        formElement.Init();
        this._btnFormDesigner.onclick = (ev) => this._offcanvasDesignerRightLabel.textContent = "Form Designer";
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
    //#region Create
    AddFormElement() {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper");
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