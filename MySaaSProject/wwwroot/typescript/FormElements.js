class FormElements {
    constructor() {
        this._allFormElements = {
            Heading: this.FormElementHeading(),
            FullName: this.FormElementFullName(),
            Email: this.FormElementEmail()
        };
    }
    FindFormElementToCreate(formElementToCreate) {
        const prefix = formElementToCreate.substring(0, 11);
        if (prefix === "formElement") {
            const elementType = formElementToCreate.substring(11);
            return this._allFormElements[elementType];
        }
        return null;
    }
    FormElementHeading() {
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("createdFormElement", "headingWrapper", "pad15");
        const h2Heading = document.createElement("h2");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementFullName() {
        const divFullNameWrapper = document.createElement("div");
        divFullNameWrapper.classList.add("createdFormElement", "fullNameWrapper", "pad15");
        const divFullNameRow = document.createElement("div");
        divFullNameRow.classList.add("row");
        divFullNameWrapper.appendChild(divFullNameRow);
        /*First Name*/
        const divFirstNameColumn = document.createElement("div");
        divFirstNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divFirstNameColumn);
        const labelFirstName = document.createElement("label");
        labelFirstName.classList.add("form-label");
        labelFirstName.innerText = "First Name";
        divFirstNameColumn.appendChild(labelFirstName);
        const inputFirstName = document.createElement("input");
        inputFirstName.type = "text";
        inputFirstName.classList.add("form-control");
        inputFirstName.placeholder = "First Name";
        inputFirstName.ariaLabel = "First Name";
        divFirstNameColumn.appendChild(inputFirstName);
        /*Last Name*/
        const divLastNameColumn = document.createElement("div");
        divLastNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divLastNameColumn);
        const labelLastName = document.createElement("label");
        labelLastName.classList.add("form-label");
        labelLastName.innerText = "Last Name";
        divLastNameColumn.appendChild(labelLastName);
        const inputLastName = document.createElement("input");
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);
        return divFullNameWrapper;
    }
    FormElementEmail() {
        const divEmailWrapper = document.createElement("div");
        divEmailWrapper.classList.add("createdFormElement", "emailWrapper", "pad15");
        const divEmailRow = document.createElement("div");
        divEmailRow.classList.add("row");
        divEmailWrapper.appendChild(divEmailRow);
        const divEmailColumn = document.createElement("div");
        divEmailColumn.classList.add("col-md-6", "text-start");
        divEmailRow.appendChild(divEmailColumn);
        const labelEmail = document.createElement("label");
        labelEmail.classList.add("form-label");
        labelEmail.innerText = "Email";
        divEmailColumn.appendChild(labelEmail);
        const inputEmail = document.createElement("input");
        inputEmail.type = "email";
        inputEmail.classList.add("form-control");
        inputEmail.placeholder = "Email";
        inputEmail.ariaLabel = "Wmaili";
        divEmailColumn.appendChild(inputEmail);
        return divEmailWrapper;
    }
}
//# sourceMappingURL=FormElements.js.map