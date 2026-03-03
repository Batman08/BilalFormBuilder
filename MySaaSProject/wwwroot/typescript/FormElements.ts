class FormElements {
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
}