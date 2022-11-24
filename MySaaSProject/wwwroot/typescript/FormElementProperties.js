/// <reference types="./FormBuilder" />
///// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    //deal with designer properties
    constructor(elementType, element) {
        this.propertiesDesigner = document.querySelector('#propertiesDesigner');
        this.GetElementProperties(elementType, element);
    }
    GetElementProperties(elementType, element) {
        if (elementType === "headingWrapper") {
            this.HeadingProperties(element);
        }
        else if (elementType === "fullNameWrapper") {
            {
                this.FullNameProperties(element);
            }
        }
    }
    HeadingProperties(headingElement) {
        //scrap idea of multiple property designers
        //have one that changes its content fields
    }
    FullNameProperties(headingElement) {
        //scrap idea of multiple property designers
        //have one that changes its content fields
    }
}
//# sourceMappingURL=FormElementProperties.js.map