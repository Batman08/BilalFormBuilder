/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormBuilder {
    constructor() {
        this._btnFormDesigner = document.querySelector("#btnFormDesigner");
        this._offcanvasDesignerRightLabel = document.querySelector("#offcanvasDesignerRightLabel");
        this._customFormSection = document.querySelector("#customFormSection");
        this._utils = new Utilities();
        this._formElementsOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesignerOffCanvas = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tabContent = document.querySelector("#myTabContent");
        //#endregion
    }
    Init() {
        const formElement = new FormElements();
        formElement.Init();
        this._btnFormDesigner.onclick = (ev) => this._offcanvasDesignerRightLabel.textContent = "Form Designer";
        this.AddFormElement();
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
            this._currentSelectedFormElement.querySelector('#selectedFormElementControl').remove();
        }
        //set new current form element
        this._currentSelectedFormElement = element;
        const elementName = this._currentSelectedFormElement.querySelector("[data-property-reference]").getAttribute("data-property-reference");
        this._offcanvasDesignerRightLabel.textContent = `${elementName} Properties`;
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);
        //if properties designer already open then show form properties in designer
        const propertiesDesigner = document.querySelector('#offcanvasRight');
        if (propertiesDesigner.classList.contains("show")) {
            const formElementProperties = new FormElementProperties(element.getAttribute("data-wrapper-type"), element);
            element.querySelectorAll("[data-element-value]").forEach((element) => {
                const editHeadingText = document.querySelector("#txtHeading");
                if (editHeadingText.id === element.getAttribute("data-property-reference")) {
                    editHeadingText.setAttribute("data-element-reference", element.id);
                    editHeadingText.value = element.textContent;
                }
            });
        }
        //#region edit buttons
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty');
        selectedControlBtnProperty.onclick = (ev) => {
            debugger;
            this._utils.BTSP_CloseOffCanvas(this._formElementsOffCanvas);
            this._utils.BTSP_OpenOffCanvas(this._formDesignerOffCanvas);
            //get all closest elements
            element.querySelectorAll("[data-element-value]").forEach((element) => {
                const editHeadingText = document.querySelector("#txtHeading");
                if (editHeadingText.id === element.getAttribute("data-element-value")) {
                    editHeadingText.setAttribute("data-reference", element.id);
                    editHeadingText.value = element.textContent;
                }
            });
        };
        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete');
        selectedControlDeleteBtn.onclick = (ev) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesignerOffCanvas);
        };
        //#endregion
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
    UpdateFormElement(element) {
        //ev.preventDefault();
        console.log(element);
        //element.innerHTML = this._tinymce.activeEditor.getContent();
    }
    AddTabContentListeners(element) {
        //add new key up event listner for designer tabs
        this._tabContent.onkeyup = (ev) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element);
            }
        };
        this._tabContent.onmousedown = (ev) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element);
            }
        };
    }
    //#endregion
    //#region Delete
    RemoveFormElement(element) {
        element.remove();
    }
}
//# sourceMappingURL=FormBuilder.js.map