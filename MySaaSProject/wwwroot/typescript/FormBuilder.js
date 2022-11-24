/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormBuilder {
    constructor() {
        this._customFormSection = document.querySelector("#customFormSection");
        this._utils = new Utilities();
        this._formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tabContent = document.querySelector("#myTabContent");
        this.AddFormElement();
    }
    /* Create */
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
        //ev.preventDefault();
        const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType);
        if (createdFormElement != null) {
            createdFormElement.onclick = (ev) => { console.log("element click"); this.EditFormElement(createdFormElement); };
            createdFormElement.onblur = (ev) => this.RemoveSelectedFormElementStyle();
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
    EditFormElement(element) {
        if (this._currentSelectedFormElement !== undefined) {
            console.log(this._currentSelectedFormElement);
            console.log(this._currentSelectedFormElement.querySelector('#selectedFormElementControl'));
            this._currentSelectedFormElement.querySelector('#selectedFormElementControl').remove();
        }
        //set new current form element
        this._currentSelectedFormElement = element;
        const formElement = new FormElements();
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);
        this.AddEditDesign(element);
        //if designer already open then show form properties in designer
        const designer = document.querySelector('#offcanvasRight');
        if (designer.classList.contains("show")) {
            const formElementProperties = new FormElementProperties(element.getAttribute("data-wrapper-type"), element);
            element.querySelectorAll("[data-element-value]").forEach((element) => {
                const editHeadingText = document.querySelector("#txtHeading");
                if (editHeadingText.id === element.getAttribute("data-property-reference")) {
                    editHeadingText.setAttribute("data-element-reference", element.id);
                    editHeadingText.value = element.textContent;
                }
            });
        }
        /* edit buttons */
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty');
        selectedControlBtnProperty.onclick = (ev) => {
            this._utils.BTSP_CloseOffCanvas(this._formElements);
            this._utils.BTSP_OpenOffCanvas(this._formDesigner);
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
            this._utils.BTSP_CloseOffCanvas(this._formDesigner);
        };
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
    /* Update */
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
    /* Delete */
    RemoveFormElement(element) {
        element.remove();
    }
}
//# sourceMappingURL=FormBuilder.js.map