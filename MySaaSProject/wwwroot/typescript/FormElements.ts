class FormElements {
    private _allFormElements: formElements = {
        Heading: this.FormElementHeading(),
        FullName: this.FormElementFullName(),
        Email: this.FormElementEmail()
    };

    constructor() {

    }

    public FindFormElementToCreate(formElementToCreate: string): string | null {
        const prefix: string = formElementToCreate.substring(0, 11);

        if (prefix === "formElement") {
            const elementType: string = formElementToCreate.substring(11);
            return this._allFormElements[elementType];
        }

        return null;
    }

    public FormElementHeading(): HTMLDivElement {
        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }

    public FormElementFullName(): HTMLDivElement {
        const divFullNameWrapper = document.createElement("div") as HTMLDivElement;
        divFullNameWrapper.classList.add("pad15");
        
        const divFullNameRow = document.createElement("div") as HTMLDivElement;
        divFullNameRow.classList.add("row");
        divFullNameWrapper.appendChild(divFullNameRow);

        const divFirstNameColumn = document.createElement("div") as HTMLDivElement;
        divFirstNameColumn.classList.add("col-md-6");
        divFullNameRow.appendChild(divFirstNameColumn);

        const inputFirstName = document.createElement("input") as HTMLInputElement;
        inputFirstName.type = "text";
        inputFirstName.classList.add("form-control");
        inputFirstName.placeholder = "First Name";
        inputFirstName.ariaLabel = "First Name";
        divFirstNameColumn.appendChild(inputFirstName);

        const divLastNameColumn = document.createElement("div") as HTMLDivElement;
        divLastNameColumn.classList.add("col-md-6");
        divFullNameRow.appendChild(divLastNameColumn);

        const inputLastName = document.createElement("input") as HTMLInputElement;
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);

        return divFullNameWrapper;
    }

    public FormElementEmail(): HTMLDivElement {
        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Email";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
}