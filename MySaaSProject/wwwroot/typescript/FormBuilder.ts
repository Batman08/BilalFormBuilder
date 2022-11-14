/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    private readonly _formElements = document.querySelectorAll(".formElementWrapper") as NodeListOf<HTMLDivElement>;

    constructor() {
        this.AddFormElement();
    }

    private AddFormElement(): void {
        this._formElements.forEach((element) => {
            if (element != null) {
                element.onclick = (ev: MouseEvent) => {
                    debugger
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