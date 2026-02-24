class ParagraphElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "paragraph";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(ParagraphElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();
        const p = document.createElement("p");

        p.id = this.GetUniqueId();
        p.className = "text-break";
        p.setAttribute("name", this.formElementNames.Name);
        p.setAttribute("data-property-reference", this.formElementNames.Reference);
        p.innerText = "This is a paragraph";

        divWrapper.appendChild(p);
        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(paragraphElement: HTMLElement, rightDesigner: HTMLDivElement): void {
        const elementToUpdateText = paragraphElement.querySelector("[data-property-reference]") as HTMLParagraphElement;
        const currentText: string = elementToUpdateText.textContent;

        rightDesigner.innerHTML = '';
        const textArea = document.createElement('textarea') as HTMLTextAreaElement;
        textArea.id = 'paragraph-editor';
        textArea.classList.add('form-control');
        textArea.value = currentText;
        this.UpdateParagraph(elementToUpdateText, textArea);

        rightDesigner.appendChild(textArea);
    }

    private UpdateParagraph(elementToUpdateText: HTMLElement, inputEl: HTMLTextAreaElement): void {
        inputEl.oninput = (ev: InputEvent) => { elementToUpdateText.textContent = inputEl.value; };
    }

    //#endregion
}