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


    //#region GetElementProperties

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

    //#endregion


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
}