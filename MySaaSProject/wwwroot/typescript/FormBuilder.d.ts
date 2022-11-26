type formElements = {
    Heading: HTMLDivElement;
    FullName: HTMLDivElement;
    Email: HTMLDivElement;
};

type formComponent = {
    name: string;
    type: string;
    icon: string[];
}

type componentsToCreate = {
    basicFormElements: formComponent[];
    complexFormElements: formComponent[]
}
