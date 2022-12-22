/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />

class FormElementProperties {
    private readonly rightDesigner = document.querySelector('#rightDesigner') as HTMLDivElement;
    private _tinymce: any;
    private _utils: Utilities = new Utilities();

    public Init(tinymce: any): void {
        this._tinymce = tinymce;
    }

    public GetElementProperties(elementType: string, element: HTMLElement, callback?: Function) {

        switch (elementType) {
            case "paragraphWrapper":
                this.ParagraphProperties(element, callback);
                break;
            case "singleChoiceWrapper":
                this.SingleChoiceProperties(element);
                break;
            case "dropdownWrapper":
                this.DropdownProperties(element);
                break;
            case "multipleChoiceWrapper":
                this.MultipleChoiceProperties(element);
                break;
            case "datePickerWrapper":
                this.DatePickerProperties(element);
                break;
            case "timeWrapper":
                this.TimeProperties(element);
                break;
            case "numberWrapper":
                this.NumberProperties(element);
                break;
            case "fileUploadWrapper":
                this.FileUploadProperties(element);
                break;
            case "imageWrapper":
                this.ImageProperties(element);
                break;
            case "submitWrapper":
                this.SubmitProperties(element);
                break;
            case "ratingWrapper":
                break;
            case "tableWrapper":
                this.TableProperties(element);
                break;
            case "headingWrapper":
                this.HeadingProperties(element);
                break;
            case "fullNameWrapper":
                this.FullNameProperties(element);
                break;
            default:
                break;
        }
    }

    //#region Generic Functions
    private FieldLabelProperty(data: FieldLabelPropertyData): HTMLDivElement {
        const fieldLabelWrapper = document.createElement("div") as HTMLDivElement;
        fieldLabelWrapper.classList.add("mb-3");

        const fieldLabel = document.createElement("label") as HTMLLabelElement;
        fieldLabel.htmlFor = "editField";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "Field Label";

        const fieldLabelInput = document.createElement("input") as HTMLInputElement;
        fieldLabelInput.id = "editField";
        fieldLabelInput.classList.add("form-control");
        fieldLabelInput.type = "text";
        fieldLabelInput.placeholder = data.PlaceHolder;
        fieldLabelInput.value = data.InputVal;
        fieldLabelInput.ariaRoleDescription = data.AriaRoleDesc;
        fieldLabelInput.oninput = (ev: InputEvent) => { data.ElementToUpdate.textContent = fieldLabelInput.value; };

        fieldLabelWrapper.appendChild(fieldLabel);
        fieldLabelWrapper.appendChild(fieldLabelInput);

        return fieldLabelWrapper;
    }

    private TextareaLabelProperty(wrapperId: string, textVal: string): HTMLDivElement {
        const optionsWrapper = document.createElement("div") as HTMLDivElement;
        optionsWrapper.id = wrapperId;
        optionsWrapper.classList.add("mb-3", "pt-3");

        const optionsLabel = document.createElement("label") as HTMLLabelElement;
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = textVal;
        optionsWrapper.appendChild(optionsLabel);

        return optionsWrapper;
    }

