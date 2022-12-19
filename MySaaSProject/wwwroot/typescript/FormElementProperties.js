/// <reference types="./FormBuilder" />
/// <reference path="./Utilities.ts" />
class FormElementProperties {
    constructor() {
        this.rightDesigner = document.querySelector('#rightDesigner');
        this._utils = new Utilities();
        //#endregion
    }
    Init(tinymce) {
        this._tinymce = tinymce;
    }
    GetElementProperties(elementType, element, callback) {
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
    FieldLabelProperty(data) {
        const fieldLabelWrapper = document.createElement("div");
        fieldLabelWrapper.classList.add("mb-3");
        const fieldLabel = document.createElement("label");
        fieldLabel.htmlFor = "editField";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "Field Label";
        const fieldLabelInput = document.createElement("input");
        fieldLabelInput.id = "editField";
        fieldLabelInput.classList.add("form-control");
        fieldLabelInput.type = "text";
        fieldLabelInput.placeholder = data.PlaceHolder;
        fieldLabelInput.value = data.InputVal;
        fieldLabelInput.ariaRoleDescription = data.AriaRoleDesc;
        fieldLabelInput.oninput = (ev) => { data.ElementToUpdate.textContent = fieldLabelInput.value; };
        fieldLabelWrapper.appendChild(fieldLabel);
        fieldLabelWrapper.appendChild(fieldLabelInput);
        return fieldLabelWrapper;
    }
    TextareaLabelProperty(wrapperId, textVal) {
        const optionsWrapper = document.createElement("div");
        optionsWrapper.id = wrapperId;
        optionsWrapper.classList.add("mb-3", "pt-3");
        const optionsLabel = document.createElement("label");
        optionsLabel.classList.add("form-label");
        optionsLabel.htmlFor = "txtAreaOptions";
        optionsLabel.textContent = textVal;
        optionsWrapper.appendChild(optionsLabel);
        return optionsWrapper;
    }
    MultiSelectTextAreaProperty(optionsFromMultiSelectEl, elementToUpdate, updateFunc) {
        const divTextarea = document.createElement("div");
        divTextarea.classList.add("form-floating");
        const textarea = document.createElement("textarea");
        textarea.id = "txtAreaOptions";
        textarea.classList.add("form-control");
        textarea.placeholder = "Enter each option on a new line";
        textarea.style.height = "100px";
        const textareaLabel = document.createElement("label");
        textareaLabel.htmlFor = "txtAreaOptions";
        textareaLabel.textContent = "Enter each option on a new line";
        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);
        let optionsFromElement = [];
        optionsFromMultiSelectEl.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            optionsFromElement.push(option.textContent);
        });
        this.UpdateTextAreaOptions(textarea, optionsFromElement);
        textarea.oninput = (ev) => {
            const options = this.GetOptionsFromTextarea(textarea);
            updateFunc(this._utils, elementToUpdate, options);
        };
        return divTextarea;
    }
    UpdateTextAreaOptions(textarea, options) {
        //add options to textarea
        if (options !== null && options !== undefined) {
            textarea.value = options.join('\n');
        }
    }
    GetOptionsFromTextarea(textarea) {
        //split data into array
        const options = textarea.value.split(/[\n,]+/);
        return options;
    }
    //#endregion
    //#region Basic Properties
    //#region Paragraph Properties
    ParagraphProperties(paragraphElement, callback) {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]");
        const currentText = elementToUpdateText.textContent;
        this.rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea');
        textArea.id = 'paragraph-editor';
        this.rightDesigner.appendChild(textArea);
        //this._tinymce.activeEditor.setContent("this is a test");
        //delay to init tinymce
        setTimeout(() => {
            const utils = new Utilities();
            utils.InitTinyMCE(this._tinymce, 'textarea#paragraph-editor');
            setTimeout(() => {
                this._tinymce.activeEditor.setContent(currentText);
                utils.AddTinymceListeners(this._tinymce, elementToUpdateText, callback);
            }, 1000);
        }, 0.0001);
    }
    //#endregion
    //#region Dropdown Properties
    DropdownProperties(dropdownElement) {
        this.rightDesigner.innerHTML = '';
        const dropdownLabelEl = dropdownElement.querySelector(".form-label");
        const dropdownLabelText = dropdownLabelEl.textContent;
        const optionsFromDropdown = dropdownElement.querySelector("[data-property-reference]").childNodes;
        //#region Dropdown Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Dropdown Question",
            ElementToUpdate: dropdownLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Dropdown Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("ddlOptions", "Dropdown Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromDropdown, dropdownElement, this.UpdateDropdownOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateDropdownOptions(utils, dropdownElWrapper, options) {
        const ddlEl = dropdownElWrapper.querySelector("[data-property-reference]");
        const currentDropdownOptions = ddlEl.querySelectorAll("option");
        currentDropdownOptions.forEach((option) => {
            if (option.textContent === "Select an option")
                return;
            option.remove();
        });
        for (let i = 0; i < options.length; i++) {
            const ddlOptionData = { dropdownValue: options[i], dropdownTextContent: options[i] };
            const newOption = utils.CreateDropdownOption(ddlOptionData);
            ddlEl.appendChild(newOption);
        }
    }
    //#endregion
    //#region Single Choice Properties
    SingleChoiceProperties(singleChoiceElement) {
        this.rightDesigner.innerHTML = '';
        const singleChoiceLabelEl = singleChoiceElement.querySelector(".form-label");
        const dropdownLabelText = singleChoiceLabelEl.textContent;
        const optionsFromSingleChoice = singleChoiceElement.querySelector("[data-property-reference]").childNodes;
        //#region Single Choice Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: dropdownLabelText,
            AriaRoleDesc: "Edit Single Choice Question",
            ElementToUpdate: singleChoiceLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Single Choice Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("scOptions", "Single Choice Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromSingleChoice, singleChoiceElement, this.UpdateSingleChoiceOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateSingleChoiceOptions(utils, singlchoiceElWrapper, options) {
        const singleChoicelEl = singlchoiceElWrapper.querySelector("[data-property-reference]");
        singleChoicelEl.innerHTML = "";
        const singleChoicelElNumber = singleChoicelEl.id.substring(12);
        const singleChoiceElName = `${singleChoicelEl.getAttribute("name")}Q${singleChoicelElNumber}`;
        for (let i = 0; i < options.length; i++) {
            const singleChoiceOptionNum = i + 1;
            const singleChoiceOptionId = `single_choice_${singleChoicelElNumber}_option_${singleChoiceOptionNum}`;
            const scOptionData = {
                singleChoiceOptionId: singleChoiceOptionId,
                singleChoiceElName: singleChoiceElName,
                singleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper = utils.CreateSingleChoiceOption(scOptionData);
            singleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion
    //#region Multiple Choice Properties
    MultipleChoiceProperties(multipleChoiceElement) {
        this.rightDesigner.innerHTML = '';
        const multipleChoiceLabelEl = multipleChoiceElement.querySelector(".form-label");
        const multipleChoiceLabelText = multipleChoiceLabelEl.textContent;
        const optionsFromMultipleChoice = multipleChoiceElement.querySelector("[data-property-reference]").childNodes;
        //#region Multiple Choice Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "type a question",
            InputVal: multipleChoiceLabelText,
            AriaRoleDesc: "Edit Multiple Choice Question",
            ElementToUpdate: multipleChoiceLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        //#region Multiple Choice Options
        //#region Label Property Element
        const optionsWrapper = this.TextareaLabelProperty("mcOptions", "Multiple Choice Options");
        //#endregion
        //#region Textarea Property Element
        const textarea = this.MultiSelectTextAreaProperty(optionsFromMultipleChoice, multipleChoiceElement, this.UpdateMultipleChoiceOptions);
        optionsWrapper.appendChild(textarea);
        //#endregion
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
        this.rightDesigner.appendChild(optionsWrapper);
    }
    UpdateMultipleChoiceOptions(utils, multipleChoiceElWrapper, options) {
        const multipleChoicelEl = multipleChoiceElWrapper.querySelector("[data-property-reference]");
        multipleChoicelEl.innerHTML = "";
        const multipleChoicelElNumber = multipleChoicelEl.id.substring(14);
        for (let i = 0; i < options.length; i++) {
            const multipleChoiceOptionNum = i;
            const multipleChoiceOptionId = `multiple_choice_${multipleChoicelElNumber}_option_${multipleChoiceOptionNum}`;
            const mcOptionData = {
                multipleChoiceOptionId: multipleChoiceOptionId,
                multipleChoiceElName: multipleChoiceOptionId,
                multipleChoiceOptionValue: options[i],
                multipleChoiceOptionTextContent: options[i]
            };
            const divSinglChoiceWrapper = utils.CreateMultipleChoiceOption(mcOptionData);
            multipleChoicelEl.appendChild(divSinglChoiceWrapper);
        }
    }
    //#endregion
    //#region Date Picker Properties
    DatePickerProperties(datePickerElement) {
        this.rightDesigner.innerHTML = '';
        const datePickerLabelEl = datePickerElement.querySelector(".form-label");
        const datePickerLabelText = datePickerLabelEl.textContent;
        //#region Date Picker Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "Date",
            InputVal: datePickerLabelText,
            AriaRoleDesc: "Edit Date Picker",
            ElementToUpdate: datePickerLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion
    //#region Time Properties
    TimeProperties(timeElement) {
        this.rightDesigner.innerHTML = '';
        const timeLabelEl = timeElement.querySelector(".form-label");
        const timeLabelText = timeLabelEl.textContent;
        //#region Time Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "Time",
            InputVal: timeLabelText,
            AriaRoleDesc: "Edit Time",
            ElementToUpdate: timeLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion
    //#region Number Properties
    NumberProperties(numberElement) {
        this.rightDesigner.innerHTML = '';
        const numberLabelEl = numberElement.querySelector(".form-label");
        const numberLabelText = numberLabelEl.textContent;
        //#region Number Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "Number",
            InputVal: numberLabelText,
            AriaRoleDesc: "Edit Number",
            ElementToUpdate: numberLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion
    //#region File Upload Properties
    FileUploadProperties(fileUploadElement) {
        this.rightDesigner.innerHTML = '';
        const fileUploadLabelEl = fileUploadElement.querySelector(".form-label");
        const fileUploadLabelText = fileUploadLabelEl.textContent;
        //#region File Upload Label Property
        const fieldLabelPropertyData = {
            PlaceHolder: "File Upload",
            InputVal: fileUploadLabelText,
            AriaRoleDesc: "Edit File Upload",
            ElementToUpdate: fileUploadLabelEl
        };
        const editLabelFieldWrapper = this.FieldLabelProperty(fieldLabelPropertyData);
        //#endregion
        this.rightDesigner.appendChild(editLabelFieldWrapper);
    }
    //#endregion
    //#region File Upload Properties
    ImageProperties(imageElementWrapper) {
        this.rightDesigner.innerHTML = '';
        const imageEl = imageElementWrapper.querySelector("img");
        //#region Image Property
        const imgSizeInputGroupEl = this.ImgSizeInputGroup(imageEl);
        if (imageEl.classList.contains("added")) {
            const divImagePreview = this.EditImageProperties(imageEl);
            divImagePreview.appendChild(imgSizeInputGroupEl);
            this.rightDesigner.appendChild(divImagePreview);
        }
        else {
            const imagePropertyWrapper = this.UpdateImageProperties(imageEl);
            imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
            this.rightDesigner.appendChild(imagePropertyWrapper);
        }
        //#endregion
    }
    ImgSizeInputGroup(imageEl) {
        const divRow = document.createElement("div");
        divRow.classList.add("row", "mt-4");
        const imageWidth = this.ImageSizeInput("imgWidth", "Width", "Image Width", imageEl, "width");
        const imageHeight = this.ImageSizeInput("imgHeight", "Height", "Image Height", imageEl, "height");
        divRow.appendChild(imageWidth);
        divRow.appendChild(imageHeight);
        return divRow;
    }
    ImageSizeInput(id, labelText, placeholder, imageEl, dimensionType) {
        const divCol = document.createElement("div");
        divCol.classList.add("col-md-6");
        const label = document.createElement("label");
        label.classList.add("form-label");
        label.htmlFor = id;
        label.textContent = labelText;
        divCol.appendChild(label);
        const imageSizeInput = document.createElement("input");
        imageSizeInput.id = id;
        imageSizeInput.type = "number";
        imageSizeInput.classList.add("form-control");
        imageSizeInput.placeholder = placeholder;
        imageSizeInput.value = imageEl.width.toString();
        imageSizeInput.oninput = () => this.UpdateImageSize(imageSizeInput, imageEl, dimensionType);
        divCol.appendChild(imageSizeInput);
        return divCol;
    }
    UpdateImageSize(sizeInput, targetImageEl, dimensionType) {
        if (dimensionType === "width")
            targetImageEl.width = sizeInput.valueAsNumber;
        else if (dimensionType === "height")
            targetImageEl.height = sizeInput.valueAsNumber;
        else
            return;
    }
    UpdateImageProperties(imageEl) {
        const imagePropertyWrapper = document.createElement("div");
        imagePropertyWrapper.classList.add("mb-3");
        const imageFieldLabel = document.createElement("label");
        imageFieldLabel.htmlFor = "editImage";
        imageFieldLabel.classList.add("form-label");
        imageFieldLabel.textContent = "Image";
        imagePropertyWrapper.appendChild(imageFieldLabel);
        const fileUploadImageInput = document.createElement("input");
        fileUploadImageInput.id = "editImage";
        fileUploadImageInput.type = "file";
        fileUploadImageInput.classList.add("form-control");
        fileUploadImageInput.multiple = true;
        fileUploadImageInput.onchange = () => this.UpdateImage(fileUploadImageInput, imageEl);
        imagePropertyWrapper.appendChild(fileUploadImageInput);
        return imagePropertyWrapper;
    }
    EditImageProperties(imageEl) {
        const divImagePreview = document.createElement("div");
        const currentImage = document.createElement("img");
        currentImage.src = imageEl.src;
        currentImage.classList.add("mx-auto", "d-block", "rounded");
        currentImage.style.width = "350px";
        currentImage.style.height = "350px";
        divImagePreview.appendChild(currentImage);
        const btnRemoveImage = document.createElement("button");
        btnRemoveImage.classList.add("btn", "btn-danger", "btn-sm", "mt-2");
        btnRemoveImage.textContent = "Remove Image";
        btnRemoveImage.onclick = () => this.RemoveImage(imageEl);
        divImagePreview.appendChild(btnRemoveImage);
        return divImagePreview;
    }
    UpdateImage(imageInputEl, targetImageEl) {
        if (imageInputEl.files.length > 0) {
            const file = imageInputEl.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                targetImageEl.src = e.target.result.toString();
                this.rightDesigner.innerHTML = "";
                targetImageEl.classList.add("added");
                const imgSizeInputGroupEl = this.ImgSizeInputGroup(targetImageEl);
                const divImagePreview = this.EditImageProperties(targetImageEl);
                divImagePreview.appendChild(imgSizeInputGroupEl);
                this.rightDesigner.appendChild(divImagePreview);
            };
            reader.readAsDataURL(file);
        }
    }
    RemoveImage(imageEl) {
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.classList.remove("added");
        this.rightDesigner.innerHTML = "";
        const imgSizeInputGroupEl = this.ImgSizeInputGroup(imageEl);
        const imagePropertyWrapper = this.UpdateImageProperties(imageEl);
        imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
        this.rightDesigner.appendChild(imagePropertyWrapper);
    }
    //#endregion
    //#endregion
    //#region Complex Properties
    HeadingProperties(headingElement) {
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
    FullNameProperties(headingElement) {
    }
}
//# sourceMappingURL=FormElementProperties.js.map