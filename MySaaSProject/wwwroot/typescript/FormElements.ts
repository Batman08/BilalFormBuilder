class FormElements {
    private readonly _basicFormElements = document.querySelector("#basicFormElements") as HTMLDivElement;
    private readonly _componentsToCreate = {
        basicFormElements: [
            { name: "Paragraph", type: "Paragraph", icon: ["fas", "fa-paragraph", "fa-sm"] },
            { name: "Dropdown", type: "Dropdown", icon: ["fas", "fa-caret-square-down", "fa-sm"] },
            { name: "Single Choice", type: "SingleChoice", icon: ["fas", "fa-dot-circle", "fa-sm"] },
            { name: "Multiple Choice", type: "MultipleChoice", icon: ["fas", "fa-check-square", "fa-sm"] }
        ]
    }

    constructor() {
        this.createFormElementAddComponent();
    }

    private createFormElementAddComponent(): void {
        this._basicFormElements.innerHTML = '';

        //loop through all components to create
        this._componentsToCreate.basicFormElements.forEach((component) => {
            const listElementWrapper = document.createElement("li") as HTMLLIElement;
            listElementWrapper.classList.add("listAddFormElementWrapper", "bg-indigo-500");
            listElementWrapper.setAttribute("data-element-type", `formElement${component.type}`);

            const divIcon = document.createElement("div") as HTMLDivElement;
            divIcon.classList.add("formElementIcon", "bg-indigo-700");
            listElementWrapper.appendChild(divIcon);

            const spanIcon = document.createElement("span") as HTMLSpanElement;
            divIcon.appendChild(spanIcon);

            const elementIcon = document.createElement("i") as HTMLDivElement;
            elementIcon.classList.add(...component.icon);
            spanIcon.appendChild(elementIcon);


            const divElementnName = document.createElement("div") as HTMLDivElement;
            divElementnName.classList.add("formElementName");
            divElementnName.innerText = component.name;
            listElementWrapper.appendChild(divElementnName);

            this._basicFormElements.appendChild(listElementWrapper);
        });

        //const x = `<li role="button" class="listAddFormElementWrapper bg-indigo-500" data-element-type="formElementParagraph">
        //                    <div class="formElementIcon bg-indigo-700">
        //                        <span><i class="fas fa-paragraph fa-sm"></i></span>
        //                    </div>
        //                    <div class="formElementName">Paragraph</div>
        //                </li>`;
    }

    public FindFormElementToCreate(formElementToCreate: string): HTMLDivElement | null {
        debugger
        const prefix: string = formElementToCreate.substring(0, 11);

        if (prefix !== "formElement")
            return null;

        const elementType: string = formElementToCreate.substring(11);

        //switch statement
        switch (elementType) {
            case "Heading":
                return this.FormElementHeading();
            case "FullName":
                return this.FormElementFullName();
            case "Email":
                return this.FormElementEmail();
            default:
                return null;
        }
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

    private GetFormElementId(elementName: string): string {
        const allElementsWithWrapperClass = document.querySelectorAll(`[name=${elementName}]`);
        console.log(allElementsWithWrapperClass);

        //find the highest number from ids
        let highestNumber = 0;
        allElementsWithWrapperClass.forEach((element: Element) => {
            const elementNumber = parseInt(element.id.replace(elementName, ''));
            if (elementNumber > highestNumber) {
                highestNumber = elementNumber;
            }
        });

        return `${elementName}${highestNumber + 1}` as string;
    }

    //Form Elements
    public FormElementHeading(): HTMLDivElement {
        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divHeadingWrapper.setAttribute("data-wrapper-type", "headingWrapper");

        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        const formElementName = "heading" as string;
        const formId = this.GetFormElementId(formElementName) as string;

        h2Heading.id = formId;
        h2Heading.setAttribute("name", formElementName)
        h2Heading.setAttribute("data-property-reference", "txtHeading");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");

        return divHeadingWrapper;
    }

    public FormElementFullName(): HTMLDivElement {
        const divFullNameWrapper = document.createElement("div") as HTMLDivElement;
        divFullNameWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divFullNameWrapper.setAttribute("data-wrapper-type", "fullNameWrapper");

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
        inputEmail.setAttribute("data-element-value", "");
        inputEmail.classList.add("form-control");
        inputEmail.placeholder = "Email";
        inputEmail.ariaLabel = "Wmaili";
        divEmailColumn.appendChild(inputEmail);

        return divEmailWrapper;
    }
}