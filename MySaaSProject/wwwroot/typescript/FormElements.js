class FormElements {
    constructor() {
        this._allFormElements = {
            Heading: this.FormElementHeading(),
            FullName: this.FormElementFullName(),
            Email: this.FormElementEmail()
        };
    }
    FindFormElementToCreate(formElementToCreate) {
        debugger;
        //extract Heading string from formElementHeading
        const prefix = formElementToCreate.substring(0, 11);
        if (prefix === "formElement") {
            const elementType = formElementToCreate.substring(11);
            return this._allFormElements[elementType];
        }
        return null;
    }
    FormElementHeading() {
        debugger;
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementFullName() {
        debugger;
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2");
        h2Heading.innerText = "Full Name";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementEmail() {
        debugger;
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2");
        h2Heading.innerText = "Email";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
}
//# sourceMappingURL=FormElements.js.map