class FormSidebar {
    private readonly _basicFormElements = document.querySelector("#basicFormElements") as HTMLDivElement;
    private readonly _complexFormElements = document.querySelector("#formElements") as HTMLDivElement;

    public static Init(componentsToCreate: ComponentsToCreateDTO): void {
        new FormSidebar().Init(componentsToCreate);
    }

    public Init(componentsToCreate: ComponentsToCreateDTO): void {
        this.CreateFormElementAddComponent(componentsToCreate);
    }

    private CreateFormElementAddComponent(componentsToCreate: ComponentsToCreateDTO): void {
        this._basicFormElements.innerHTML = '';
        this._complexFormElements.innerHTML = '';

        //loop through all basic components to create
        componentsToCreate.BasicFormElements.forEach((component) => {
            if (component.Type !== "FieldSectionCategory") {
                const addElementComponent = this.FormElementComponent(component.Name, component.Type, component.Icon);
                this._basicFormElements.appendChild(addElementComponent);
            }
            else {
                const addFieldSectionCategory = this.FieldSectionCategoryComponent(component.Name);
                this._basicFormElements.appendChild(addFieldSectionCategory);
            }
        });

        //loop through all complex components to create
        componentsToCreate.ComplexFormElements.forEach((component) => {
            const addElementComponent = this.FormElementComponent(component.Name, component.Type, component.Icon);
            this._complexFormElements.appendChild(addElementComponent);
        });
    }

    private FormElementComponent(name: string, type: string, icon: string[]): HTMLLIElement {
        const listElementWrapper = document.createElement("li") as HTMLLIElement;
        listElementWrapper.classList.add("listAddFormElementWrapper", "bg-indigo-500");
        listElementWrapper.setAttribute("data-element-type", `formElement${type}`);

        const divIcon = document.createElement("div") as HTMLDivElement;
        divIcon.classList.add("formElementIcon", "bg-indigo-700");
        listElementWrapper.appendChild(divIcon);

        const spanIcon = document.createElement("span") as HTMLSpanElement;
        divIcon.appendChild(spanIcon);

        const elementIcon = document.createElement("i") as HTMLDivElement;
        elementIcon.classList.add(...icon);
        spanIcon.appendChild(elementIcon);


        const divElementnName = document.createElement("div") as HTMLDivElement;
        divElementnName.classList.add("formElementName");
        divElementnName.innerText = name;
        listElementWrapper.appendChild(divElementnName);

        return listElementWrapper;
    }

    private FieldSectionCategoryComponent(name: string): HTMLLIElement {
        const listElementWrapper = document.createElement("li") as HTMLLIElement;
        listElementWrapper.classList.add("filteredComponent");

        const divText = document.createElement("div") as HTMLDivElement;
        divText.textContent = name;
        listElementWrapper.appendChild(divText);
        return listElementWrapper;
    }
}