/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormBuilder {
    constructor(tinymce) {
        this._customFormSection = document.querySelector("#customFormSection");
        this._utils = new Utilities();
        this._formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tinymce = tinymce;
        this.AddFormElement();
    }
    AddFormElement() {
        const _formElements = document.querySelectorAll(".listAddFormElementWrapper");
        _formElements.forEach((element) => {
            this.AddFormClick(element);
        });
    }
    AddFormClick(element) {
        if (element != null) {
            element.onclick = (ev) => {
                //get attribute value
                const retrievedElementType = element.getAttribute("data-element-type");
                if (retrievedElementType === null) {
                    alert("missing components, please refresh the page!!!");
                    return;
                }
                const formElement = new FormElements();
                ev.preventDefault();
                const createdFormElement = formElement.FindFormElementToCreate(retrievedElementType);
                if (createdFormElement != null) {
                    createdFormElement.onclick = (ev) => { console.log("elmeent click"); this.EditFormElement(createdFormElement); };
                    createdFormElement.onblur = (ev) => this.RemoveSelectedFormElementStyle();
                    /*need to look at this again*/
                    //createdFormElement.onmouseenter = (ev: Event) => { createFormElement.removeAttribute("dataindex")!; }
                    //createdFormElement.onmouseleave = (ev: Event) => { createFormElement.setAttribute("dataindex", "1"); }
                    this._customFormSection.append(createdFormElement);
                }
            };
        }
    }
    AddElementFromDrag(element) {
        //get attribute value
        const retrievedElementType = element.getAttribute("data-element-type");
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            element.remove();
            return;
        }
        const formElement = new FormElements();
        const createdFormElement = formElement.FindFormElementToCreate(element.getAttribute("data-element-type"));
        if (createdFormElement != null) {
            createdFormElement.onclick = (ev) => { console.log("elmeent click"); this.EditFormElement(createdFormElement); };
            createdFormElement.onblur = (ev) => this.RemoveSelectedFormElementStyle();
            /*need to look at this again*/
            //createFormElement.onmouseenter = (ev: Event) => { createFormElement.removeAttribute("dataindex")!; }
            //createFormElement.onmouseleave = (ev: Event) => { createFormElement.setAttribute("dataindex", "1"); }
            element.after(createdFormElement);
        }
        element.remove();
        this.AddFormElement();
    }
    EditFormElement(element) {
        if (this._currentSelectedFormElement !== undefined) {
            console.log(this._currentSelectedFormElement);
            debugger;
            console.log(this._currentSelectedFormElement.querySelector('#selectedFormElementControl'));
            this._currentSelectedFormElement.querySelector('#selectedFormElementControl').remove();
        }
        //set new current form element
        this._currentSelectedFormElement = element;
        console.log(this._currentSelectedFormElement);
        const formElement = new FormElements();
        const btnControls = formElement.FormElementControls();
        element.appendChild(btnControls);
        this.AddEditDesign(element);
        this.ResetTinymceListeners();
        const selectedControlBtnProperty = this._currentSelectedFormElement.querySelector('#selectedControlBtnProperty');
        selectedControlBtnProperty.onclick = (ev) => {
            this._utils.BTSP_CloseOffCanvas(this._formElements);
            this._utils.BTSP_OpenOffCanvas(this._formDesigner);
            const formElementData = element.innerHTML;
            this._tinymce.activeEditor.setContent(formElementData);
            this.AddTinymceListeners(element);
        };
        const selectedControlDeleteBtn = this._currentSelectedFormElement.querySelector('#selectedControlBtnDelete');
        selectedControlDeleteBtn.onclick = (ev) => {
            this.RemoveFormElement(element);
            this._utils.BTSP_CloseOffCanvas(this._formDesigner);
        };
        //if designer already open then show form element value in tinymce field
        const designer = document.querySelector('#offcanvasRight');
        if (designer.classList.contains("show")) {
            const formElementData = element.innerHTML;
            this._tinymce.activeEditor.setContent(formElementData);
            this.AddTinymceListeners(element);
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
    UpdateFormElement(element, ev) {
        ev.preventDefault();
        console.log(element);
        element.innerHTML = this._tinymce.activeEditor.getContent();
    }
    AddTinymceListeners(element) {
        //add new key up event listner for _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = (ev) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev);
            }
        };
        this._tinymce.activeEditor.getContentAreaContainer().onmousedown = (ev) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev);
            }
        };
    }
    ResetTinymceListeners() {
        //remove key up event listner from _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = null;
        this._tinymce.activeEditor.getContentAreaContainer().onmousedown = null;
    }
    RemoveFormElement(element) {
        element.remove();
    }
}
//# sourceMappingURL=FormBuilder.js.map