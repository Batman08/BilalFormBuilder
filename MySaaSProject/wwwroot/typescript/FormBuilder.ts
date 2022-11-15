/// <reference types="./FormBuilder" />
/// <reference path="./FormElements.ts" />

class FormBuilder {
    private _customFormSection = document.querySelector("#customFormSection") as HTMLDivElement;
    /*private readonly _formElements = document.querySelectorAll(".formElementWrapper") as NodeListOf<HTMLDivElement>;*/

    constructor() {
        this.AddFormElement();
    }

    private AddFormElement(): void {
        const _formElements = document.querySelectorAll(".formElementWrapper") as NodeListOf<HTMLDivElement>;
        _formElements.forEach((element) => {
            this.AddFormClick(element);
        });
    }

    private AddFormClick(element: any): void {
        if (element != null) {
            element.onclick = (ev: MouseEvent) => {
                //get attribute value
                const retrievedElementType = element.getAttribute("data-element-type") as string;
                if (retrievedElementType === null) {
                    alert("missing components, please refresh the page!!!");
                    return;
                }

                const formElement: FormElements = new FormElements();
                ev.preventDefault();
                const divHeadingWrapper = formElement.FindFormElementToCreate(retrievedElementType);

                if (divHeadingWrapper != null) {
                    this._customFormSection.append(divHeadingWrapper);
                }
            };
        }
    }

    public AddElementFromDrag(element: any): void {
        //get attribute value
        const retrievedElementType = element.getAttribute("data-element-type") as string;
        if (retrievedElementType === null) {
            alert("missing components, please refresh the page!!!");
            element.remove();
            return;
        }

        const formElement: FormElements = new FormElements();
        const divHeadingWrapper = formElement.FindFormElementToCreate(element.getAttribute("data-element-type") as string);

        if (divHeadingWrapper != null) {
            element.after(divHeadingWrapper);
        }

        element.remove();
        this.AddFormElement();
    }
}