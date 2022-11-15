/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
//import { Editor} from "tinymce";
class FormBuilder {
    constructor(tinymce) {
        this._customFormSection = document.querySelector("#customFormSection");
        this._editor = document.querySelector("#default-editor");
        this._utils = new Utilities();
        this._formElements = this._utils.BTSP_GetOffCanvas('#offcanvasScrolling');
        this._formDesigner = this._utils.BTSP_GetOffCanvas('#offcanvasRight');
        this._tinymce = tinymce;
        this.AddFormElement();
    }
    AddFormElement() {
        const _formElements = document.querySelectorAll(".formElementWrapper");
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
                const createFormElement = formElement.FindFormElementToCreate(retrievedElementType);
                if (createFormElement != null) {
                    createFormElement.onclick = (ev) => this.EditFormElement(createFormElement);
                    this._customFormSection.append(createFormElement);
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
        const divHeadingWrapper = formElement.FindFormElementToCreate(element.getAttribute("data-element-type"));
        if (divHeadingWrapper != null) {
            element.after(divHeadingWrapper);
        }
        element.remove();
        this.AddFormElement();
    }
    EditFormElement(element) {
        console.log(this._tinymce);
        //remove key up event listner from _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = null;
        this._utils.BTSP_CloseOffCanvas(this._formElements);
        this._utils.BTSP_OpenOffCanvas(this._formDesigner);
        const formElementData = element.innerHTML;
        this._tinymce.activeEditor.setContent(formElementData);
        //this._tinymce.setContent(formElementData);
        //add new key up event listner for _tinymce
        this._tinymce.activeEditor.getBody().onkeyup = (ev) => {
            if (ev.target) {
                //do something
                this.UpdateFormElement(element, ev);
            }
        };
    }
    UpdateFormElement(element, ev) {
        debugger;
        ev.preventDefault();
        console.log(element);
        element.innerHTML = this._tinymce.activeEditor.getContent();
    }
}
//# sourceMappingURL=FormBuilder.js.map