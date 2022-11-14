class FormElements {
    private _allFormElements: formElements = {
        Heading: this.FormElementHeading(),
        FullName: this.FormElementFullName(),
        Email: this.FormElementEmail()
    };

    constructor() {
        
    }

    public FindFormElementToCreate(formElementToCreate: string): string | null {
        debugger
        const prefix: string = formElementToCreate.substring(0, 11);

        if (prefix === "formElement") {
            const elementType: string = formElementToCreate.substring(11);
            return this._allFormElements[elementType];
        }

        return null;
    }

    public FormElementHeading(): HTMLDivElement {
        debugger

        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Heading";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }

    public FormElementFullName(): HTMLDivElement {
        debugger

        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Full Name";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }

    public FormElementEmail(): HTMLDivElement {
        debugger

        const divHeadingWrapper = document.createElement("div") as HTMLDivElement;
        divHeadingWrapper.classList.add("formElementHeadingWrapper");
        const h2Heading = document.createElement("h2") as HTMLHeadingElement
        h2Heading.innerText = "Email";
        divHeadingWrapper.appendChild(h2Heading);
        console.log("created header");
        return divHeadingWrapper;
    }
}