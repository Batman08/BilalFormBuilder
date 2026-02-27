type IPropertyEditable = {
    RenderPropertiesPanel(element: HTMLElement): HTMLElement[];
    //RenderPropertiesPanel?: (element: HTMLElement) => HTMLElement[];
}


type PropertiesPanelSetContentEventType = `ba_event_PropertiesPanel_SetContent`;
type PropertiesPanelSetContentEvent = {
    PropertyElement: HTMLElement;
}

type PropertiesPanelClearEventType = `ba_event_PropertiesPanel_Clear`;