/// <reference types="./FormBuilder" />
/// <reference path="./Utilities/Utilities.ts" />

class FormElementProperties {
    private readonly rightDesigner = document.querySelector('#rightDesigner') as HTMLDivElement;

    //#region Init

    public static Init(): void {
        new FormElementProperties().Init();
    }

    private Init(): void {
        this.Events();
    }

    //#endregion

    public GetElementProperties(elementType: string, elementWrapper: HTMLElement) {
        const instance = FormElementFactory.GetInstance(elementWrapper);
        if (!instance) {
            console.warn("No instance attached to wrapper.");
            return;
        }

        this.rightDesigner.innerHTML = "";

        // Type guard
        const isPropertyEditable = typeof instance.RenderPropertiesPanel === "function";
        if (isPropertyEditable) {
            var propertiesPanelItems = instance.RenderPropertiesPanel(elementWrapper) as HTMLElement[];
            propertiesPanelItems.forEach((item: HTMLElement) => this.rightDesigner.appendChild(item));
        }
        else {
            //in the future prevent from opening properties designer draw/panel
        }
    }

    public GetElementProperties2(elementType: string, element: HTMLElement) {

        switch (elementType) {
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

    //#region Events

    public Events(): void {
        this.ConsumeEvent_PropertiesPanel_SetContent();
        this.ConsumeEvent_PropertiesPanel_Clear();
    }

    private ConsumeEvent_PropertiesPanel_SetContent(): void {
        const eventType: PropertiesPanelSetContentEventType = `ba_event_PropertiesPanel_SetContent`;
        document.addEventListener(eventType, async (ev: CustomEvent) => {
            const detail: PropertiesPanelSetContentEvent = ev.detail;
            this.rightDesigner.appendChild(detail.PropertyElement);
        });
    }

    private ConsumeEvent_PropertiesPanel_Clear(): void {
        const eventType: PropertiesPanelClearEventType = `ba_event_PropertiesPanel_Clear`;
        document.addEventListener(eventType, async (ev: CustomEvent) => {
            this.rightDesigner.innerHTML = ``;
        });
    }

    //#endregion


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