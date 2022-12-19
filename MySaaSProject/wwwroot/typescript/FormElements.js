class FormElements {
    constructor() {
        this._basicFormElements = document.querySelector("#basicFormElements");
        this._complexFormElements = document.querySelector("#formElements");
        this._componentsToCreate = {
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
        };
        this._utils = new Utilities();
        //#endregion
    }
    Init() {
        this.CreateFormElementAddComponent();
    }
    //#region Components
    CreateFormElementAddComponent() {
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
    FormElementComponent(name, type, icon) {
        const listElementWrapper = document.createElement("li");
        listElementWrapper.classList.add("listAddFormElementWrapper", "bg-indigo-500");
        listElementWrapper.setAttribute("data-element-type", `formElement${type}`);
        const divIcon = document.createElement("div");
        divIcon.classList.add("formElementIcon", "bg-indigo-700");
        listElementWrapper.appendChild(divIcon);
        const spanIcon = document.createElement("span");
        divIcon.appendChild(spanIcon);
        const elementIcon = document.createElement("i");
        elementIcon.classList.add(...icon);
        spanIcon.appendChild(elementIcon);
        const divElementnName = document.createElement("div");
        divElementnName.classList.add("formElementName");
        divElementnName.innerText = name;
        listElementWrapper.appendChild(divElementnName);
        return listElementWrapper;
    }
    FieldSectionCategoryComponent(name) {
        const listElementWrapper = document.createElement("li");
        listElementWrapper.classList.add("filteredComponent");
        const divText = document.createElement("div");
        divText.textContent = name;
        listElementWrapper.appendChild(divText);
        return listElementWrapper;
    }
    FindFormElementToCreate(formElementToCreate) {
        const prefix = formElementToCreate.substring(0, 11);
        if (prefix !== "formElement")
            return null;
        const elementType = formElementToCreate.substring(11);
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
    //#endregion
    //#region Generic Form Element Functions
    GetFormElementId(elementName) {
        //remove spaces form elementName
        const trimmedElementName = elementName.split(" ").join("");
        const allElementsWithWrapperClass = document.querySelectorAll(`[name=${trimmedElementName}]`);
        console.log(allElementsWithWrapperClass);
        //find the highest number from ids
        let highestNumber = 0;
        allElementsWithWrapperClass.forEach((element) => {
            const elementNumber = parseInt(element.id.replace(trimmedElementName, ''));
            if (elementNumber > highestNumber) {
                highestNumber = elementNumber;
            }
        });
        return `${trimmedElementName}${highestNumber + 1}`;
    }
    CreateFormElementWrapper(elementName) {
        const divWrapper = document.createElement("div");
        divWrapper.classList.add("createdFormElement", "pad15", "position-relative", "text-start");
        divWrapper.setAttribute("data-wrapper-type", `${elementName}Wrapper`);
        return divWrapper;
    }
    //#endregion
    //#region Basic Form Elements
    FormElementParagraph() {
        const formElementName = "paragraph";
        const divParagraphWrapper = this.CreateFormElementWrapper(formElementName);
        const paragraph = document.createElement("p");
        const formId = this.GetFormElementId(formElementName);
        paragraph.id = formId;
        paragraph.classList.add("text-break");
        paragraph.setAttribute("name", formElementName);
        paragraph.setAttribute("data-property-reference", "Paragraph");
        paragraph.innerText = "This is a paragraph";
        divParagraphWrapper.appendChild(paragraph);
        return divParagraphWrapper;
    }
    FormElementDropdown() {
        const formElementName = "dropdown";
        const divDropdownWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divDropdownWrapper.appendChild(divTextStart);
        const dropdownLabel = document.createElement("label");
        dropdownLabel.classList.add("form-label");
        dropdownLabel.innerText = "Type a question";
        divTextStart.appendChild(dropdownLabel);
        const select = document.createElement("select");
        const formId = this.GetFormElementId(formElementName);
        select.id = formId;
        select.classList.add("form-select");
        select.setAttribute("name", formElementName);
        select.ariaLabel = "Dropdown";
        select.setAttribute("data-property-reference", "Dropdown");
        select.disabled = true;
        divDropdownWrapper.appendChild(select);
        const ddlOptionData = { dropdownValue: "", dropdownTextContent: "Select an option" };
        const defaultOption = this._utils.CreateDropdownOption(ddlOptionData);
        defaultOption.setAttribute("selected", "");
        select.appendChild(defaultOption);
        return divDropdownWrapper;
    }
    FormElementSingleChoice() {
        const formElementName = "singleChoice";
        const divSingleChoiceWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divSingleChoiceWrapper.appendChild(divTextStart);
        const singleChoiceLabel = document.createElement("label");
        singleChoiceLabel.classList.add("form-label");
        singleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(singleChoiceLabel);
        const divRadioBtnsContainer = document.createElement("div");
        const formId = this.GetFormElementId(formElementName);
        divRadioBtnsContainer.id = formId;
        divRadioBtnsContainer.setAttribute("name", formElementName);
        divRadioBtnsContainer.ariaLabel = "Single Choice";
        divRadioBtnsContainer.setAttribute("data-property-reference", "Single Choice");
        divSingleChoiceWrapper.appendChild(divRadioBtnsContainer);
        const singleChoicelElNumber = formId.substring(12);
        const singleChoiceElName = `${formElementName}Q${singleChoicelElNumber}`;
        const defaultCreateNumber = 3;
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = (i + 1).toString();
            const singleChoiceOptionNum = i;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;
            const scOptionData = { singleChoiceOptionId: singleChoiceOptionId, singleChoiceElName: singleChoiceElName, singleChoiceOptionTextContent: `Option ${itemNum}` };
            const divSinglChoiceWrapper = this._utils.CreateSingleChoiceOption(scOptionData);
            divRadioBtnsContainer.appendChild(divSinglChoiceWrapper);
        }
        return divSingleChoiceWrapper;
    }
    FormElementMultipleChoice() {
        const formElementName = "multipleChoice";
        const divMultipleChoiceWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divMultipleChoiceWrapper.appendChild(divTextStart);
        const multipleChoiceLabel = document.createElement("label");
        multipleChoiceLabel.classList.add("form-label");
        multipleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(multipleChoiceLabel);
        const divCheckboxBtnsContainer = document.createElement("div");
        const formId = this.GetFormElementId(formElementName);
        divCheckboxBtnsContainer.id = formId;
        divCheckboxBtnsContainer.setAttribute("name", formElementName);
        divCheckboxBtnsContainer.ariaLabel = "Multiple Choice";
        divCheckboxBtnsContainer.setAttribute("data-property-reference", "Multiple Choice");
        divMultipleChoiceWrapper.appendChild(divCheckboxBtnsContainer);
        const defaultCreateNumber = 3;
        const multipleChoicelElNumber = formId.substring(14);
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;
            const mcOptionData = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: `Option ${itemNum}`,
                multipleChoiceOptionTextContent: `Option ${itemNum}`
            };
            const divMultipleChoiceWrapper = this._utils.CreateMultipleChoiceOption(mcOptionData);
            divCheckboxBtnsContainer.appendChild(divMultipleChoiceWrapper);
        }
        return divMultipleChoiceWrapper;
    }
    FormElementDatePicker() {
        const formElementName = "datePicker";
        const divDatePickerWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divDatePickerWrapper.appendChild(divTextStart);
        const datePickerLabel = document.createElement("label");
        datePickerLabel.classList.add("form-label");
        datePickerLabel.innerText = "Date";
        divTextStart.appendChild(datePickerLabel);
        const datePicker = document.createElement("input");
        const formId = this.GetFormElementId(formElementName);
        datePicker.id = formId;
        datePicker.type = "date";
        datePicker.classList.add("form-control");
        datePicker.setAttribute("name", formElementName);
        datePicker.setAttribute("data-property-reference", "Date Picker");
        datePicker.disabled = true;
        divDatePickerWrapper.appendChild(datePicker);
        return divDatePickerWrapper;
    }
    FormElementTime() {
        const formElementName = "datePicker";
        const divTimeWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divTimeWrapper.appendChild(divTextStart);
        const timeLabel = document.createElement("label");
        timeLabel.classList.add("form-label");
        timeLabel.innerText = "Time";
        divTextStart.appendChild(timeLabel);
        const timeInput = document.createElement("input");
        const formId = this.GetFormElementId(formElementName);
        timeInput.id = formId;
        timeInput.type = "time";
        timeInput.classList.add("form-control");
        timeInput.setAttribute("name", formElementName);
        timeInput.setAttribute("data-property-reference", "Time");
        timeInput.disabled = true;
        divTimeWrapper.appendChild(timeInput);
        return divTimeWrapper;
    }
    FormElementNumber() {
        const formElementName = "number";
        const divNumberWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divNumberWrapper.appendChild(divTextStart);
        const numberLabel = document.createElement("label");
        numberLabel.classList.add("form-label");
        numberLabel.innerText = "Number";
        divTextStart.appendChild(numberLabel);
        const numberInput = document.createElement("input");
        const formId = this.GetFormElementId(formElementName);
        numberInput.id = formId;
        numberInput.type = "number";
        numberInput.classList.add("form-control");
        numberInput.setAttribute("name", formElementName);
        numberInput.setAttribute("data-property-reference", "Number");
        numberInput.placeholder = "e.g 21";
        numberInput.disabled = true;
        divNumberWrapper.appendChild(numberInput);
        return divNumberWrapper;
    }
    FormElementImage() {
        const formElementName = "image";
        const divImageWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divImageWrapper.appendChild(divTextStart);
        const imageEl = document.createElement("img");
        const formId = this.GetFormElementId(formElementName);
        imageEl.id = formId;
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.classList.add("mx-auto", "d-block", "rounded");
        imageEl.setAttribute("name", formElementName);
        imageEl.setAttribute("data-property-reference", "Image");
        divImageWrapper.appendChild(imageEl);
        return divImageWrapper;
    }
    FormElementFileUpload() {
        const formElementName = "fileUpload";
        const divFileUploadWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divFileUploadWrapper.appendChild(divTextStart);
        const fileUploadLabel = document.createElement("label");
        fileUploadLabel.classList.add("form-label");
        fileUploadLabel.innerText = "File Upload";
        divTextStart.appendChild(fileUploadLabel);
        const fileUploadInput = document.createElement("input");
        const formId = this.GetFormElementId(formElementName);
        fileUploadInput.id = formId;
        fileUploadInput.type = "file";
        fileUploadInput.classList.add("form-control");
        fileUploadInput.setAttribute("name", formElementName);
        fileUploadInput.setAttribute("data-property-reference", "File Upload");
        fileUploadInput.multiple = true;
        fileUploadInput.disabled = true;
        divFileUploadWrapper.appendChild(fileUploadInput);
        return divFileUploadWrapper;
    }
    FormElementSubmit() {
        const formElementName = "submit";
        const divSubmitWrapper = this.CreateFormElementWrapper(formElementName);
        const divTextCenter = document.createElement("div");
        divTextCenter.classList.add("text-center");
        divSubmitWrapper.appendChild(divTextCenter);
        const btnSubmit = document.createElement("input");
        const formId = this.GetFormElementId(formElementName);
        btnSubmit.id = formId;
        btnSubmit.type = "submit";
        btnSubmit.classList.add("btn", "btn-primary", "mx-auto", "btnSubmit");
        btnSubmit.setAttribute("name", formElementName);
        btnSubmit.setAttribute("data-property-reference", "Submit");
        btnSubmit.setAttribute("data-align", "center");
        btnSubmit.value = "Submit";
        btnSubmit.disabled = true;
        divTextCenter.appendChild(btnSubmit);
        return divSubmitWrapper;
    }
    //#endregion
    //#region Complex Form Elements
    FormElementHeading() {
        const formElementName = "heading";
        const divHeadingWrapper = this.CreateFormElementWrapper(formElementName);
        const h2Heading = document.createElement("h2");
        const formId = this.GetFormElementId(formElementName);
        h2Heading.id = formId;
        h2Heading.setAttribute("name", formElementName);
        h2Heading.setAttribute("data-property-reference", "Heading");
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
    FormElementFullName() {
        const formElementName = "fullName";
        const divFullNameWrapper = this.CreateFormElementWrapper(formElementName);
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
        const formElementName = "email";
        const divEmailWrapper = this.CreateFormElementWrapper(formElementName);
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