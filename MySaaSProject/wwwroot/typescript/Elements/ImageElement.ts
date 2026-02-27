class ImageElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "image";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(ImageElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const imageEl = document.createElement("img") as HTMLImageElement;
        imageEl.id = this.GetUniqueId();
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.classList.add("mx-auto", "d-block", "rounded");
        imageEl.setAttribute("name", this.formElementNames.Name)
        imageEl.setAttribute("data-property-reference", this.formElementNames.Reference);
        divWrapper.appendChild(imageEl);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(imageElement: HTMLElement): HTMLElement[] {
        const imageEl = imageElement.querySelector("img") as HTMLImageElement;
        const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(imageEl);

        if (imageEl.classList.contains("added")) {
            const divImagePreview: HTMLDivElement = this.EditImageProperties(imageEl);
            divImagePreview.appendChild(imgSizeInputGroupEl);
            return [divImagePreview];
        }
        else {
            const imagePropertyWrapper: HTMLDivElement = this.UpdateImageProperties(imageEl);
            imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
            return [imagePropertyWrapper];
        }
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

                Utilities.DispatchEvent_PropertiesPanel_Clear();
                targetImageEl.classList.add("added");

                const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(targetImageEl);
                const divImagePreview: HTMLDivElement = this.EditImageProperties(targetImageEl);
                divImagePreview.appendChild(imgSizeInputGroupEl);
                Utilities.DispatchEvent_PropertiesPanel_SetContent(divImagePreview);
            }
            reader.readAsDataURL(file);
        }
    }

    private RemoveImage(imageEl: HTMLImageElement): void {
        Utilities.DispatchEvent_PropertiesPanel_Clear();

        imageEl.src = "";
        imageEl.src = "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image-300x203.jpg";
        imageEl.width = 300;
        imageEl.height = 203;
        imageEl.classList.remove("added");

        const imgSizeInputGroupEl: HTMLDivElement = this.ImgSizeInputGroup(imageEl);
        const imagePropertyWrapper: HTMLDivElement = this.UpdateImageProperties(imageEl);
        imagePropertyWrapper.appendChild(imgSizeInputGroupEl);
        Utilities.DispatchEvent_PropertiesPanel_SetContent(imagePropertyWrapper);
    }

    //#endregion
}