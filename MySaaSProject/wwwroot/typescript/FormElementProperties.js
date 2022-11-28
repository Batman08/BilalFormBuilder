/// <reference types="./FormBuilder" />
///// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    //deal with designer properties
    constructor(elementType, element) {
        this.formDesigner = document.querySelector('#formDesigner');
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
    fillPropertiesDesigner(elementType, element) {
        //loop through all inputs within element 
        var inputs = element.querySelectorAll("input");
    }
    HeadingProperties(headingElement) {
        this.propertiesDesigner.innerHTML = `
                    <h1>Heading Properties</h1>

                    <br />

                    <div class="mb-3">
                        <label for="txtHeading" class="form-label">Heading Texts</label>
                        <input type="text" class="form-control" id="txtHeading" data-reference aria-describedby="Heading Text">
                    </div>
                    <div class="mb-3">
                        <label for="txtSubHeading" class="form-label">Subheading Text</label>
                        <input type="text" class="form-control" id="txtSubHeading">
                    </div>`;
        this.formDesigner.classList.add("hideElement");
        this.propertiesDesigner.classList.remove("hideElement");
    }
    FullNameProperties(headingElement) {
        this.formDesigner.classList.add("hideElement");
        this.propertiesDesigner.classList.remove("hideElement");
        //scrap idea of multiple property designers
        //have one that changes its content fields
    }
}
//# sourceMappingURL=FormElementProperties.js.map