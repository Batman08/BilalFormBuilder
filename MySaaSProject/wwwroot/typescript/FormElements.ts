class FormElements {
    //#region Components

    public FindFormElementToCreate(formElementToCreate: string): HTMLDivElement | null {
        return FormElementFactory.Create(formElementToCreate);
    }

    public FormElementControls(): HTMLDivElement {
        const divSelectedControls = document.createElement("div") as HTMLDivElement;
        divSelectedControls.id = "selectedFormElementControl";
        divSelectedControls.classList.add("selectedControls");

        const btnProperty = document.createElement("button") as HTMLButtonElement;
        btnProperty.id = "selectedControlBtnProperty";
        btnProperty.classList.add("btn", "btn-secondary", "blahBtn");
        btnProperty.innerHTML = '<i class="fas fa-cog"></i>';
        divSelectedControls.appendChild(btnProperty);

        const btnDelete = document.createElement("button") as HTMLButtonElement;
        btnDelete.id = "selectedControlBtnDelete";
        btnDelete.classList.add("btn", "btn-danger", "blahBtn");
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        divSelectedControls.appendChild(btnDelete);

        return divSelectedControls;
    }
    //#endregion

    //#region Generic Form Element Functions
    private GetFormElementId(elementName: string): string {
        //remove spaces form elementName
        const trimmedElementName = elementName.split(" ").join("") as string;


        const allElementsWithWrapperClass = document.querySelectorAll(`[name=${trimmedElementName}]`);
        console.log(allElementsWithWrapperClass);

        //find the highest number from ids
        let highestNumber = 0;
        allElementsWithWrapperClass.forEach((element: Element) => {
            const elementNumber = parseInt(element.id.replace(trimmedElementName, ''));
            if (elementNumber > highestNumber) {
                highestNumber = elementNumber;
            }
        });

        return `${trimmedElementName}${highestNumber + 1}` as string;
    }

    private CreateFormElementWrapper(elementName: string): HTMLDivElement {
        const divWrapper = document.createElement("div") as HTMLDivElement;
        divWrapper.classList.add("createdFormElement", "pad15", "position-relative", "text-start");
        divWrapper.setAttribute("data-wrapper-type", `${elementName}Wrapper`);

        return divWrapper
    }
    //#endregion

    //#region Basic Form Elements

    private FormElementTable(): HTMLDivElement {
        const formElementName: string = "table";
        const divTableWrapper = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divTableWrapper.appendChild(divTextStart);

        const tableLabel = document.createElement("label") as HTMLLabelElement;
        tableLabel.classList.add("form-label");
        tableLabel.innerText = "Type a question";
        divTextStart.appendChild(tableLabel);

        const formId = this.GetFormElementId(formElementName) as string;
        const tableCols: string[] = ["#", "col 1", "col 2"];
        const tableRows: string[] = ["row 1", "row 2", "row 3"];
        const tableInputType: string = "Textbox";
        const table = Utilities.CreateTable(tableCols, tableRows, tableInputType);
        table.id = formId;
        table.setAttribute("name", formElementName);
        table.ariaLabel = "Table";
        table.setAttribute("data-property-reference", "Table");
        table.setAttribute("data-input-type", tableInputType);
        divTableWrapper.appendChild(table);

        return divTableWrapper;
    }

    private FormElementDivider(): HTMLDivElement {
        const formElementName: string = "divider";
        const divWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const div = document.createElement("div") as HTMLDivElement;
        const formId = this.GetFormElementId(formElementName) as string;
        div.id = formId;
        div.classList.add("divider");

        div.setAttribute("name", formElementName)
        div.setAttribute("data-property-reference", "Divider");
        divWrapper.appendChild(div);

        return divWrapper;
    }
    //#endregion

    //#region Complex Form Elements
    private FormElementHeading(): HTMLDivElement {
        const formElementName: string = "heading";
        const divHeadingWrapper = this.CreateFormElementWrapper(formElementName);

        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        const formId = this.GetFormElementId(formElementName) as string;

        h2Heading.id = formId;
        h2Heading.setAttribute("name", formElementName)
        h2Heading.setAttribute("data-property-reference", "Heading");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");

        return divHeadingWrapper;
    }

    private FormElementFullName(): HTMLDivElement {
        const formElementName: string = "fullName";
        const divFullNameWrapper = this.CreateFormElementWrapper(formElementName);

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
        inputFirstName.setAttribute("data-element-value", "");
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
        inputLastName.setAttribute("data-element-value", "");
        inputLastName.type = "text";
        inputLastName.classList.add("form-control");
        inputLastName.placeholder = "Last Name";
        inputLastName.ariaLabel = "Last Name";
        divLastNameColumn.appendChild(inputLastName);

        return divFullNameWrapper;
    }

    private FormElementEmail(): HTMLDivElement {
        const formElementName: string = "email";
        const divEmailWrapper = this.CreateFormElementWrapper(formElementName);

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
        inputEmail.setAttribute("data-element-value", "");
        inputEmail.classList.add("form-control");
        inputEmail.placeholder = "Email";
        inputEmail.ariaLabel = "Wmaili";
        divEmailColumn.appendChild(inputEmail);

        return divEmailWrapper;
    }
    //#endregion
}