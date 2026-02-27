class TableElement extends BaseElement implements IPropertyEditable {
    protected static readonly formElementBase: string = "table";
    protected readonly formElementNames: FormElementNames;

    constructor() {
        const formElementNames = Utilities.CreateFormElementNames(TableElement.formElementBase);
        super(formElementNames);
        this.formElementNames = formElementNames;
    }

    //#region RenderElement

    public RenderElement(): HTMLDivElement {
        const divWrapper = this.CreateFormElementWrapper();

        const divTextStart = document.createElement("div") as HTMLDivElement;
        divTextStart.classList.add("text-start");
        divWrapper.appendChild(divTextStart);

        const tableLabel = document.createElement("label") as HTMLLabelElement;
        tableLabel.classList.add("form-label");
        tableLabel.innerText = "Type a question";
        divTextStart.appendChild(tableLabel);

        const tableCols: string[] = ["#", "col 1", "col 2"];
        const tableRows: string[] = ["row 1", "row 2", "row 3"];
        const tableInputType: string = "Textbox";
        const table = Utilities.CreateTable(tableCols, tableRows, tableInputType);
        table.id = this.GetUniqueId();
        table.setAttribute("name", this.formElementNames.Name);
        table.ariaLabel = "Table";
        table.setAttribute("data-property-reference", this.formElementNames.Reference);
        table.setAttribute("data-input-type", tableInputType);
        divWrapper.appendChild(table);

        return divWrapper;
    }

    //#endregion


    //#region RenderPropertiesPanel

    public RenderPropertiesPanel(tableElement: HTMLElement): HTMLElement[] {
        const tableEl = tableElement.querySelector("[name=table]") as HTMLTableElement;
        const labelEl = tableElement.querySelector("label") as HTMLLabelElement;

        const tableLabelText: string = labelEl.textContent;
        const currentInputType: string = tableEl.getAttribute("data-input-type");

        //#region current rows/columns
        const tableRows = tableEl.querySelector("thead").childNodes[0].childNodes as NodeListOf<Node>;
        const tableColumns = tableEl.querySelector("tbody").childNodes as NodeListOf<Node>;

        //#region Table Label
        const tableTextWrapper = document.createElement("div") as HTMLDivElement;
        tableTextWrapper.classList.add("mb-3");

        const fieldLabel = document.createElement("label") as HTMLLabelElement;
        fieldLabel.htmlFor = "editLabel";
        fieldLabel.classList.add("form-label");
        fieldLabel.textContent = "";

        const fieldInput = document.createElement("input") as HTMLInputElement;
        fieldInput.id = "editLabel";
        fieldInput.classList.add("form-control");
        fieldInput.type = "text";
        fieldInput.placeholder = "type a question";
        fieldInput.value = tableLabelText;
        fieldInput.ariaRoleDescription = "Edit Table Label";
        fieldInput.oninput = (ev: InputEvent) => { labelEl.textContent = fieldInput.value; };

        tableTextWrapper.appendChild(fieldLabel);
        tableTextWrapper.appendChild(fieldInput);
        //#endregion

        //#region Button Group
        const inputGroupWrapper = document.createElement("div") as HTMLDivElement;
        inputGroupWrapper.classList.add("mb-3");

        const allignmentLabel = document.createElement("label") as HTMLLabelElement;
        allignmentLabel.htmlFor = "editAllignment";
        allignmentLabel.classList.add("form-label");
        allignmentLabel.textContent = "Input Type";
        inputGroupWrapper.appendChild(allignmentLabel);

        const divAllignmentGroup = document.createElement("div") as HTMLDivElement;
        divAllignmentGroup.setAttribute("role", "group");
        divAllignmentGroup.classList.add("btn-group", "flex-wrap", "btn-group-sm");
        divAllignmentGroup.ariaLabel = "table input type"
        divAllignmentGroup.style.width = "100%";
        inputGroupWrapper.appendChild(divAllignmentGroup);

        //#region Single Choice Option
        const inputSingleChoice = document.createElement("input") as HTMLInputElement;
        inputSingleChoice.type = "radio";
        inputSingleChoice.classList.add("btn-check");
        inputSingleChoice.name = "tableInputType";
        inputSingleChoice.id = "inputSingleChoice";
        inputSingleChoice.autocomplete = "off";
        inputSingleChoice.oninput = () => this.ChangeInputType(tableEl, "SingleChoice");

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("btn", "btn-outline-primary");
        singleChoiceLabel.htmlFor = "inputSingleChoice";
        singleChoiceLabel.textContent = "Radio Buttons";

        divAllignmentGroup.appendChild(inputSingleChoice);
        divAllignmentGroup.appendChild(singleChoiceLabel);
        //#endregion

        //#region Multiple Choice Option
        const inputMultipleChoice = document.createElement("input") as HTMLInputElement;
        inputMultipleChoice.type = "radio";
        inputMultipleChoice.classList.add("btn-check");
        inputMultipleChoice.name = "tableInputType";
        inputMultipleChoice.id = "inputMultipleChoice";
        inputMultipleChoice.autocomplete = "off";
        inputMultipleChoice.oninput = () => this.ChangeInputType(tableEl, "MultipleChoice");

        const multipleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        multipleChoiceLabel.classList.add("btn", "btn-outline-primary");
        multipleChoiceLabel.htmlFor = "inputMultipleChoice";
        multipleChoiceLabel.textContent = "Checkbox Buttons";

        divAllignmentGroup.appendChild(inputMultipleChoice);
        divAllignmentGroup.appendChild(multipleChoiceLabel);
        //#endregion

        //#region Dropdown Option
        const inputDdl = document.createElement("input") as HTMLInputElement;
        inputDdl.type = "radio";
        inputDdl.classList.add("btn-check");
        inputDdl.name = "tableInputType";
        inputDdl.id = "inputDdl";
        inputDdl.autocomplete = "off";
        inputDdl.oninput = () => this.ChangeInputType(tableEl, "Dropdown");

        const inputDdlLabel = document.createElement("label") as HTMLLabelElement;
        inputDdlLabel.classList.add("btn", "btn-outline-primary");
        inputDdlLabel.htmlFor = "inputDdl";
        inputDdlLabel.textContent = "Dropdown";

        divAllignmentGroup.appendChild(inputDdl);
        divAllignmentGroup.appendChild(inputDdlLabel);
        //#endregion

        //#region Textbox Option
        const inputTxtbox = document.createElement("input") as HTMLInputElement;
        inputTxtbox.type = "radio";
        inputTxtbox.classList.add("btn-check");
        inputTxtbox.name = "tableInputType";
        inputTxtbox.id = "inputTxtbox";
        inputTxtbox.autocomplete = "off";
        inputTxtbox.oninput = () => this.ChangeInputType(tableEl, "Textbox");

        const inputTxtboxLabel = document.createElement("label") as HTMLLabelElement;
        inputTxtboxLabel.classList.add("btn", "btn-outline-primary");
        inputTxtboxLabel.htmlFor = "inputTxtbox";
        inputTxtboxLabel.textContent = "Textbox";

        divAllignmentGroup.appendChild(inputTxtbox);
        divAllignmentGroup.appendChild(inputTxtboxLabel);
        //#endregion

        //#region Numeric Option
        const inputNumeric = document.createElement("input") as HTMLInputElement;
        inputNumeric.type = "radio";
        inputNumeric.classList.add("btn-check");
        inputNumeric.name = "tableInputType";
        inputNumeric.id = "inputNumeric";
        inputNumeric.autocomplete = "off";
        inputNumeric.oninput = () => this.ChangeInputType(tableEl, "Numeric");

        const inputNumericLabel = document.createElement("label") as HTMLLabelElement;
        inputNumericLabel.classList.add("btn", "btn-outline-primary");
        inputNumericLabel.htmlFor = "inputNumeric";
        inputNumericLabel.textContent = "Numeric";

        divAllignmentGroup.appendChild(inputNumeric);
        divAllignmentGroup.appendChild(inputNumericLabel);
        //#endregion

        //#region Multi-Type Option
        const inputMultiType = document.createElement("input") as HTMLInputElement;
        inputMultiType.type = "radio";
        inputMultiType.classList.add("btn-check");
        inputMultiType.name = "tableInputType";
        inputMultiType.id = "inputMultiType";
        inputMultiType.autocomplete = "off";
        inputMultiType.oninput = () => this.ChangeInputType(tableEl, "MultiType");

        const inputMultiTypeLabel = document.createElement("label") as HTMLLabelElement;
        inputMultiTypeLabel.classList.add("btn", "btn-outline-primary");
        inputMultiTypeLabel.htmlFor = "inputMultiType";
        inputMultiTypeLabel.textContent = "Multi-Type";

        divAllignmentGroup.appendChild(inputMultiType);
        divAllignmentGroup.appendChild(inputMultiTypeLabel);
        //#endregion

        if (currentInputType === "SingleChoice")
            inputSingleChoice.checked = true;
        else if (currentInputType === "MultipleChoice")
            inputMultipleChoice.checked = true;
        else if (currentInputType === "Dropdown")
            inputDdl.checked = true;
        else if (currentInputType === "Textbox")
            inputTxtbox.checked = true;
        else if (currentInputType === "Numeric")
            inputNumeric.checked = true;
        else if (currentInputType === "MultiType")
            inputMultiType.checked = true;

        //#endregion

        //#region rows/columns

        //#region Rows Textarea Property Element
        const rowsWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("rows", "Rows");
        const rowsFunctionData: TableUpdateFuncDTO = {
            elementToUpdate: tableEl,
            getOptionsFromTextarea: Utilities.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs
        };
        const rowsTextarea = this.TableElTextarea(tableEl, tableRows, rowsFunctionData, this.UpdateTableRows, "Enter row labels for table element", "rowsTextarea");
        rowsWrapper.appendChild(rowsTextarea);
        //#endregion

        //#region Columns Textarea Property Element
        const columnsWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("columns", "Columns");
        const columnsFunctionData: TableUpdateFuncDTO = {
            elementToUpdate: tableEl,
            getOptionsFromTextarea: Utilities.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs
        };
        const columnsTextarea = this.TableElTextarea(tableEl, tableColumns, columnsFunctionData, this.UpdateTableColumns, "Enter column labels for table element", "columnsTextarea");
        columnsWrapper.appendChild(columnsTextarea);
        //#endregion

        //#region Dropdown Options Textarea Property Element
        const ddlTextareaWrapper: HTMLDivElement = Utilities.TextareaLabelProperty("tableDdlOptions", "Dropdown Options");
        const ddlFunctionData: TableUpdateDDLDTO = {
            elementToUpdate: tableEl,
            getOptionsFromTextarea: Utilities.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs,
        };
        const ddlOptionsTextarea: HTMLDivElement = this.TableElTextarea(tableEl, tableColumns, ddlFunctionData, this.UpdateTableColumns, "Enter dropdown options", "ddlOptions");
        ddlTextareaWrapper.appendChild(ddlOptionsTextarea);

        if (currentInputType === "Dropdown") {
            ddlTextareaWrapper.style.display = "block";
        }
        else {
            ddlTextareaWrapper.style.display = "none";
        }
        //#endregion
        //#endregion

        //#endregion

        return [tableTextWrapper, inputGroupWrapper, rowsWrapper, columnsWrapper, ddlTextareaWrapper];
    }

    private ChangeInputType(tableEl: HTMLElement, inputType: string): void {
        const optionsTextarea: HTMLTextAreaElement = document.querySelector("#tableDdlOptions");
        if (inputType === "Dropdown") {
            optionsTextarea.style.display = "block"
        }
        else {
            optionsTextarea.style.display = "none"
        }

        if (inputType === "SingleChoice") {
            tableEl.setAttribute("data-input-type", "SingleChoice");
        }
        else if (inputType === "MultipleChoice") {
            tableEl.setAttribute("data-input-type", "MultipleChoice");
        }
        else if (inputType === "Dropdown") {
            tableEl.setAttribute("data-input-type", "Dropdown");
        }
        else if (inputType === "Textbox") {
            tableEl.setAttribute("data-input-type", "Textbox");
        }
        else if (inputType === "Numeric") {
            tableEl.setAttribute("data-input-type", "Numeric");
        }
        else if (inputType === "MultiType") {
            tableEl.setAttribute("data-input-type", "MultiType");
        }

        const rowsTextarea = document.querySelector("#rowsTextarea") as HTMLTextAreaElement;
        const options: string[] = Utilities.GetOptionsFromTextarea(rowsTextarea);

        const tableTypeData: TableUpdateFuncDTO = {
            elementToUpdate: tableEl,
            getOptionsFromTextarea: Utilities.GetOptionsFromTextarea,
            updateTableInputs: this.UpdateTableInputs,
            options: options
        };

        this.UpdateTableRows(tableTypeData);
    }

    private UpdateTableRows(properties: TableUpdateFuncDTO): void {
        const inputType: string = properties.elementToUpdate.getAttribute("data-input-type");
        const thead = properties.elementToUpdate.querySelector("thead") as HTMLTableSectionElement;
        thead.innerHTML = "";

        const trHeaderRow = document.createElement("tr") as HTMLTableRowElement;
        thead.appendChild(trHeaderRow);

        properties.options.forEach((col) => {
            const th = Utilities.CreateTableHeader(col);
            trHeaderRow.appendChild(th);
        });

        const tbody = properties.elementToUpdate.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";

        const columnsTextarea = document.querySelector("#columnsTextarea") as HTMLTextAreaElement;

        const rowsFromElement: string[] = properties.getOptionsFromTextarea(columnsTextarea);
        const slicedTblHeaderData = properties.options.slice(1);

        properties.updateTableInputs(rowsFromElement, tbody, slicedTblHeaderData, inputType, Utilities, properties.getOptionsFromTextarea);
    }

    private UpdateTableColumns(properties: TableUpdateFuncDTO): void {
        const inputType: string = properties.elementToUpdate.getAttribute("data-input-type");
        const tbody = properties.elementToUpdate.querySelector("tbody") as HTMLTableSectionElement;
        tbody.innerHTML = "";

        const rowsTextarea = document.querySelector("#rowsTextarea") as HTMLTextAreaElement;
        const rowsFromElement: string[] = properties.getOptionsFromTextarea(rowsTextarea);
        const slicedTblHeaderData = rowsFromElement.slice(1);
        properties.updateTableInputs(properties.options, tbody, slicedTblHeaderData, inputType, properties.getOptionsFromTextarea);
    }

    private UpdateTableInputs(options: string[], tbody: HTMLTableSectionElement, slicedTblHeaderData: string[], inputType: string, getOptionsFromTextarea: Function) {
        options.forEach((col) => {
            const tr = document.createElement("tr") as HTMLTableRowElement;
            tbody.appendChild(tr);

            const th = document.createElement("th") as HTMLTableHeaderCellElement;
            th.scope = "row";
            th.textContent = col;
            tr.appendChild(th);

            console.log(slicedTblHeaderData);
            for (let i = 0; i < slicedTblHeaderData.length; i++) {
                switch (inputType) {
                    case "SingleChoice":
                        const singleChoiceData: SingleChoiceOptionDTO = {
                            singleChoiceOptionId: "scOption" + i,
                            singleChoiceElName: col,
                            singleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const scOptionData = Utilities.CreateTableSingleChoiceOption(singleChoiceData);
                        tr.appendChild(scOptionData);
                        break;

                    case "MultipleChoice":
                        const name: string = col.split(" ").join("_");
                        const data: MultipleChoiceOptionDTO = {
                            multipleChoiceOptionId: `${name}_${i}`,
                            multipleChoiceElName: `${name}_${i}`,
                            multipleChoiceOptionValue: slicedTblHeaderData[i],
                            multipleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const mcOptionData = Utilities.CreateTableMultipleChoiceOption(data);
                        tr.appendChild(mcOptionData);
                        break;

                    case "Dropdown":
                        const tableDdlOptions = document.querySelector("#ddlOptions") as HTMLTextAreaElement;
                        const optionData: string[] = getOptionsFromTextarea(tableDdlOptions);

                        const ddlName: string = col.split(" ").join("_");
                        const ddlData: TableDDLOptionDTO = {
                            ddlOptionId: `${ddlName}_${i}`,
                            ddlName: `${ddlName}_${i}`,
                            ddlOption: optionData
                        };
                        const ddlOptionData = Utilities.CreateTableDropdown(ddlData);
                        tr.appendChild(ddlOptionData);
                        break;

                    case "Textbox":
                        const textboxName: string = col.split(" ").join("_");
                        const textboxData: TxtOptionDTO = {
                            txtOptionId: `${textboxName}`,
                            txtName: `${textboxName}_${i}`
                        };
                        const txtOptionData = Utilities.CreateTableTextbox(textboxData);
                        tr.appendChild(txtOptionData);
                        break;

                    case "Numeric":
                        const numericName: string = col.split(" ").join("_");
                        const numericData: NumericOptionDTO = {
                            numericOptionId: `${numericName}`,
                            numericName: `${numericName}_${i}`
                        };
                        const numericOptionData = Utilities.CreateTableNumeric(numericData);
                        tr.appendChild(numericOptionData);
                        break;
                };
            }
        });
    }

    private TableElTextarea(targetEl: HTMLElement, optionsFromEl: NodeListOf<Node>, updateFuncData: any, updateFunc: Function, labelText: string, textareaId: string): HTMLDivElement {
        const divTextarea = document.createElement("div") as HTMLDivElement;
        divTextarea.classList.add("form-floating");

        const textarea = document.createElement("textarea") as HTMLTextAreaElement;
        textarea.id = textareaId;
        textarea.classList.add("form-control");
        textarea.placeholder = labelText;
        textarea.style.height = "100px";

        const textareaLabel = document.createElement("label") as HTMLLabelElement;
        textareaLabel.htmlFor = textareaId;
        textareaLabel.textContent = labelText;

        divTextarea.appendChild(textarea);
        divTextarea.appendChild(textareaLabel);

        let optionsFromElement: string[] = [];
        switch (targetEl.getAttribute("data-input-type")) {
            case "SingleChoice":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "MultipleChoice":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "Dropdown":
                switch (textarea.id) {
                    case "ddlOptions":
                        const ddlOptions = targetEl.querySelector("select").childNodes as NodeListOf<Node>;
                        ddlOptions.forEach((option) => {
                            optionsFromElement.push(option.textContent);
                        });
                        break
                    case "columnsTextarea":
                        console.log(optionsFromEl);
                        optionsFromEl.forEach((option) => {
                            optionsFromElement.push(option.firstChild.textContent);
                        });
                        break;
                    case "rowsTextarea":
                        optionsFromEl.forEach((option) => {
                            optionsFromElement.push(option.firstChild.textContent);
                        });
                        break;
                };
                break;

            case "Textbox":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "Numeric":
                optionsFromEl.forEach((option) => {
                    optionsFromElement.push(option.textContent);
                });
                break;

            case "MultiType":
                break;
        }
        console.log(optionsFromElement);
        Utilities.UpdateTextAreaOptions(textarea, optionsFromElement);

        textarea.oninput = (ev: KeyboardEvent) => {
            let options: string[] = [];
            const ddlOptions = document.querySelector("#ddlOptions") as HTMLTextAreaElement;
            if (textarea === ddlOptions) {
                const columnsTextarea = document.querySelector("#columnsTextarea") as HTMLTextAreaElement;
                options = Utilities.GetOptionsFromTextarea(columnsTextarea);
            }
            else {
                options = Utilities.GetOptionsFromTextarea(textarea);
            }
            updateFuncData.options = options;
            updateFunc(updateFuncData);
        };

        return divTextarea;
    }

    //#endregion
}