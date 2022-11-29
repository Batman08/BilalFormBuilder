/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    constructor() {
        this.rightDesigner = document.querySelector('#rightDesigner');
        //#endregion
    }
    Init(tinymce) {
        this._tinymce = tinymce;
    }
    GetElementProperties(elementType, element, callback) {
        switch (elementType) {
            case "paragraphWrapper":
                this.ParagraphProperties(element, callback);
                break;
            case "headingWrapper":
                this.HeadingProperties(element);
                break;
            case "fullNameWrapper":
                this.FullNameProperties(element);
                break;
            default:
                break;
        }
    }
    FillPropertiesDesigner(elementType, element) {
        //loop through all inputs within element    
        var inputs = element.querySelectorAll("input");
    }
    //#region Basic Properties
    ParagraphProperties(paragraphElement, callback) {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]");
        const currentText = elementToUpdateText.textContent;
        this.rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea');
        textArea.id = 'paragraph-editor';
        this.rightDesigner.appendChild(textArea);
        //this._tinymce.activeEditor.setContent("this is a test");
        //delay to init tinymce
        setTimeout(() => {
            const utils = new Utilities();
            utils.InitTinyMCE(this._tinymce, 'textarea#paragraph-editor');
            setTimeout(() => {
                this._tinymce.activeEditor.setContent(currentText);
                utils.AddTinymceListeners(this._tinymce, elementToUpdateText, callback);
            }, 1000);
        }, 0.0001);
    }
    //#endregion
    //#region Complex Properties
    HeadingProperties(headingElement) {
        this.rightDesigner.innerHTML = '';
        this.rightDesigner.innerHTML = `
                    <div class="mb-3">
                        <label for="txtHeading" class="form-label">Heading Texts</label>
                        <input type="text" class="form-control" id="txtHeading" data-reference aria-describedby="Heading Text">
                    </div>
                    <div class="mb-3">
                        <label for="txtSubHeading" class="form-label">Subheading Text</label>
                        <input type="text" class="form-control" id="txtSubHeading">
                    </div>`;
    }
    FullNameProperties(headingElement) {
    }
}
//# sourceMappingURL=FormElementProperties.js.map