class FormElements {
    //#region Components

    public FindFormElementToCreate(formElementToCreate: string): HTMLDivElement | null {
        return FormElementFactory.Create(formElementToCreate);
    }

    public FormElementControls(): HTMLDivElement {
        const divSelectedControls = document.createElement("div") as HTMLDivElement;
        divSelectedControls.id = "selectedFormElementControl";
        divSelectedControls.classList.add("selectedControls");

        const btnProperty = document.createElement("button") as HTMLButtonElement;
        btnProperty.id = "selectedControlBtnProperty";
        btnProperty.classList.add("btn", "btn-secondary", "blahBtn");
        btnProperty.innerHTML = '<i class="fas fa-cog"></i>';
        divSelectedControls.appendChild(btnProperty);

        const btnDelete = document.createElement("button") as HTMLButtonElement;
        btnDelete.id = "selectedControlBtnDelete";
        btnDelete.classList.add("btn", "btn-danger", "blahBtn");
        btnDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
        divSelectedControls.appendChild(btnDelete);

        return divSelectedControls;
    }
    //#endregion

    //#region Generic Form Element Functions
    private GetFormElementId(elementName: string): string {
        //remove spaces form elementName
        const trimmedElementName = elementName.split(" ").join("") as string;


        const allElementsWithWrapperClass = document.querySelectorAll(`[name=${trimmedElementName}]`);
        console.log(allElementsWithWrapperClass);

        //find the highest number from ids
        let highestNumber = 0;
        allElementsWithWrapperClass.forEach((element: Element) => {
            const elementNumber = parseInt(element.id.replace(trimmedElementName, ''));
            if (elementNumber > highestNumber) {
                highestNumber = elementNumber;
            }
        });

        return `${trimmedElementName}${highestNumber + 1}` as string;
    }

    private CreateFormElementWrapper(elementName: string): HTMLDivElement {
        const divWrapper = document.createElement("div") as HTMLDivElement;
        divWrapper.classList.add("createdFormElement", "pad15", "position-relative", "text-start");
        divWrapper.setAttribute("data-wrapper-type", `${elementName}Wrapper`);

        return divWrapper
    }
    //#endregion
}