/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
class FormBuilder {
    /*private readonly _formElements = document.querySelectorAll(".formElementWrapper") as NodeListOf<HTMLDivElement>;*/
    constructor() {
        this._customFormSection = document.querySelector("#customFormSection");
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
                const divHeadingWrapper = formElement.FindFormElementToCreate(retrievedElementType);
                if (divHeadingWrapper != null) {
                    this._customFormSection.append(divHeadingWrapper);
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
}
//# sourceMappingURL=FormBuilder.js.map