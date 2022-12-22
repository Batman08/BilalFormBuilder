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



type DDLUpdateFuncDTO = {
    utils: Utilities;
    dropdownElWrapper: HTMLElement;
    options?: string[];
};

type SCLUpdateFuncDTO = {
    utils: Utilities;
    singlchoiceElWrapper: HTMLElement;
    options?: string[];
};

type MCLUpdateFuncDTO = {
    utils: Utilities;
    multipleChoiceElWrapper: HTMLElement;
    options?: string[];
};

type TableUpdateFuncDTO = {
    utils: Utilities;
    elementToUpdate: HTMLElement;
    getOptionsFromTextarea: Function;
    updateTableInputs: Function;
    options?: string[];
};

type TableUpdateDDLDTO = {
    utils: Utilities;
    elementToUpdate: HTMLElement;
    getOptionsFromTextarea: Function;
    updateTableInputs: Function;
    options?: string[];
};

type TableDDLOptionDTO = {
    ddlOptionId: string;
    ddlName: string;
    ddlOption: string[];
}

type TxtOptionDTO = {
    txtOptionId: string;
    txtName: string;
};

type NumericOptionDTO = {
    numericOptionId: string;
    numericName: string;
};