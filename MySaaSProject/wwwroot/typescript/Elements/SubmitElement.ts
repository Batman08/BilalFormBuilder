class SubmitElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "submit";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(SubmitElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextCenter = document.createElement("div") as HTMLDivElement;
        divTextCenter.classList.add("text-center");
        divWrapper.appendChild(divTextCenter);

        const btnSubmit = document.createElement("input") as HTMLButtonElement;
        btnSubmit.id = this.GetUniqueId();
        btnSubmit.type = "submit";
        btnSubmit.classList.add("btn", "btn-primary", "mx-auto", "btnSubmit");
        btnSubmit.setAttribute("name", this.formElementNames.Name)
        btnSubmit.setAttribute("data-property-reference", this.formElementNames.Reference);
        btnSubmit.setAttribute("data-align", "center")
        btnSubmit.value = "Submit";
        btnSubmit.disabled = true;
        divTextCenter.appendChild(btnSubmit);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(submitElementWrapper: HTMLElement): HTMLElement[] {
        const btnSubmitEl = submitElementWrapper.querySelector("[name=submit]") as HTMLInputElement;
        const btnAllignmentEl = btnSubmitEl.parentElement as HTMLDivElement;
        const submitLabelText: string = btnSubmitEl.value;
        const currentAllignment: string = btnSubmitEl.getAttribute("data-align");

        // Button Text
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


        //Button Allignment
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

        switch (currentAllignment) {
            case `left`:
                allignLeftInput.checked = true;
                break;
            case `center`:
                allignCenterInput.checked = true;
                break;
            case `right`:
                allignRightInput.checked = true;
                break;
            default:
                allignCenterInput.checked = true;
        }

        return [btnSubmitTextWrapper, allignmentWrapper];
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
}