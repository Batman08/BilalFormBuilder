class FormElements {
    private readonly _basicFormElements = document.querySelector("#basicFormElements") as HTMLDivElement;
    private readonly _complexFormElements = document.querySelector("#formElements") as HTMLDivElement;
    private readonly _componentsToCreate: ComponentsToCreateDTO = {
        basicFormElements: [
            { name: "Paragraph", type: "Paragraph", icon: ["fas", "fa-paragraph", "fa-sm"] },
            { name: "Dropdown", type: "Dropdown", icon: ["fas", "fa-caret-square-down", "fa-sm"] },
            { name: "Single Choice", type: "SingleChoice", icon: ["fas", "fa-dot-circle", "fa-sm"] },
            { name: "Multiple Choice", type: "MultipleChoice", icon: ["fas", "fa-check-square", "fa-sm"] },
            { name: "Date Picker", type: "DatePicker", icon: ["fas", "fa-calendar-alt", "fa-sm"] },
            { name: "Time", type: "Time", icon: ["fas", "fa-clock", "fa-sm"] },
            { name: "Number", type: "Number", icon: ["fas", "fa-hashtag", "fa-sm"] },
            { name: "Image", type: "Image", icon: ["fas", "fa-image", "fa-sm"] },
            { name: "File Upload", type: "FileUpload", icon: ["fas", "fa-file-upload", "fa-sm"] },
            { name: "Submit", type: "Submit", icon: ["fas", "fa-square", "fa-sm"] },
            { name: "Survey Components", type: "FieldSectionCategory" },
            { name: "Rating", type: "Rating", icon: ["fas", "fa-star", "fa-sm"] },
            { name: "Table", type: "Table", icon: ["fas", "fa-table", "fa-sm"] },
            { name: "Page Components", type: "FieldSectionCategory" },
            { name: "Divider", type: "Divider", icon: ["fas", "fa-minus", "fa-sm"] },
            { name: "Page Break", type: "PageBreak", icon: ["fas", "fa-file-alt", "fa-sm"] },
            { name: "Section Break", type: "SectionBreak", icon: ["fas", "fa-columns", "fa-sm"] },
        ],
        complexFormElements: [
            { name: "Heading", type: "Heading", icon: ["fas", "fa-heading", "fa-sm"] },
            { name: "Full Name", type: "FullName", icon: ["fas", "fa-user", "fa-sm"] },
            { name: "Email", type: "Email", icon: ["fas", "fa-envelope", "fa-sm"] },
            { name: "Phone", type: "Phone", icon: ["fas", "fa-phone", "fa-sm"] },
            { name: "Address", type: "Address", icon: ["fas", "fa-map-marker-alt", "fa-sm"] },
            { name: "Video", type: "Video", icon: ["fas", "fa-video", "fa-sm"] },
            { name: "Audio", type: "Audio", icon: ["fas", "fa-volume-up", "fa-sm"] },
            { name: "Barcode", type: "Barcode", icon: ["fas", "fa-barcode", "fa-sm"] },
            { name: "QR Code", type: "QRCode", icon: ["fas", "fa-qrcode", "fa-sm"] },
            { name: "Location", type: "Location", icon: ["fas", "fa-map-marker-alt", "fa-sm"] },
            { name: "Link", type: "Link", icon: ["fas", "fa-link", "fa-sm"] },
            { name: "List", type: "List", icon: ["fas", "fa-list", "fa-sm"] },
            { name: "Grid", type: "Grid", icon: ["fas", "fa-th", "fa-sm"] },
            { name: "Tabs", type: "Tabs", icon: ["fas", "fa-window-maximize", "fa-sm"] }
        ]
    }

    public Init(): void {
        this.CreateFormElementAddComponent();
    }

    //#region Components
    private CreateFormElementAddComponent(): void {
        this._basicFormElements.innerHTML = '';
        this._complexFormElements.innerHTML = '';

        //loop through all basic components to create
        this._componentsToCreate.basicFormElements.forEach((component) => {
            if (component.type !== "FieldSectionCategory") {
                const addElementComponent = this.FormElementComponent(component.name, component.type, component.icon);
                this._basicFormElements.appendChild(addElementComponent);
            }
            else {
                const addFieldSectionCategory = this.FieldSectionCategoryComponent(component.name);
                this._basicFormElements.appendChild(addFieldSectionCategory);
            }
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

    private FieldSectionCategoryComponent(name: string): HTMLLIElement {
        const listElementWrapper = document.createElement("li") as HTMLLIElement;
        listElementWrapper.classList.add("filteredComponent");

        const divText = document.createElement("div") as HTMLDivElement;
        divText.textContent = name;
        listElementWrapper.appendChild(divText);
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
            case "DatePicker":
                return this.FormElementDatePicker();
            case "Time":
                return this.FormElementTime();
            case "Number":
                return this.FormElementNumber();
            case "Image":
                return this.FormElementImage();
            case "FileUpload":
                return this.FormElementFileUpload();
            case "Submit":
                return this.FormElementSubmit();
            //case "Rating":
            //    return null;
            case "Table":
                return this.FormElementTable();
            case "Divider":
                return this.FormElementDivider();
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
        select.setAttribute("name", formElementName);
        select.ariaLabel = "Dropdown";
        select.setAttribute("data-property-reference", "Dropdown");
        select.disabled = true;
        divDropdownWrapper.appendChild(select);

        const ddlOptionData: DropdownOptionDTO = { dropdownValue: "", dropdownTextContent: "Select an option" };
        const defaultOption: HTMLOptionElement = Utilities.CreateDropdownOption(ddlOptionData);
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
        divRadioBtnsContainer.setAttribute("name", formElementName);
        divRadioBtnsContainer.ariaLabel = "Single Choice";
        divRadioBtnsContainer.setAttribute("data-property-reference", "Single Choice");
        divSingleChoiceWrapper.appendChild(divRadioBtnsContainer);

        const singleChoicelElNumber: string = formId.substring(12);
        const singleChoiceElName: string = `${formElementName}Q${singleChoicelElNumber}`;
        const defaultCreateNumber = 3 as number;
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum: string = (i + 1).toString();
            const singleChoiceOptionNum = i;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;

            const scOptionData: SingleChoiceOptionDTO = { singleChoiceOptionId: singleChoiceOptionId, singleChoiceElName: singleChoiceElName, singleChoiceOptionTextContent: `Option ${itemNum}` };
            const divSinglChoiceWrapper: HTMLDivElement = Utilities.CreateSingleChoiceOption(scOptionData);
            divRadioBtnsContainer.appendChild(divSinglChoiceWrapper);
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
        const multipleChoicelElNumber: string = formId.substring(14);
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId: string = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;

            const mcOptionData: MultipleChoiceOptionDTO = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: `Option ${itemNum}`,
                multipleChoiceOptionTextContent: `Option ${itemNum}`
            };
            const divMultipleChoiceWrapper: HTMLDivElement = Utilities.CreateMultipleChoiceOption(mcOptionData);
            divCheckboxBtnsContainer.appendChild(divMultipleChoiceWrapper);
        }

        return divMultipleChoiceWrapper;
    }

    private FormElementDatePicker(): HTMLDivElement {
        const formElementName: string = "datePicker";
        const divDatePickerWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divDatePickerWrapper.appendChild(divTextStart);

        const datePickerLabel = document.createElement("label") as HTMLLabelElement;
        datePickerLabel.classList.add("form-label");
        datePickerLabel.innerText = "Date";
        divTextStart.appendChild(datePickerLabel);

        const datePicker = document.createElement("input") as HTMLInputElement;
        const formId = this.GetFormElementId(formElementName) as string;

        datePicker.id = formId;
        datePicker.type = "date";
        datePicker.classList.add("form-control");
        datePicker.setAttribute("name", formElementName)
        datePicker.setAttribute("data-property-reference", "Date Picker");
        datePicker.disabled = true;
        divDatePickerWrapper.appendChild(datePicker);

        return divDatePickerWrapper;
    }

    private FormElementTime(): HTMLDivElement {
        const formElementName: string = "datePicker";
        const divTimeWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divTimeWrapper.appendChild(divTextStart);

        const timeLabel = document.createElement("label") as HTMLLabelElement;
        timeLabel.classList.add("form-label");
        timeLabel.innerText = "Time";
        divTextStart.appendChild(timeLabel);

        const timeInput = document.createElement("input") as HTMLInputElement;
        const formId = this.GetFormElementId(formElementName) as string;

        timeInput.id = formId;
        timeInput.type = "time";
        timeInput.classList.add("form-control");
        timeInput.setAttribute("name", formElementName)
        timeInput.setAttribute("data-property-reference", "Time");
        timeInput.disabled = true;
        divTimeWrapper.appendChild(timeInput);

        return divTimeWrapper;
    }

    private FormElementNumber(): HTMLDivElement {
        const formElementName: string = "number";
        const divNumberWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divNumberWrapper.appendChild(divTextStart);

        const numberLabel = document.createElement("label") as HTMLLabelElement;
        numberLabel.classList.add("form-label");
        numberLabel.innerText = "Number";
        divTextStart.appendChild(numberLabel);

        const numberInput = document.createElement("input") as HTMLInputElement;
        const formId = this.GetFormElementId(formElementName) as string;

        numberInput.id = formId;
        numberInput.type = "number";
        numberInput.classList.add("form-control");
        numberInput.setAttribute("name", formElementName)
        numberInput.setAttribute("data-property-reference", "Number");
        numberInput.placeholder = "e.g 21";
        numberInput.disabled = true;
        divNumberWrapper.appendChild(numberInput);

        return divNumberWrapper;
    }

    private FormElementImage(): HTMLDivElement {
        const formElementName: string = "image";
        const divImageWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divImageWrapper.appendChild(divTextStart);

        const imageEl = document.createElement("img") as HTMLImageElement;
        const formId = this.GetFormElementId(formElementName) as string;

        imageEl.id = formId;
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.classList.add("mx-auto", "d-block", "rounded");
        imageEl.setAttribute("name", formElementName)
        imageEl.setAttribute("data-property-reference", "Image");
        divImageWrapper.appendChild(imageEl);

        return divImageWrapper;
    }

    private FormElementFileUpload(): HTMLDivElement {
        const formElementName: string = "fileUpload";
        const divFileUploadWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divFileUploadWrapper.appendChild(divTextStart);

        const fileUploadLabel = document.createElement("label") as HTMLLabelElement;
        fileUploadLabel.classList.add("form-label");
        fileUploadLabel.innerText = "File Upload";
        divTextStart.appendChild(fileUploadLabel);

        const fileUploadInput = document.createElement("input") as HTMLInputElement;
        const formId = this.GetFormElementId(formElementName) as string;

        fileUploadInput.id = formId;
        fileUploadInput.type = "file";
        fileUploadInput.classList.add("form-control");
        fileUploadInput.setAttribute("name", formElementName)
        fileUploadInput.setAttribute("data-property-reference", "File Upload");
        fileUploadInput.multiple = true;
        fileUploadInput.disabled = true;
        divFileUploadWrapper.appendChild(fileUploadInput);

        return divFileUploadWrapper;
    }

    private FormElementSubmit(): HTMLDivElement {
        const formElementName: string = "submit";
        const divSubmitWrapper: HTMLDivElement = this.CreateFormElementWrapper(formElementName);

        const divTextCenter = document.createElement("div") as HTMLDivElement;
        divTextCenter.classList.add("text-center");
        divSubmitWrapper.appendChild(divTextCenter);

        const btnSubmit = document.createElement("input") as HTMLButtonElement;
        const formId = this.GetFormElementId(formElementName) as string;

        btnSubmit.id = formId;
        btnSubmit.type = "submit";
        btnSubmit.classList.add("btn", "btn-primary", "mx-auto", "btnSubmit");
        btnSubmit.setAttribute("name", formElementName)
        btnSubmit.setAttribute("data-property-reference", "Submit");
        btnSubmit.setAttribute("data-align", "center")
        btnSubmit.value = "Submit";
        btnSubmit.disabled = true;
        divTextCenter.appendChild(btnSubmit);

        return divSubmitWrapper;
    }

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
        const tableInputType: string = "Numeric";
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