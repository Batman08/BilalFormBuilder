class FormElements {
    private _allFormElements: formElements = {
        Heading: this.FormElementHeading(),
        FullName: this.FormElementFullName(),
        Email: this.FormElementEmail()
    };

    constructor() {

    }

    public FindFormElementToCreate(formElementToCreate: string): HTMLDivElement | null {
        const prefix: string = formElementToCreate.substring(0, 11);

        if (prefix === "formElement") {
            const elementType: string = formElementToCreate.substring(11);
            return this._allFormElements[elementType];
        }

        return null;
    }

    public FormElementControls(): HTMLDivElement {
        const divSelectedControls = document.createElement("div") as HTMLDivElement;
        divSelectedControls.id = "selectedFormElementControl";
        divSelectedControls.classList.add("selectedControls");

        const btnProperty = document.createElement("button") as HTMLButtonElement;
        btnProperty.classList.add("btn", "btn-secondary", "blahBtn");
        btnProperty.innerHTML = '<i class="fas fa-cog"></i>';
        divSelectedControls.appendChild(btnProperty);

        const btnDelete = document.createElement("button") as HTMLButtonElement;
        btnDelete.classList.add("btn", "btn-danger", "blahBtn");
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        divSelectedControls.appendChild(btnDelete);

        return divSelectedControls;
    }

    
    public FormElementHeading(): HTMLDivElement {
        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("createdFormElement", "headingWrapper", "pad15", "position-relative");

        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");

        return divHeadingWrapper;
    }

    public FormElementFullName(): HTMLDivElement {
        const divFullNameWrapper = document.createElement("div") as HTMLDivElement;
        divFullNameWrapper.classList.add("createdFormElement", "fullNameWrapper", "pad15", "position-relative");

        const divFullNameRow = document.createElement("div") as HTMLDivElement;
        divFullNameRow.classList.add("row");
        divFullNameWrapper.appendChild(divFullNameRow);

        /*First Name*/
        const divFirstNameColumn = document.createElement("div") as HTMLDivElement;
        divFirstNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divFirstNameColumn);

        const labelFirstName = document.createElement("label") as HTMLLabelElement;
        labelFirstName.classList.add("form-label");
        labelFirstName.innerText = "First Name";
        divFirstNameColumn.appendChild(labelFirstName);
        
        const inputFirstName = document.createElement("input") as HTMLInputElement;
        inputFirstName.type = "text";
        inputFirstName.classList.add("form-control");
        inputFirstName.placeholder = "First Name";
        inputFirstName.ariaLabel = "First Name";
        divFirstNameColumn.appendChild(inputFirstName);

        /*Last Name*/
        const divLastNameColumn = document.createElement("div") as HTMLDivElement;
        divLastNameColumn.classList.add("col-md-6", "text-start");
        divFullNameRow.appendChild(divLastNameColumn);

        const labelLastName = document.createElement("label") as HTMLLabelElement;
        labelLastName.classList.add("form-label");
        labelLastName.innerText = "Last Name";
        divLastNameColumn.appendChild(labelLastName);
        
        const inputLastName = document.createElement("input") as HTMLInputElement;
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);

        return divFullNameWrapper;
    }

    public FormElementEmail(): HTMLDivElement {
        const divEmailWrapper = document.createElement("div") as HTMLDivElement;
        divEmailWrapper.classList.add("createdFormElement", "emailWrapper", "pad15", "position-relative");

        const divEmailRow = document.createElement("div") as HTMLDivElement;
        divEmailRow.classList.add("row");
        divEmailWrapper.appendChild(divEmailRow);

        const divEmailColumn = document.createElement("div") as HTMLDivElement;
        divEmailColumn.classList.add("col-md-6", "text-start");
        divEmailRow.appendChild(divEmailColumn);

        const labelEmail = document.createElement("label") as HTMLLabelElement;
        labelEmail.classList.add("form-label");
        labelEmail.innerText = "Email";
        divEmailColumn.appendChild(labelEmail);
        
        const inputEmail = document.createElement("input") as HTMLInputElement;
        inputEmail.type = "email";
        inputEmail.classList.add("form-control");
        inputEmail.placeholder = "Email";
        inputEmail.ariaLabel = "Wmaili";
        divEmailColumn.appendChild(inputEmail);

        return divEmailWrapper;
    }
}