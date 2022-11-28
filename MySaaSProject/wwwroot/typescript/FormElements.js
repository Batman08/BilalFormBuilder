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
        };
        //#endregion
    }
    Init() {
        this.createFormElementAddComponent();
    }
    createFormElementAddComponent() {
        this._basicFormElements.innerHTML = '';
        this._complexFormElements.innerHTML = '';
        //loop through all basic components to create
        this._componentsToCreate.basicFormElements.forEach((component) => {
            const addElementComponent = this.formElementComponent(component.name, component.type, component.icon);
            this._basicFormElements.appendChild(addElementComponent);
        });
        //loop through all complex components to create
        this._componentsToCreate.complexFormElements.forEach((component) => {
            const addElementComponent = this.formElementComponent(component.name, component.type, component.icon);
            this._complexFormElements.appendChild(addElementComponent);
        });
    }
    formElementComponent(name, type, icon) {
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
    //#region Basic Form Elements
    FormElementParagraph() {
        const divParagraphWrapper = document.createElement("div");
        divParagraphWrapper.classList.add("createdFormElement", "pad15", "position-relative", "text-start");
        divParagraphWrapper.setAttribute("data-wrapper-type", "paragraphWrapper");
        const paragraph = document.createElement("p");
        const formElementName = "paragraph";
        const formId = this.GetFormElementId(formElementName);
        paragraph.id = formId;
        paragraph.setAttribute("name", formElementName);
        paragraph.setAttribute("data-property-reference", "Paragraph");
        paragraph.innerText = "This is a paragraph";
        divParagraphWrapper.appendChild(paragraph);
        return divParagraphWrapper;
    }
    FormElementDropdown() {
        const divDropdownWrapper = document.createElement("div");
        divDropdownWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divDropdownWrapper.setAttribute("data-wrapper-type", "dropdownWrapper");
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divDropdownWrapper.appendChild(divTextStart);
        const dropdownLabel = document.createElement("label");
        dropdownLabel.classList.add("form-label");
        dropdownLabel.innerText = "Type a question";
        divTextStart.appendChild(dropdownLabel);
        const select = document.createElement("select");
        const formElementName = "dropdown";
        const formId = this.GetFormElementId(formElementName);
        select.id = formId;
        select.classList.add("form-select");
        select.setAttribute("name", formElementName);
        select.ariaLabel = "Dropdown";
        select.setAttribute("data-property-reference", "Dropdown");
        divDropdownWrapper.appendChild(select);
        const defaultOption = document.createElement("option");
        defaultOption.innerText = "Select an option";
        defaultOption.setAttribute("selected", "");
        select.appendChild(defaultOption);
        return divDropdownWrapper;
    }
    FormElementSingleChoice() {
        const divSingleChoiceWrapper = document.createElement("div");
        divSingleChoiceWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divSingleChoiceWrapper.setAttribute("data-wrapper-type", "singleChoiceWrapper");
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divSingleChoiceWrapper.appendChild(divTextStart);
        const singleChoiceLabel = document.createElement("label");
        singleChoiceLabel.classList.add("form-label");
        singleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(singleChoiceLabel);
        const divRadioBtnsContainer = document.createElement("div");
        const formElementName = "singleChoice";
        const formId = this.GetFormElementId(formElementName);
        divRadioBtnsContainer.id = formId;
        divRadioBtnsContainer.setAttribute("name", formElementName);
        divRadioBtnsContainer.ariaLabel = "Single Choice";
        divRadioBtnsContainer.setAttribute("data-property-reference", "Single Choice");
        divSingleChoiceWrapper.appendChild(divRadioBtnsContainer);
        const defaultCreateNumber = 3;
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;
            const divRadioOption = document.createElement("div");
            divRadioOption.classList.add("form-check");
            divRadioBtnsContainer.appendChild(divRadioOption);
            const radioInput = document.createElement("input");
            radioInput.classList.add("form-check-input");
            radioInput.type = "radio";
            radioInput.name = formElementName;
            radioInput.id = `singleChoiceOption${itemNum}`;
            divRadioOption.appendChild(radioInput);
            const radioLabel = document.createElement("label");
            radioLabel.classList.add("form-check-label");
            radioLabel.htmlFor = `singleChoiceOption${itemNum}`;
            radioLabel.innerText = `Option ${itemNum}`;
            divRadioOption.appendChild(radioLabel);
        }
        return divSingleChoiceWrapper;
    }
    FormElementMultipleChoice() {
        const divMultipleChoiceWrapper = document.createElement("div");
        divMultipleChoiceWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divMultipleChoiceWrapper.setAttribute("data-wrapper-type", "multipleChoiceWrapper");
        const divTextStart = document.createElement("div");
        divTextStart.classList.add("text-start");
        divMultipleChoiceWrapper.appendChild(divTextStart);
        const multipleChoiceLabel = document.createElement("label");
        multipleChoiceLabel.classList.add("form-label");
        multipleChoiceLabel.innerText = "Type a question";
        divTextStart.appendChild(multipleChoiceLabel);
        const divCheckboxBtnsContainer = document.createElement("div");
        const formElementName = "multipleChoice";
        const formId = this.GetFormElementId(formElementName);
        divCheckboxBtnsContainer.id = formId;
        divCheckboxBtnsContainer.setAttribute("name", formElementName);
        divCheckboxBtnsContainer.ariaLabel = "Multiple Choice";
        divCheckboxBtnsContainer.setAttribute("data-property-reference", "Multiple Choice");
        divMultipleChoiceWrapper.appendChild(divCheckboxBtnsContainer);
        const defaultCreateNumber = 3;
        for (var i = 0; i < defaultCreateNumber; i++) {
            const itemNum = i + 1;
            const divCheckboxOption = document.createElement("div");
            divCheckboxOption.classList.add("form-check");
            divCheckboxBtnsContainer.appendChild(divCheckboxOption);
            const checkboxInput = document.createElement("input");
            checkboxInput.classList.add("form-check-input");
            checkboxInput.type = "checkbox";
            checkboxInput.name = formElementName;
            checkboxInput.id = `multipleChoiceOption${itemNum}`;
            divCheckboxOption.appendChild(checkboxInput);
            const checkboxLabel = document.createElement("label");
            checkboxLabel.classList.add("form-check-label");
            checkboxLabel.htmlFor = `multipleChoiceOption${itemNum}`;
            checkboxLabel.innerText = `Option ${itemNum}`;
            divCheckboxOption.appendChild(checkboxLabel);
        }
        return divMultipleChoiceWrapper;
    }
    //#endregion
    //#region Complex Form Elements
    FormElementHeading() {
        const divHeadingWrapper = document.createElement("div");
        divHeadingWrapper.classList.add("createdFormElement", "pad15", "position-relative");
        divHeadingWrapper.setAttribute("data-wrapper-type", "headingWrapper");
        const h2Heading = document.createElement("h2");
        const formElementName = "heading";
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