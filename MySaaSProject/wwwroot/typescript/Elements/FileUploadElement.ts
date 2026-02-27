class FileUploadElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "file_upload";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(FileUploadElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const fileUploadLabel = document.createElement("label") as HTMLLabelElement;
        fileUploadLabel.classList.add("form-label");
        fileUploadLabel.innerText = "File Upload";
        divTextStart.appendChild(fileUploadLabel);

        const fileUploadInput = document.createElement("input") as HTMLInputElement;
        fileUploadInput.id = this.GetUniqueId();
        fileUploadInput.type = "file";
        fileUploadInput.classList.add("form-control");
        fileUploadInput.setAttribute("name", this.formElementNames.Name)
        fileUploadInput.setAttribute("data-property-reference", this.formElementNames.Reference);
        fileUploadInput.multiple = true;
        fileUploadInput.disabled = true;
        divWrapper.appendChild(fileUploadInput);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(fileUploadElement: HTMLElement): HTMLElement[] {
        const fileUploadLabelEl = fileUploadElement.querySelector(".form-label") as HTMLParagraphElement;
        const fileUploadLabelText: string = fileUploadLabelEl.textContent;
        const fieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: "File Upload",
            InputVal: fileUploadLabelText,
            AriaRoleDesc: "Edit File Upload",
            ElementToUpdate: fileUploadLabelEl
        }

        const editLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(fieldLabelPropertyData);
        return [editLabelFieldWrapper];
    }

    //#endregion
}