/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />
class FormBuilder {
    constructor() {
        this._customFormSection = document.querySelector("#customFormSection");
        this._formElements = document.querySelectorAll(".formElementWrapper");
        this.AddFormElement();
    }
    AddFormElement() {
        this._formElements.forEach((element) => {
            if (element != null) {
                element.onclick = (ev) => {
                    debugger;
                    const formElement = new FormElements();
                    ev.preventDefault();
                    const divHeadingWrapper = formElement.FindFormElementToCreate("formElementFullName");
                    if (divHeadingWrapper != null) {
                        this._customFormSection.append(divHeadingWrapper);
                    }
                };
            }
        });
    }
}
//# sourceMappingURL=FormBuilder.js.map