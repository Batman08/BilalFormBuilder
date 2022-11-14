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
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementFullName() {
        const divFullNameWrapper = document.createElement("div");
        divFullNameWrapper.classList.add("pad15");
        const divFullNameRow = document.createElement("div");
        divFullNameRow.classList.add("row");
        divFullNameWrapper.appendChild(divFullNameRow);
        const divFirstNameColumn = document.createElement("div");
        divFirstNameColumn.classList.add("col-md-6");
        divFullNameRow.appendChild(divFirstNameColumn);
        const inputFirstName = document.createElement("input");
        inputFirstName.type = "text";
        inputFirstName.classList.add("form-control");
        inputFirstName.placeholder = "First Name";
        inputFirstName.ariaLabel = "First Name";
        divFirstNameColumn.appendChild(inputFirstName);
        const divLastNameColumn = document.createElement("div");
        divLastNameColumn.classList.add("col-md-6");
        divFullNameRow.appendChild(divLastNameColumn);
        const inputLastName = document.createElement("input");
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);
        return divFullNameWrapper;
    }
    FormElementEmail() {
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