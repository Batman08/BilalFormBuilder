class FormElements {
    private readonly _basicFormElements = document.querySelector("#basicFormElements") as HTMLDivElement;
    private readonly _complexFormElements = document.querySelector("#formElements") as HTMLDivElement;
    private readonly _componentsToCreate: componentsToCreate = {
        basicFormElements: [
            { name: "Paragraph", type: "Paragraph", icon: ["fas", "fa-paragraph", "fa-sm"] },
            { name: "Dropdown", type: "Dropdown", icon: ["fas", "fa-caret-square-down", "fa-sm"] },
            { name: "Single Choice", type: "SingleChoice", icon: ["fas", "fa-dot-circle", "fa-sm"] },
            { name: "Multiple Choice", type: "MultipleChoice", icon: ["fas", "fa-check-square", "fa-sm"] },
        ],
        complexFormElements: [
            { name: "Heading", type: "Heading", icon: ["fas", "fa-heading", "fa-sm"] },
            { name: "Full Name", type: "FullName", icon: ["fas", "fa-user", "fa-sm"] },
            { name: "Email", type: "Email", icon: ["fas", "fa-envelope", "fa-sm"] },
            { name: "Phone", type: "Phone", icon: ["fas", "fa-phone", "fa-sm"] },
            { name: "Address", type: "Address", icon: ["fas", "fa-map-marker-alt", "fa-sm"] },
            { name: "Date", type: "Date", icon: ["fas", "fa-calendar-alt", "fa-sm"] },
            { name: "Time", type: "Time", icon: ["fas", "fa-clock", "fa-sm"] },
            { name: "File Upload", type: "FileUpload", icon: ["fas", "fa-file-upload", "fa-sm"] },
            { name: "Signature", type: "Signature", icon: ["fas", "fa-pen", "fa-sm"] },
            { name: "Rating", type: "Rating", icon: ["fas", "fa-star", "fa-sm"] },
            { name: "Slider", type: "Slider", icon: ["fas", "fa-sliders-h", "fa-sm"] },
            { name: "Number", type: "Number", icon: ["fas", "fa-hashtag", "fa-sm"] },
            { name: "Currency", type: "Currency", icon: ["fas", "fa-dollar-sign", "fa-sm"] },
            { name: "Website", type: "Website", icon: ["fas", "fa-globe", "fa-sm"] },
            { name: "Password", type: "Password", icon: ["fas", "fa-key", "fa-sm"] },
            { name: "Image", type: "Image", icon: ["fas", "fa-image", "fa-sm"] },
            { name: "Video", type: "Video", icon: ["fas", "fa-video", "fa-sm"] },
            { name: "Audio", type: "Audio", icon: ["fas", "fa-volume-up", "fa-sm"] },
            { name: "Barcode", type: "Barcode", icon: ["fas", "fa-barcode", "fa-sm"] },
            { name: "QR Code", type: "QRCode", icon: ["fas", "fa-qrcode", "fa-sm"] },
            { name: "Location", type: "Location", icon: ["fas", "fa-map-marker-alt", "fa-sm"] },
            { name: "Button", type: "Button", icon: ["fas", "fa-square", "fa-sm"] },
            { name: "Link", type: "Link", icon: ["fas", "fa-link", "fa-sm"] },
            { name: "HTML", type: "HTML", icon: ["fas", "fa-code", "fa-sm"] },
            { name: "Divider", type: "Divider", icon: ["fas", "fa-minus", "fa-sm"] },
            { name: "Page Break", type: "PageBreak", icon: ["fas", "fa-file-alt", "fa-sm"] },
            { name: "Section Break", type: "SectionBreak", icon: ["fas", "fa-columns", "fa-sm"] },
            { name: "Table", type: "Table", icon: ["fas", "fa-table", "fa-sm"] },
            { name: "List", type: "List", icon: ["fas", "fa-list", "fa-sm"] },
            { name: "Grid", type: "Grid", icon: ["fas", "fa-th", "fa-sm"] },
            { name: "Tabs", type: "Tabs", icon: ["fas", "fa-window-maximize", "fa-sm"] }
        ]
    }

    private _utils: Utilities = new Utilities();

    public Init(): void {
        this.CreateFormElementAddComponent();
    }

    //#region Components
    private CreateFormElementAddComponent(): void {
        this._basicFormElements.innerHTML = '';
        this._complexFormElements.innerHTML = '';

        //loop through all basic components to create
        this._componentsToCreate.basicFormElements.forEach((component) => {
            const addElementComponent = this.FormElementComponent(component.name, component.type, component.icon);
            this._basicFormElements.appendChild(addElementComponent);
        });

        //loop through all complex components to create
        this._componentsToCreate.complexFormElements.forEach((component) => {
            const addElementComponent = this.FormElementComponent(component.name, component.type, component.icon);
            this._complexFormElements.appendChild(addElementComponent);
        });
    }

    private FormElementComponent(name: string, type: string, icon: string[]): HTMLLIElement {
        const listElementWrapper = document.createElement("li") as HTMLLIElement;
        listElementWrapper.classList.add("listAddFormElementWrapper", "bg-indigo-500");
        listElementWrapper.setAttribute("data-element-type", `formElement${type}`);

        const divIcon = document.createElement("div") as HTMLDivElement;
        divIcon.classList.add("formElementIcon", "bg-indigo-700");
        listElementWrapper.appendChild(divIcon);

        const spanIcon = document.createElement("span") as HTMLSpanElement;
        divIcon.appendChild(spanIcon);

        const elementIcon = document.createElement("i") as HTMLDivElement;
        elementIcon.classList.add(...icon);
        spanIcon.appendChild(elementIcon);


        const divElementnName = document.createElement("div") as HTMLDivElement;
        divElementnName.classList.add("formElementName");
        divElementnName.innerText = name;
        listElementWrapper.appendChild(divElementnName);

        return listElementWrapper;
    }

    public FindFormElementToCreate(formElementToCreate: string): HTMLDivElement | null {
        const prefix: string = formElementToCreate.substring(0, 11);

        if (prefix !== "formElement")
            return null;

        const elementType: string = formElementToCreate.substring(11);

        //switch statement
        switch (elementType) {
            case "Paragraph":
                return this.FormElementParagraph();
            case "Dropdown":
                return this.FormElementDropdown();
            case "SingleChoice":
                return this.FormElementSingleChoice();
            case "MultipleChoice":
                return this.FormElementMultipleChoice();
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
    private FormElementParagraph(): HTMLDivElement {
        const formElementName: string = "paragraph";
        const divParagraphWrapper = this.CreateFormElementWrapper(formElementName);

        const paragraph = document.createElement("p") as HTMLParagraphElement;
        const formId = this.GetFormElementId(formElementName) as string;

        paragraph.id = formId;
        paragraph.classList.add("text-break");
        paragraph.setAttribute("name", formElementName)
        paragraph.setAttribute("data-property-reference", "Paragraph");
        paragraph.innerText = "This is a paragraph";
        divParagraphWrapper.appendChild(paragraph);

        return divParagraphWrapper;
    }

    private FormElementDropdown(): HTMLDivElement {
        const formElementName: string = "dropdown";
        const divDropdownWrapper = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divDropdownWrapper.appendChild(divTextStart);

        const dropdownLabel = document.createElement("label") as HTMLLabelElement;
        dropdownLabel.classList.add("form-label");
        dropdownLabel.innerText = "Type a question";
        divTextStart.appendChild(dropdownLabel);

        const select = document.createElement("select") as HTMLSelectElement;
        const formId = this.GetFormElementId(formElementName) as string;

        select.id = formId;
        select.classList.add("form-select");
        select.setAttribute("name", formElementName)
        select.ariaLabel = "Dropdown"
        select.setAttribute("data-property-reference", "Dropdown");
        divDropdownWrapper.appendChild(select);

        const defaultOption = document.createElement("option") as HTMLOptionElement;
        defaultOption.innerText = "Select an option";
        defaultOption.setAttribute("selected", "");
        select.appendChild(defaultOption);

        return divDropdownWrapper;
    }

    private FormElementSingleChoice(): HTMLDivElement {
        const formElementName: string = "singleChoice";
        const divSingleChoiceWrapper = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divSingleChoiceWrapper.appendChild(divTextStart);

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("form-label");
        singleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(singleChoiceLabel);

        const divRadioBtnsContainer = document.createElement("div") as HTMLDivElement;
        const formId = this.GetFormElementId(formElementName) as string;

        divRadioBtnsContainer.id = formId;
        divRadioBtnsContainer.setAttribute("name", formElementName)
        divRadioBtnsContainer.ariaLabel = "Single Choice"
        divRadioBtnsContainer.setAttribute("data-property-reference", "Single Choice");
        divSingleChoiceWrapper.appendChild(divRadioBtnsContainer);

        const defaultCreateNumber = 3 as number;
        let totalSinglChoiceOptionCount: number = this._utils.GetElOptionTotal("singleChoiceWrapper", "singleChoice");
        for (var i = 0; i < defaultCreateNumber; i++) {
            totalSinglChoiceOptionCount += 1
            const itemNum = i + 1;
            const singleChoiceNum = totalSinglChoiceOptionCount;
            const singleChoiceOptionId = `singleChoiceOption${singleChoiceNum}`;

            const divRadioOption = document.createElement("div") as HTMLDivElement;
            divRadioOption.classList.add("form-check");
            divRadioBtnsContainer.appendChild(divRadioOption);

            const radioInput = document.createElement("input") as HTMLInputElement;
            radioInput.classList.add("form-check-input");
            radioInput.type = "radio";
            radioInput.name = formElementName;
            radioInput.id = singleChoiceOptionId;
            divRadioOption.appendChild(radioInput);

            const radioLabel = document.createElement("label") as HTMLLabelElement;
            radioLabel.classList.add("form-check-label");
            radioLabel.htmlFor = singleChoiceOptionId;
            radioLabel.innerText = `Option ${itemNum}`;
            divRadioOption.appendChild(radioLabel);
        }

        return divSingleChoiceWrapper;
    }

    private FormElementMultipleChoice(): HTMLDivElement {
        const formElementName: string = "multipleChoice";
        const divMultipleChoiceWrapper = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divMultipleChoiceWrapper.appendChild(divTextStart);

        const multipleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        multipleChoiceLabel.classList.add("form-label");
        multipleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(multipleChoiceLabel);

        const divCheckboxBtnsContainer = document.createElement("div") as HTMLDivElement;
        const formId = this.GetFormElementId(formElementName) as string;

        divCheckboxBtnsContainer.id = formId;
        divCheckboxBtnsContainer.setAttribute("name", formElementName)
        divCheckboxBtnsContainer.ariaLabel = "Multiple Choice"
        divCheckboxBtnsContainer.setAttribute("data-property-reference", "Multiple Choice");
        divMultipleChoiceWrapper.appendChild(divCheckboxBtnsContainer);

        const defaultCreateNumber = 3 as number;

        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;

            const divCheckboxOption = document.createElement("div") as HTMLDivElement;
            divCheckboxOption.classList.add("form-check");
            divCheckboxBtnsContainer.appendChild(divCheckboxOption);

            const checkboxInput = document.createElement("input") as HTMLInputElement;
            checkboxInput.classList.add("form-check-input");
            checkboxInput.type = "checkbox";
            checkboxInput.name = formElementName;
            checkboxInput.id = `multipleChoiceOption${itemNum}`;
            divCheckboxOption.appendChild(checkboxInput);

            const checkboxLabel = document.createElement("label") as HTMLLabelElement;
            checkboxLabel.classList.add("form-check-label");
            checkboxLabel.htmlFor = `multipleChoiceOption${itemNum}`;
            checkboxLabel.innerText = `Option ${itemNum}`;
            divCheckboxOption.appendChild(checkboxLabel);
        }

        return divMultipleChoiceWrapper;
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