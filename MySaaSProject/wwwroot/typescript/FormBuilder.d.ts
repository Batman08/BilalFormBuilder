type FormElementsDTO = {
    Heading: HTMLDivElement;
    FullName: HTMLDivElement;
    Email: HTMLDivElement;
};

type FormComponentDTO = {
    name: string;
    type: string;
    icon: string[];
};

type ComponentsToCreateDTO = {
    basicFormElements: FormComponentDTO[];
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
