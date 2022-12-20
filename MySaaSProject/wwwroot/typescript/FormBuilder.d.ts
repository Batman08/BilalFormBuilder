type FormElementsDTO = {
    Heading: HTMLDivElement;
    FullName: HTMLDivElement;
    Email: HTMLDivElement;
};

type FormComponentDTO = {
    name: string;
    type: string;
    icon?: string[];
};

type FieldSectionCategoryDTO = {
    name: string;
    type: string;
};

type ComponentsToCreateDTO = {
    basicFormElements: FormComponentDTO[] | FieldSectionCategoryDTO[];
    complexFormElements: FormComponentDTO[]
};

type DropdownOptionDTO = {
    dropdownValue: string;
    dropdownTextContent: string;
};

type SingleChoiceOptionDTO = {
    singleChoiceOptionId: string;
    singleChoiceElName: string;
    singleChoiceOptionTextContent: string;
};

type MultipleChoiceOptionDTO = {
    multipleChoiceOptionId: string;
    multipleChoiceElName: string;
    multipleChoiceOptionValue: string;
    multipleChoiceOptionTextContent: string;
};

type FieldLabelPropertyData = {
    PlaceHolder: string;
    InputVal: string;
    AriaRoleDesc: string;
    ElementToUpdate: HTMLElement;
};

type TableRowDTO = {
    tableRow: string[];
};