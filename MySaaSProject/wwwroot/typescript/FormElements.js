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
    FormElementControls() {
        const divSelectedControls = document.createElement("div");
        divSelectedControls.id = "selectedFormElementControl";
        divSelectedControls.classList.add("selectedControls");
        const btnProperty = document.createElement("button");
        btnProperty.id = "selectedControlBtnProperty";
        btnProperty.classList.add("btn", "btn-secondary", "blahBtn");
        btnProperty.innerHTML = '<i class="fas fa-cog"></i>';
        divSelectedControls.appendChild(btnProperty);
        const btnDelete = document.createElement("button");
        btnDelete.id = "selectedControlBtnDelete";
        btnDelete.classList.add("btn", "btn-danger", "blahBtn");
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        divSelectedControls.appendChild(btnDelete);
        return divSelectedControls;
    }
    GetFormElementId(elementName) {
        const allElementsWithWrapperClass = document.querySelectorAll(`[name=${elementName}]`);
        console.log(allElementsWithWrapperClass);
        //find the highest number from ids
        let highestNumber = 0;
        allElementsWithWrapperClass.forEach((element) => {
            const elementNumber = parseInt(element.id.replace(elementName, ''));
            if (elementNumber > highestNumber) {
                highestNumber = elementNumber;
            }
        });
        return `${elementName}${highestNumber + 1}`;
    }
    //Form Elements
    FormElementHeading() {
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divHeadingWrapper.setAttribute("data-wrapper-type", "headingWrapper");
        const h2Heading = document.createElement("h2");
        const formElementName = "heading";
        const formId = this.GetFormElementId(formElementName);
        h2Heading.id = formId;
        h2Heading.setAttribute("name", formElementName);
        h2Heading.setAttribute("data-property-reference", "txtHeading");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementFullName() {
        const divFullNameWrapper = document.createElement("div");
        divFullNameWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divFullNameWrapper.setAttribute("data-wrapper-type", "fullNameWrapper");
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
        inputFirstName.setAttribute("data-element-value", "");
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
        inputLastName.setAttribute("data-element-value", "");
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);
        return divFullNameWrapper;
    }
    FormElementEmail() {
        const divEmailWrapper = document.createElement("div");
        divEmailWrapper.classList.add("createdFormElement", "emailWrapper", "pad15", "position-relative");
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
        inputEmail.setAttribute("data-element-value", "");
        inputEmail.classList.add("form-control");
        inputEmail.placeholder = "Email";
        inputEmail.ariaLabel = "Wmaili";
        divEmailColumn.appendChild(inputEmail);
        return divEmailWrapper;
    }
}
//# sourceMappingURL=FormElements.js.map