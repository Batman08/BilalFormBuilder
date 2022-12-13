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
            const addElementComponent = this.FormElementComponent(component.name, component.type, component.icon);
            this._basicFormElements.appendChild(addElementComponent);
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