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
            //this.AddFormDrag(element);
        }
    }
    AddFormDrag(element) {
        //check if element is being dragged
        element.ondragstart = (ev) => {
            var _a;
            console.log(element.getAttribute("data-element-type"));
            (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text", element.getAttribute("data-element-type"));
        };
        //check if element is being dragged over
        this._customFormSection.ondragover = (ev) => {
            ev.preventDefault();
        };
        //check if element is being dropped
        this._customFormSection.ondrop = (ev) => {
            var _a;
            debugger;
            ev.preventDefault();
            const data = (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text").trim();
            const test = element.getAttribute("data-element-type");
            if (data === null) {
                alert("missing components, please refresh the page!!!");
                return;
            }
            const formElement = new FormElements();
            const divHeadingWrapper = formElement.FindFormElementToCreate(test);
            if (divHeadingWrapper != null) {
                element.after(divHeadingWrapper);
                //this._customFormSection.append(divHeadingWrapper);
            }
            element.remove();
            this.AddFormElement();
        };
    }
    AddElementFromDrag(element) {
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