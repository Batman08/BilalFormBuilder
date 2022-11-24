/// <reference types="./FormBuilder" />
///// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormElementProperties {
    private readonly propertiesDesigner = document.querySelector('#propertiesDesigner') as HTMLDivElement;
    
    //deal with designer properties
    constructor(elementType: string, element: HTMLElement) {
        this.GetElementProperties(elementType, element);
    }

    private GetElementProperties(elementType: string, element: HTMLElement) {
        if (elementType === "headingWrapper") {
            this.HeadingProperties(element);
        }
        else if (elementType === "fullNameWrapper") {
            {
                this.FullNameProperties(element);
            }
        }
    }

    private HeadingProperties(headingElement: HTMLElement) {
        //scrap idea of multiple property designers
        //have one that changes its content fields
    }

    private FullNameProperties(headingElement: HTMLElement) {
        //scrap idea of multiple property designers
        //have one that changes its content fields
    }
}