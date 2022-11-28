/// <reference types="./FormBuilder" />
///// <reference path="./FormElements.ts" />
/// <reference path="./Utilities.ts" />

class FormElementProperties {
    private readonly formDesigner = document.querySelector('#formDesigner') as HTMLDivElement;
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

    private fillPropertiesDesigner(elementType: string, element: HTMLElement) {
        //loop through all inputs within element 
        var inputs = element.querySelectorAll("input");
    }

    private HeadingProperties(headingElement: HTMLElement) {
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

    private FullNameProperties(headingElement: HTMLElement) {
        this.formDesigner.classList.add("hideElement");
        this.propertiesDesigner.classList.remove("hideElement");

        //scrap idea of multiple property designers
        //have one that changes its content fields
    }
}