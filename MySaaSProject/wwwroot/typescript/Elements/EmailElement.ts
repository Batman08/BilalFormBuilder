class EmailElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = `email`;
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(EmailElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divEmailRow = document.createElement(`div`) as HTMLDivElement;
        divEmailRow.id = this.GetUniqueId();
        divEmailRow.setAttribute(`name`, this.formElementNames.Name);
        divEmailRow.setAttribute(`data-property-reference`, this.formElementNames.Reference);
        divEmailRow.classList.add(`row`);
        divWrapper.appendChild(divEmailRow);

        const divEmailColumn = document.createElement(`div`) as HTMLDivElement;
        divEmailColumn.classList.add(`col-md-6`, `text-start`);
        divEmailRow.appendChild(divEmailColumn);

        const labelEmail = document.createElement(`label`) as HTMLLabelElement;
        labelEmail.setAttribute(`data-Email`, ``);
        labelEmail.classList.add(`form-label`);
        labelEmail.innerText = `Email`;
        divEmailColumn.appendChild(labelEmail);

        const inputEmail = document.createElement(`input`) as HTMLInputElement;
        inputEmail.type = `email`;
        inputEmail.setAttribute(`data-element-value`, ``);
        inputEmail.classList.add(`form-control`);
        inputEmail.placeholder = `example@email.com`;
        inputEmail.ariaLabel = `Email`;
        divEmailColumn.appendChild(inputEmail);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(fullNameElement: HTMLElement): HTMLElement[] {
        const emailLabelEl = fullNameElement.querySelector(`[data-Email]`) as HTMLHeadElement;
        const emailFieldLabelPropertyData: FieldLabelPropertyData = {
            PlaceHolder: ``,
            InputVal: emailLabelEl.textContent,
            AriaRoleDesc: `Edit Email`,
            ElementToUpdate: emailLabelEl,
            Title: `Email Label`
        }
        const editEmailLabelFieldWrapper: HTMLDivElement = Utilities.FieldLabelProperty(emailFieldLabelPropertyData);

        return [editEmailLabelFieldWrapper];
    }

    //#endregion
}