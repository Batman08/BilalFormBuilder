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

            //this.AddFormDrag(element);
        }
    }

    private AddFormDrag(element: HTMLDivElement): void {
        //check if element is being dragged
        element.ondragstart = (ev: DragEvent) => {
            console.log(element.getAttribute("data-element-type"));
            ev.dataTransfer?.setData("text", element.getAttribute("data-element-type") as string);
        }

        //check if element is being dragged over
        this._customFormSection.ondragover = (ev: DragEvent) => {
            ev.preventDefault();
        }

        //check if element is being dropped
        this._customFormSection.ondrop = (ev: DragEvent) => {
            debugger
            ev.preventDefault();
            const data = ev.dataTransfer?.getData("text").trim();
            const test = element.getAttribute("data-element-type") as string;
            if (data === null) {
                alert("missing components, please refresh the page!!!");
                return;
            }

            const formElement: FormElements = new FormElements();
            const divHeadingWrapper = formElement.FindFormElementToCreate(test);

            if (divHeadingWrapper != null) {
                element.after(divHeadingWrapper);
                //this._customFormSection.append(divHeadingWrapper);
            }

            element.remove();
            this.AddFormElement();
        }
    }

    public AddElementFromDrag(element: any): void {
        const formElement: FormElements = new FormElements();
        const divHeadingWrapper = formElement.FindFormElementToCreate(element.getAttribute("data-element-type") as string);

        if (divHeadingWrapper != null) {
            element.after(divHeadingWrapper);
        }

        element.remove();
        this.AddFormElement();        
    }
}