    private MultiSelectTextAreaProperty(optionsFromMultiSelectEl: NodeListOf<Node>, updateFuncData: any, updateFunc: Function, labelText: string, textareaId: string): HTMLDivElement {
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = textareaId;
        textarea.classList.add("form-control");
        textarea.placeholder = labelText;
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = textareaId;
        textareaLabel.textContent = labelText;

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        optionsFromMultiSelectEl.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            optionsFromElement.push(option.textContent);
        });

        console.log(optionsFromElement);
        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            const options: string[] = this.GetOptionsFromTextarea(textarea);
            updateFuncData.options = options;
            updateFunc(updateFuncData);
        };

        return divTextarea;
    }

    private UpdateTextAreaOptions(textarea: HTMLTextAreaElement, options: string[]): void {
        //add options to textarea
        if (options !== null && options !== undefined) {
            textarea.value = options.join('\n');
        }
    }

    private GetOptionsFromTextarea(textarea: HTMLTextAreaElement): string[] {
        //split data into array
        const options = textarea.value.split(/[\n,]+/);
        return options;
    }
    //#endregion

    //#region Basic Properties

    //#region Paragraph Properties
    private ParagraphProperties(paragraphElement: HTMLElement, callback?: Function): void {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]") as HTMLParagraphElement;
        const currentText: string = elementToUpdateText.textContent;

        this.rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea') as HTMLTextAreaElement;
        textArea.id = 'paragraph-editor';
        this.rightDesigner.appendChild(textArea);
        //this._tinymce.activeEditor.setContent("this is a test");

        //delay to init tinymce
        setTimeout(() => {//todo: should only show right designer when tinymce editor has been initialized
            const utils = new Utilities();
            utils.InitTinyMCE(this._tinymce, 'textarea#paragraph-editor');
            setTimeout(() => {//todo: should only show right designer when tinymce editor has been initialized
                this._tinymce.activeEditor.setContent(currentText);
                utils.AddTinymceListeners(this._tinymce, elementToUpdateText, callback);
            }, 1000);
        }, 0.0001);
    }
    //#endregion

    //#region Dropdown Properties
    private DropdownProperties(dropdownElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const dropdownLabelEl = dropdownElement.querySelector(".form-label") as HTMLParagraphElement;
        const dropdownLabelText: string = dropdownLabelEl.textContent;
        const optionsFromDropdown = dropdownElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Dropdown Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Dropdown Question",
            ElementToUpdate: dropdownLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Dropdown Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("ddlOptions", "Dropdown Options");
        //#endregion

        //#region Textarea Property Element
        const functionData: DDLUpdateFuncDTO = {
            utils: this._utils,
            dropdownElWrapper: dropdownElement
        }
        const textarea = this.MultiSelectTextAreaProperty(optionsFromDropdown, functionData, this.UpdateDropdownOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateDropdownOptions(dropdownData: DDLUpdateFuncDTO): void {
        const ddlEl = dropdownData.dropdownElWrapper.querySelector("[data-property-reference]") as HTMLSelectElement;
        const currentDropdownOptions = ddlEl.querySelectorAll("option") as NodeListOf<HTMLOptionElement>;
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;

            option.remove();
        });

        for (let i = 0; i < dropdownData.options.length; i++) {
            const ddlOptionData: DropdownOptionDTO = { dropdownValue: dropdownData.options[i], dropdownTextContent: dropdownData.options[i] };
            const newOption: HTMLOptionElement = dropdownData.utils.CreateDropdownOption(ddlOptionData);
            ddlEl.appendChild(newOption);
        }
    }
    //#endregion

    //#region Single Choice Properties
    private SingleChoiceProperties(singleChoiceElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const singleChoiceLabelEl = singleChoiceElement.querySelector(".form-label") as HTMLParagraphElement;
        const dropdownLabelText: string = singleChoiceLabelEl.textContent;
        const optionsFromSingleChoice = singleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Single Choice Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Single Choice Question",
            ElementToUpdate: singleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Single Choice Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("scOptions", "Single Choice Options");
        //#endregion

        //#region Textarea Property Element
        const functionData: SCLUpdateFuncDTO = {
            utils: this._utils,
            singlchoiceElWrapper: singleChoiceElement
        }
        const textarea = this.MultiSelectTextAreaProperty(optionsFromSingleChoice, functionData, this.UpdateSingleChoiceOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateSingleChoiceOptions(scData: SCLUpdateFuncDTO): void {
        const singleChoicelEl = scData.singlchoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        singleChoicelEl.innerHTML = "";

        const singleChoicelElNumber: string = singleChoicelEl.id.substring(12);
        const singleChoiceElName: string = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelElNumber}`;
        for (let i = 0; i < scData.options.length; i++) {
            const singleChoiceOptionNum = i + 1;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;

            const scOptionData: SingleChoiceOptionDTO = {
                singleChoiceOptionId: singleChoiceOptionId,
                singleChoiceElName: singleChoiceElName,
                singleChoiceOptionTextContent: scData.options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = scData.utils.CreateSingleChoiceOption(scOptionData);
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion

    //#region Multiple Choice Properties
    private MultipleChoiceProperties(multipleChoiceElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const multipleChoiceLabelEl = multipleChoiceElement.querySelector(".form-label") as HTMLParagraphElement;
        const multipleChoiceLabelText: string = multipleChoiceLabelEl.textContent;
        const optionsFromMultipleChoice = multipleChoiceElement.querySelector("[data-property-reference]").childNodes as NodeListOf<Node>;

        //#region Multiple Choice Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: multipleChoiceLabelText,
            AriaRoleDesc: "Edit Multiple Choice Question",
            ElementToUpdate: multipleChoiceLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        //#region Multiple Choice Options

        //#region Label Property Element
        const optionsWrapper: HTMLDivElement = this.TextareaLabelProperty("mcOptions", "Multiple Choice Options");
        //#endregion

        //#region Textarea Property Element
        const functionData: MCLUpdateFuncDTO = {
            utils: this._utils,
            multipleChoiceElWrapper: multipleChoiceElement
        }
        const textarea = this.MultiSelectTextAreaProperty(optionsFromMultipleChoice, functionData, this.UpdateMultipleChoiceOptions, "Enter each option on a new line", "optionsTextarea");
        optionsWrapper.appendChild(textarea);

        //#endregion

        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }

    private UpdateMultipleChoiceOptions(mcData: MCLUpdateFuncDTO): void {
        const multipleChoicelEl = mcData.multipleChoiceElWrapper.querySelector("[data-property-reference]") as HTMLDivElement;
        multipleChoicelEl.innerHTML = "";

        const multipleChoicelElNumber: string = multipleChoicelEl.id.substring(14);
        for (let i = 0; i < mcData.options.length; i++) {
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;

            const mcOptionData: MultipleChoiceOptionDTO = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: mcData.options[i],
                multipleChoiceOptionTextContent: mcData.options[i]
            };
            const divSinglChoiceWrapper: HTMLDivElement = mcData.utils.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion

    //#region Date Picker Properties
    private DatePickerProperties(datePickerElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const datePickerLabelEl = datePickerElement.querySelector(".form-label") as HTMLParagraphElement;
        const datePickerLabelText: string = datePickerLabelEl.textContent;

        //#region Date Picker Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Date",
            InputVal: datePickerLabelText,
            AriaRoleDesc: "Edit Date Picker",
            ElementToUpdate: datePickerLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion

    //#region Time Properties
    private TimeProperties(timeElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const timeLabelEl = timeElement.querySelector(".form-label") as HTMLParagraphElement;
        const timeLabelText: string = timeLabelEl.textContent;

        //#region Time Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Time",
            InputVal: timeLabelText,
            AriaRoleDesc: "Edit Time",
            ElementToUpdate: timeLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion

    //#region Number Properties
    private NumberProperties(numberElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const numberLabelEl = numberElement.querySelector(".form-label") as HTMLParagraphElement;
        const numberLabelText: string = numberLabelEl.textContent;

        //#region Number Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "Number",
            InputVal: numberLabelText,
            AriaRoleDesc: "Edit Number",
            ElementToUpdate: numberLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion

    //#region File Upload Properties
    private FileUploadProperties(fileUploadElement: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const fileUploadLabelEl = fileUploadElement.querySelector(".form-label") as HTMLParagraphElement;
        const fileUploadLabelText: string = fileUploadLabelEl.textContent;

        //#region File Upload Label Property
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "File Upload",
            InputVal: fileUploadLabelText,
            AriaRoleDesc: "Edit File Upload",
            ElementToUpdate: fileUploadLabelEl
        }
        const editLabelFieldWrapper: HTMLDivElement = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion

        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion

    //#region Image Properties
    private ImageProperties(imageElementWrapper: HTMLElement): void {
        this.rightDesigner.innerHTML = '';
        const imageEl = imageElementWrapper.querySelector("img") as HTMLImageElement;

        //#region Image Property

        const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(imageEl);

        if (imageEl.classList.contains("added")) {
            const divImagePreview: HTMLDivElement = this.EditImageProperties(imageEl);
            divImagePreview.appendChild(imgSizeInputGroupEl);
            this.rightDesigner.appendChild(divImagePreview);
        }
        else {
            const imagePropertyWrapper: HTMLDivElement = this.UpdateImageProperties(imageEl);
            imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
            this.rightDesigner.appendChild(imagePropertyWrapper);
        }

        //#endregion

    }

    private ImgSizeInputGroup(imageEl: HTMLImageElement): HTMLDivElement {
        const divRow = document.createElement("div") as HTMLDivElement;
        divRow.classList.add("row", "mt-4");

        const imageWidth: HTMLDivElement = this.ImageSizeInput("imgWidth", "Width", "Image Width", imageEl, "width");
        const imageHeight: HTMLDivElement = this.ImageSizeInput("imgHeight", "Height", "Image Height", imageEl, "height");
        divRow.appendChild(imageWidth);
        divRow.appendChild(imageHeight);
        return divRow;
    }

    private ImageSizeInput(id: string, labelText: string, placeholder: string, imageEl: HTMLImageElement, dimensionType: string): HTMLDivElement {
        const divCol = document.createElement("div") as HTMLDivElement;
        divCol.classList.add("col-md-6");

        const label = document.createElement("label") as HTMLLabelElement;
        label.classList.add("form-label");
        label.htmlFor = id;
        label.textContent = labelText;
        divCol.appendChild(label);

        const imageSizeInput = document.createElement("input") as HTMLInputElement;
        imageSizeInput.id = id;
        imageSizeInput.type = "number";
        imageSizeInput.classList.add("form-control");
        imageSizeInput.placeholder = placeholder;
        if (dimensionType === "width")
            imageSizeInput.value = imageEl.naturalWidth.toString();
        else if (dimensionType === "height")
            imageSizeInput.value = imageEl.naturalHeight.toString();
        imageSizeInput.oninput = () => this.UpdateImageSize(imageSizeInput, imageEl, dimensionType);
        divCol.appendChild(imageSizeInput);
        return divCol;
    }

    private UpdateImageSize(sizeInput: HTMLInputElement, targetImageEl: HTMLImageElement, dimensionType: string): void {
        if (dimensionType === "width")
            targetImageEl.width = sizeInput.valueAsNumber;
        else if (dimensionType === "height")
            targetImageEl.height = sizeInput.valueAsNumber;
        else
            return;
    }

    private UpdateImageProperties(imageEl: HTMLImageElement): HTMLDivElement {
        const imagePropertyWrapper = document.createElement("div") as HTMLDivElement;
        imagePropertyWrapper.classList.add("mb-3");

        const imageFieldLabel = document.createElement("label") as HTMLLabelElement;
        imageFieldLabel.htmlFor = "editImage";
        imageFieldLabel.classList.add("form-label");
        imageFieldLabel.textContent = "Image";
        imagePropertyWrapper.appendChild(imageFieldLabel);

        const fileUploadImageInput = document.createElement("input") as HTMLInputElement;
        fileUploadImageInput.id = "editImage";
        fileUploadImageInput.type = "file";
        fileUploadImageInput.classList.add("form-control");
        fileUploadImageInput.multiple = true;
        fileUploadImageInput.onchange = () => this.UpdateImage(fileUploadImageInput, imageEl);
        imagePropertyWrapper.appendChild(fileUploadImageInput);

        return imagePropertyWrapper;
    }

    private EditImageProperties(imageEl: HTMLImageElement): HTMLDivElement {
        const divImagePreview = document.createElement("div") as HTMLDivElement;

        const currentImage = document.createElement("img") as HTMLImageElement;
        currentImage.src = imageEl.src;
        currentImage.classList.add("d-block", "rounded");
        currentImage.style.width = "150px";
        currentImage.style.height = "150px";
        divImagePreview.appendChild(currentImage);

        const btnRemoveImage = document.createElement("button") as HTMLButtonElement;
        btnRemoveImage.classList.add("btn", "btn-danger", "btn-sm", "mt-2");
        btnRemoveImage.textContent = "Remove Image";
        btnRemoveImage.onclick = () => this.RemoveImage(imageEl);
        divImagePreview.appendChild(btnRemoveImage);
        return divImagePreview;
    }

    private UpdateImage(imageInputEl: HTMLInputElement, targetImageEl: HTMLImageElement): void {
        if (imageInputEl.files.length > 0) {
            const file = imageInputEl.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                targetImageEl.src = e.target.result.toString();

                this.rightDesigner.innerHTML = "";
                targetImageEl.classList.add("added");

                const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(targetImageEl);
                const divImagePreview: HTMLDivElement = this.EditImageProperties(targetImageEl);
                divImagePreview.appendChild(imgSizeInputGroupEl);
                this.rightDesigner.appendChild(divImagePreview);
            }
            reader.readAsDataURL(file);
        }
    }

    private RemoveImage(imageEl: HTMLImageElement): void {
        this.rightDesigner.innerHTML = "";
        imageEl.src = "";
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.width = 300;
        imageEl.height = 203;
        imageEl.classList.remove("added");

        const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(imageEl);
        const imagePropertyWrapper: HTMLDivElement = this.UpdateImageProperties(imageEl);
        imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
        this.rightDesigner.appendChild(imagePropertyWrapper);
    }
    //#endregion

    //#region Submit Properties
    private SubmitProperties(submitElementWrapper: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const btnSubmitEl = submitElementWrapper.querySelector("[name=submit]") as HTMLInputElement;
        const btnAllignmentEl = btnSubmitEl.parentElement as HTMLDivElement;
        const submitLabelText: string = btnSubmitEl.value;
        const currentAllignment: string = btnSubmitEl.getAttribute("data-align");

        //#region Time Label Property

        //#region Button Text
        const btnSubmitTextWrapper = document.createElement("div") as HTMLDivElement;
        btnSubmitTextWrapper.classList.add("mb-3");

        const fieldLabel = document.createElement("label") as HTMLLabelElement;
        fieldLabel.htmlFor = "editBtnSubmit";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "Button Text";

        const fieldInput = document.createElement("input") as HTMLInputElement;
        fieldInput.id = "editBtnSubmit";
        fieldInput.classList.add("form-control");
        fieldInput.type = "text";
        fieldInput.placeholder = "Submit";
        fieldInput.value = submitLabelText;
        fieldInput.ariaRoleDescription = "Edit Submit Text";
        fieldInput.oninput = (ev: InputEvent) => { btnSubmitEl.value = fieldInput.value; };

        btnSubmitTextWrapper.appendChild(fieldLabel);
        btnSubmitTextWrapper.appendChild(fieldInput);
        //#endregion

        //#region Button Allignment
        const allignmentWrapper = document.createElement("div") as HTMLDivElement;
        allignmentWrapper.classList.add("mb-3");

        const allignmentLabel = document.createElement("label") as HTMLLabelElement;
        allignmentLabel.htmlFor = "editAllignment";
        allignmentLabel.classList.add("form-label");
        allignmentLabel.textContent = "Button Allignment";
        allignmentWrapper.appendChild(allignmentLabel);

        const divAllignmentGroup = document.createElement("div") as HTMLDivElement;
        divAllignmentGroup.setAttribute("role", "group");
        divAllignmentGroup.classList.add("btn-group");
        divAllignmentGroup.ariaLabel = "allignment toggle button group"
        divAllignmentGroup.style.width = "100%";
        allignmentWrapper.appendChild(divAllignmentGroup);

        //#region Left Option
        const allignLeftInput = document.createElement("input") as HTMLInputElement;
        allignLeftInput.type = "radio";
        allignLeftInput.classList.add("btn-check");
        allignLeftInput.name = "btnAllign";
        allignLeftInput.id = "btnAllignLeft";
        allignLeftInput.autocomplete = "off";
        allignLeftInput.oninput = () => this.AdjustButtonAllignment(btnSubmitEl, btnAllignmentEl, "left");

        const allignLeftLabel = document.createElement("label") as HTMLLabelElement;
        allignLeftLabel.classList.add("btn", "btn-outline-primary");
        allignLeftLabel.htmlFor = "btnAllignLeft";
        allignLeftLabel.textContent = "LEFT";

        divAllignmentGroup.appendChild(allignLeftInput);
        divAllignmentGroup.appendChild(allignLeftLabel);
        //#endregion
        //#region Center Option
        const allignCenterInput = document.createElement("input") as HTMLInputElement;
        allignCenterInput.type = "radio";
        allignCenterInput.classList.add("btn-check");
        allignCenterInput.name = "btnAllign";
        allignCenterInput.id = "btnAllignCenter";
        allignCenterInput.autocomplete = "off";
        allignCenterInput.oninput = () => this.AdjustButtonAllignment(btnSubmitEl, btnAllignmentEl, "center");

        const allignCenterLabel = document.createElement("label") as HTMLLabelElement;
        allignCenterLabel.classList.add("btn", "btn-outline-primary");
        allignCenterLabel.htmlFor = "btnAllignCenter";
        allignCenterLabel.textContent = "CENTER";

        divAllignmentGroup.appendChild(allignCenterInput);
        divAllignmentGroup.appendChild(allignCenterLabel);
        //#endregion
        //#region Right Option
        const allignRightInput = document.createElement("input") as HTMLInputElement;
        allignRightInput.type = "radio";
        allignRightInput.classList.add("btn-check");
        allignRightInput.name = "btnAllign";
        allignRightInput.id = "btnAllignRight";
        allignRightInput.autocomplete = "off";
        allignRightInput.oninput = () => this.AdjustButtonAllignment(btnSubmitEl, btnAllignmentEl, "right");

        const allignRightLabel = document.createElement("label") as HTMLLabelElement;
        allignRightLabel.classList.add("btn", "btn-outline-primary");
        allignRightLabel.htmlFor = "btnAllignRight";
        allignRightLabel.textContent = "RIGHT";

        divAllignmentGroup.appendChild(allignRightInput);
        divAllignmentGroup.appendChild(allignRightLabel);
        //#endregion

        if (currentAllignment === "left")
            allignLeftInput.checked = true;
        else if (currentAllignment === "center")
            allignCenterInput.checked = true;
        else if (currentAllignment === "right")
            allignRightInput.checked = true;

        //#endregion

        //#endregion

        this.rightDesigner.appendChild(btnSubmitTextWrapper);
        this.rightDesigner.appendChild(allignmentWrapper);
    }

    private AdjustButtonAllignment(btnSubmitEl: HTMLElement, btnAllignmentEl: HTMLDivElement, allignment: string): void {
        if (allignment === "left") {
            btnSubmitEl.setAttribute("data-align", "left");
            btnAllignmentEl.className = "text-start";
        }
        else if (allignment === "center") {
            btnSubmitEl.setAttribute("data-align", "center");
            btnAllignmentEl.className = "text-center"
        }
        else if (allignment === "right") {
            btnSubmitEl.setAttribute("data-align", "right");
            btnAllignmentEl.className = "text-end"
        }
    }
    //#endregion

    //#region Table Properties
    private TableProperties(TableElementWrapper: HTMLElement): void {
        this.rightDesigner.innerHTML = '';

        const tableEl = TableElementWrapper.querySelector("[name=table]") as HTMLTableElement;
        const labelEl = TableElementWrapper.querySelector("label") as HTMLLabelElement;

        const tableLabelText: string = labelEl.textContent;
        const currentInputType: string = tableEl.getAttribute("data-input-type");

        //#region current rows/columns
        const tableRows = tableEl.querySelector("thead").childNodes[0].childNodes as NodeListOf<Node>;
        const tableColumns = tableEl.querySelector("tbody").childNodes as NodeListOf<Node>;

        //#region Table Label
        const TableTextWrapper = document.createElement("div") as HTMLDivElement;
        TableTextWrapper.classList.add("mb-3");

        const fieldLabel = document.createElement("label") as HTMLLabelElement;
        fieldLabel.htmlFor = "editLabel";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "";

        const fieldInput = document.createElement("input") as HTMLInputElement;
        fieldInput.id = "editLabel";
        fieldInput.classList.add("form-control");
        fieldInput.type = "text";
        fieldInput.placeholder = "type a question";
        fieldInput.value = tableLabelText;
        fieldInput.ariaRoleDescription = "Edit Table Label";
        fieldInput.oninput = (ev: InputEvent) => { labelEl.textContent = fieldInput.value; };

        TableTextWrapper.appendChild(fieldLabel);
        TableTextWrapper.appendChild(fieldInput);
        //#endregion

        //#region Button Group
        const inputGroupWrapper = document.createElement("div") as HTMLDivElement;
        inputGroupWrapper.classList.add("mb-3");

        const allignmentLabel = document.createElement("label") as HTMLLabelElement;
        allignmentLabel.htmlFor = "editAllignment";
        allignmentLabel.classList.add("form-label");
        allignmentLabel.textContent = "Input Type";
        inputGroupWrapper.appendChild(allignmentLabel);

        const divAllignmentGroup = document.createElement("div") as HTMLDivElement;
        divAllignmentGroup.setAttribute("role", "group");
        divAllignmentGroup.classList.add("btn-group", "flex-wrap", "btn-group-sm");
        divAllignmentGroup.ariaLabel = "table input type"
        divAllignmentGroup.style.width = "100%";
        inputGroupWrapper.appendChild(divAllignmentGroup);

        //#region Single Choice Option
        const inputSingleChoice = document.createElement("input") as HTMLInputElement;
        inputSingleChoice.type = "radio";
        inputSingleChoice.classList.add("btn-check");
        inputSingleChoice.name = "tableInputType";
        inputSingleChoice.id = "inputSingleChoice";
        inputSingleChoice.autocomplete = "off";
        inputSingleChoice.oninput = () => this.ChangeInputType(tableEl, "SingleChoice");

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("btn", "btn-outline-primary");
        singleChoiceLabel.htmlFor = "inputSingleChoice";
        singleChoiceLabel.textContent = "Radio Buttons";

        divAllignmentGroup.appendChild(inputSingleChoice);
        divAllignmentGroup.appendChild(singleChoiceLabel);
        //#endregion

        //#region Multiple Choice Option
        const inputMultipleChoice = document.createElement("input") as HTMLInputElement;
        inputMultipleChoice.type = "radio";
        inputMultipleChoice.classList.add("btn-check");
        inputMultipleChoice.name = "tableInputType";
        inputMultipleChoice.id = "inputMultipleChoice";
        inputMultipleChoice.autocomplete = "off";
        inputMultipleChoice.oninput = () => this.ChangeInputType(tableEl, "MultipleChoice");

        const multipleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        multipleChoiceLabel.classList.add("btn", "btn-outline-primary");
        multipleChoiceLabel.htmlFor = "inputMultipleChoice";
        multipleChoiceLabel.textContent = "Checkbox Buttons";

        divAllignmentGroup.appendChild(inputMultipleChoice);
        divAllignmentGroup.appendChild(multipleChoiceLabel);
        //#endregion

        //#region Dropdown Option
        const inputDdl = document.createElement("input") as HTMLInputElement;
        inputDdl.type = "radio";
        inputDdl.classList.add("btn-check");
        inputDdl.name = "tableInputType";
        inputDdl.id = "inputDdl";
        inputDdl.autocomplete = "off";
        inputDdl.oninput = () => this.ChangeInputType(tableEl, "Dropdown");

        const inputDdlLabel = document.createElement("label") as HTMLLabelElement;
        inputDdlLabel.classList.add("btn", "btn-outline-primary");
        inputDdlLabel.htmlFor = "inputDdl";
        inputDdlLabel.textContent = "Dropdown";

        divAllignmentGroup.appendChild(inputDdl);
        divAllignmentGroup.appendChild(inputDdlLabel);
        //#endregion

        //#region Textbox Option
        const inputTxtbox = document.createElement("input") as HTMLInputElement;
        inputTxtbox.type = "radio";
        inputTxtbox.classList.add("btn-check");
        inputTxtbox.name = "tableInputType";
        inputTxtbox.id = "inputTxtbox";
        inputTxtbox.autocomplete = "off";
        inputTxtbox.oninput = () => this.ChangeInputType(tableEl, "Textbox");

        const inputTxtboxLabel = document.createElement("label") as HTMLLabelElement;
        inputTxtboxLabel.classList.add("btn", "btn-outline-primary");
        inputTxtboxLabel.htmlFor = "inputTxtbox";
        inputTxtboxLabel.textContent = "Textbox";

        divAllignmentGroup.appendChild(inputTxtbox);
        divAllignmentGroup.appendChild(inputTxtboxLabel);
        //#endregion

        //#region Numeric Option
        const inputNumeric = document.createElement("input") as HTMLInputElement;
        inputNumeric.type = "radio";
        inputNumeric.classList.add("btn-check");
        inputNumeric.name = "tableInputType";
        inputNumeric.id = "inputNumeric";
        inputNumeric.autocomplete = "off";
        inputNumeric.oninput = () => this.ChangeInputType(tableEl, "Numeric");

        const inputNumericLabel = document.createElement("label") as HTMLLabelElement;
        inputNumericLabel.classList.add("btn", "btn-outline-primary");
        inputNumericLabel.htmlFor = "inputNumeric";
        inputNumericLabel.textContent = "Numeric";

        divAllignmentGroup.appendChild(inputNumeric);
        divAllignmentGroup.appendChild(inputNumericLabel);
        //#endregion

        //#region Multi-Type Option
        const inputMultiType = document.createElement("input") as HTMLInputElement;
        inputMultiType.type = "radio";
        inputMultiType.classList.add("btn-check");
        inputMultiType.name = "tableInputType";
        inputMultiType.id = "inputMultiType";
        inputMultiType.autocomplete = "off";
        inputMultiType.oninput = () => this.ChangeInputType(tableEl, "MultiType");

        const inputMultiTypeLabel = document.createElement("label") as HTMLLabelElement;
        inputMultiTypeLabel.classList.add("btn", "btn-outline-primary");
        inputMultiTypeLabel.htmlFor = "inputMultiType";
        inputMultiTypeLabel.textContent = "Multi-Type";

        divAllignmentGroup.appendChild(inputMultiType);
        divAllignmentGroup.appendChild(inputMultiTypeLabel);
        //#endregion

        if (currentInputType === "SingleChoice")
            inputSingleChoice.checked = true;
        else if (currentInputType === "MultipleChoice")
            inputMultipleChoice.checked = true;
        else if (currentInputType === "Dropdown")
            inputDdl.checked = true;
        else if (currentInputType === "Textbox")
            inputTxtbox.checked = true;
        else if (currentInputType === "Numeric")
            inputNumeric.checked = true;
        else if (currentInputType === "MultiType")
            inputMultiType.checked = true;

        //#endregion

        //#region rows/columns

        //#region Rows Textarea Property Element
        const rowsWrapper: HTMLDivElement = this.TextareaLabelProperty("rows", "Rows");
        const rowsFunctionData: TableUpdateFuncDTO = {
            utils: this._utils,
            elementToUpdate: tableEl,
            getOptionsFromTextarea: this.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs
        }
        const rowsTextarea = this.TableElTextarea(tableEl, tableRows, rowsFunctionData, this.UpdateTableRows, "Enter row labels for table element", "rowsTextarea");
        rowsWrapper.appendChild(rowsTextarea);
        //#endregion

        //#region Columns Textarea Property Element
        const columnsWrapper: HTMLDivElement = this.TextareaLabelProperty("columns", "Columns");
        const columnsFunctionData: TableUpdateFuncDTO = {
            utils: this._utils,
            elementToUpdate: tableEl,
            getOptionsFromTextarea: this.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs
        }
        const columnsTextarea = this.TableElTextarea(tableEl, tableColumns, columnsFunctionData, this.UpdateTableColumns, "Enter column labels for table element", "columnsTextarea");
        columnsWrapper.appendChild(columnsTextarea);
        //#endregion

        //#region Dropdown Options Textarea Property Element
        const ddlTextareaWrapper: HTMLDivElement = this.TextareaLabelProperty("tableDdlOptions", "Dropdown Options");
        const ddlFunctionData: TableUpdateDDLDTO = {
            utils: this._utils,
            elementToUpdate: tableEl,
            getOptionsFromTextarea: this.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs,
        }
        const ddlOptionsTextarea: HTMLDivElement = this.TableElTextarea(tableEl, tableColumns, ddlFunctionData, this.UpdateTableColumns, "Enter dropdown options", "ddlOptions");
        ddlTextareaWrapper.appendChild(ddlOptionsTextarea);

        if (currentInputType === "Dropdown") {
            ddlTextareaWrapper.style.display = "block";
        }
        else {
            ddlTextareaWrapper.style.display = "none";
        }
        //#endregion
        //#endregion

        //#endregion

        this.rightDesigner.appendChild(TableTextWrapper);
        this.rightDesigner.appendChild(inputGroupWrapper);
        this.rightDesigner.appendChild(rowsWrapper);
        this.rightDesigner.appendChild(columnsWrapper);
        this.rightDesigner.appendChild(ddlTextareaWrapper);
    }

    private ChangeInputType(tableEl: HTMLElement, inputType: string): void {
        const optionsTextarea: HTMLTextAreaElement = document.querySelector("#tableDdlOptions");
        if (inputType === "Dropdown") {
            optionsTextarea.style.display = "block"
        }
        else {
            optionsTextarea.style.display = "none"
        }

        if (inputType === "SingleChoice") {
            tableEl.setAttribute("data-input-type", "SingleChoice");
        }
        else if (inputType === "MultipleChoice") {
            tableEl.setAttribute("data-input-type", "MultipleChoice");
        }
        else if (inputType === "Dropdown") {
            tableEl.setAttribute("data-input-type", "Dropdown");
        }
        else if (inputType === "Textbox") {
            tableEl.setAttribute("data-input-type", "Textbox");
        }
        else if (inputType === "Numeric") {
            tableEl.setAttribute("data-input-type", "Numeric");
        }
        else if (inputType === "MultiType") {
            tableEl.setAttribute("data-input-type", "MultiType");
        }

        const rowsTextarea = document.querySelector("#rowsTextarea") as HTMLTextAreaElement;
        const options: string[] = this.GetOptionsFromTextarea(rowsTextarea);

        const tableTypeData: TableUpdateFuncDTO = {
            utils: this._utils,
            elementToUpdate: tableEl,
            getOptionsFromTextarea: this.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs,
            options: options
        };

        this.UpdateTableRows(tableTypeData);
    }

    private UpdateTableRows(properties: TableUpdateFuncDTO): void {
        const inputType: string = properties.elementToUpdate.getAttribute("data-input-type");
        const thead = properties.elementToUpdate.querySelector("thead") as HTMLTableSectionElement;
        thead.innerHTML = "";

        const trHeaderRow = document.createElement("tr") as HTMLTableRowElement;
        thead.appendChild(trHeaderRow);

        properties.options.forEach((col) => {
            const th = properties.utils.CreateTableHeader(col);
            trHeaderRow.appendChild(th);
        });

        const tbody = properties.elementToUpdate.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";

        const columnsTextarea = document.querySelector("#columnsTextarea") as HTMLTextAreaElement;

        const rowsFromElement: string[] = properties.getOptionsFromTextarea(columnsTextarea);
        const slicedTblHeaderData = properties.options.slice(1);

        properties.updateTableInputs(rowsFromElement, tbody, slicedTblHeaderData, inputType, properties.utils, properties.getOptionsFromTextarea);
    }

    private UpdateTableColumns(properties: TableUpdateFuncDTO): void {
        const inputType: string = properties.elementToUpdate.getAttribute("data-input-type");
        const tbody = properties.elementToUpdate.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";

        const rowsTextarea = document.querySelector("#rowsTextarea") as HTMLTextAreaElement;
        const rowsFromElement: string[] = properties.getOptionsFromTextarea(rowsTextarea);
        const slicedTblHeaderData = rowsFromElement.slice(1);
        properties.updateTableInputs(properties.options, tbody, slicedTblHeaderData, inputType, properties.utils, properties.getOptionsFromTextarea);
    }

    private UpdateTableInputs(options: string[], tbody: HTMLTableSectionElement, slicedTblHeaderData: string[], inputType: string, utils: Utilities, getOptionsFromTextarea: Function) {
        options.forEach((col) => {
            const tr = document.createElement("tr") as HTMLTableRowElement;
            tbody.appendChild(tr);

            const th = document.createElement("th") as HTMLTableHeaderCellElement;
            th.scope = "row";
            th.textContent = col;
            tr.appendChild(th);

            console.log(slicedTblHeaderData);
            for (let i = 0; i < slicedTblHeaderData.length; i++) {
                switch (inputType) {
                    case "SingleChoice":
                        const singleChoiceData: SingleChoiceOptionDTO = {
                            singleChoiceOptionId: "scOption" + i,
                            singleChoiceElName: col,
                            singleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const scOptionData = utils.CreateTableSingleChoiceOption(singleChoiceData);
                        tr.appendChild(scOptionData);
                        break;

                    case "MultipleChoice":
                        const name: string = col.split(" ").join("_");
                        const data: MultipleChoiceOptionDTO = {
                            multipleChoiceOptionId: `${name}_${i}`,
                            multipleChoiceElName: `${name}_${i}`,
                            multipleChoiceOptionValue: slicedTblHeaderData[i],
                            multipleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const mcOptionData = utils.CreateTableMultipleChoiceOption(data);
                        tr.appendChild(mcOptionData);
                        break;

                    case "Dropdown":
                        const tableDdlOptions = document.querySelector("#ddlOptions") as HTMLTextAreaElement;
                        const optionData: string[] = getOptionsFromTextarea(tableDdlOptions);

                        const ddlName: string = col.split(" ").join("_");
                        const ddlData: TableDDLOptionDTO = {
                            ddlOptionId: `${ddlName}_${i}`,
                            ddlName: `${ddlName}_${i}`,
                            ddlOption: optionData
                        };
                        const ddlOptionData = utils.CreateTableDropdown(ddlData);
                        tr.appendChild(ddlOptionData);
                        break;

                    case "Textbox":
                        const textboxName: string = col.split(" ").join("_");
                        const textboxData: TxtOptionDTO = {
                            txtOptionId: `${textboxName}`,
                            txtName: `${textboxName}_${i}`
                        };
                        const txtOptionData = utils.CreateTableTextbox(textboxData);
                        tr.appendChild(txtOptionData);
                        break;

                    case "Numeric":
                        const numericName: string = col.split(" ").join("_");
                        const numericData: NumericOptionDTO = {
                            numericOptionId: `${numericName}`,
                            numericName: `${numericName}_${i}`
                        };
                        const numericOptionData = utils.CreateTableNumeric(numericData);
                        tr.appendChild(numericOptionData);
                        break;
                };
            }
        });
    }

    private TableElTextarea(targetEl: HTMLElement, optionsFromEl: NodeListOf<Node>, updateFuncData: any, updateFunc: Function, labelText: string, textareaId: string): HTMLDivElement {
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = textareaId;
        textarea.classList.add("form-control");
        textarea.placeholder = labelText;
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = textareaId;
        textareaLabel.textContent = labelText;

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        switch (targetEl.getAttribute("data-input-type")) {
            case "SingleChoice":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "MultipleChoice":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "Dropdown":
                switch (textarea.id) {
                    case "ddlOptions":
                        const ddlOptions = targetEl.querySelector("select").childNodes as NodeListOf<Node>;
                        ddlOptions.forEach((option) => {
                            optionsFromElement.push(option.textContent);
                        });
                        break
                    case "columnsTextarea":
                        console.log(optionsFromEl);
                        optionsFromEl.forEach((option) => {
                            optionsFromElement.push(option.firstChild.textContent);
                        });
                        break;
                    case "rowsTextarea":
                        optionsFromEl.forEach((option) => {
                            optionsFromElement.push(option.firstChild.textContent);
                        });
                        break;
                };
                break;

            case "Textbox":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "Numeric":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "MultiType":
                break;
        }
        console.log(optionsFromElement);
        this.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            let options: string[] = [];
            const ddlOptions = document.querySelector("#ddlOptions") as HTMLTextAreaElement;
            if (textarea === ddlOptions) {
                const columnsTextarea = document.querySelector("#columnsTextarea") as HTMLTextAreaElement;
                options = this.GetOptionsFromTextarea(columnsTextarea);
            }
            else {
                options = this.GetOptionsFromTextarea(textarea);
            }
            updateFuncData.options = options;
            updateFunc(updateFuncData);
        };

        return divTextarea;
    }

    //#endregion

    //#endregion

    //#region Complex Properties
    private HeadingProperties(headingElement: HTMLElement) {
        this.rightDesigner.innerHTML = '';
        this.rightDesigner.innerHTML = `
                    <div class="mb-3">
                        <label for="txtHeading" class="form-label">Heading Texts</label>
                        <input type="text" class="form-control" id="txtHeading" data-reference aria-describedby="Heading Text">
                    </div>
                    <div class="mb-3">
                        <label for="txtSubHeading" class="form-label">Subheading Text</label>
                        <input type="text" class="form-control" id="txtSubHeading">
                    </div>`;

    }

    private FullNameProperties(headingElement: HTMLElement) {
    }
    //#endregion
}