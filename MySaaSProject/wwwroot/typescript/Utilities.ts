class Utilities {
    //#region Boostrap Modals
    public static BTSP_GetOffCanvas(selector: string): bootstrap.Offcanvas {
        const offCanvasElement = document.querySelector(selector) as HTMLDivElement
        return new bootstrap.Offcanvas(offCanvasElement);
    }

    public static BTSP_OpenOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.show();
    }

    public static BTSP_CloseOffCanvas(offCanvas: bootstrap.Offcanvas): void {
        offCanvas.hide();
    }
    //#endregion

    //#region TinyMCE
    public static InitTinyMCE(tinymce: any, editorSelector: string) {
        // Initialize tinymce editor
        tinymce.init({
            selector: editorSelector
        });
    }

    public static AddTinymceListeners(tinymce: any, element: HTMLElement, callback: Function): void {
        const btnTinymceUpgrade = document.querySelector('.tox-promotion') as HTMLDivElement;
        btnTinymceUpgrade.classList.add("hideElement");
        const iconTinymce = document.querySelector('.tox-statusbar__branding') as HTMLSpanElement;
        iconTinymce.classList.add("hideElement");

        //add input event listner for tinymce
        tinymce.activeEditor.getBody().oninput = (ev: InputEvent) => {
            if (ev.target) {
                //update paragraph element
                callback(tinymce, element);
            }
        };
    }
    //#endregion

    //#region Form Utils
    public static RgbToHex(rgbVal: string): string {
        const rgb: string[] = rgbVal.substring(4, rgbVal.length - 1).replace(/ /g, '').split(',');
        const r = parseInt(rgb[0], 10).toString(16);
        const g = parseInt(rgb[1], 10).toString(16);
        const b = parseInt(rgb[2], 10).toString(16);
        const hex = "#" + r + g + b;
        return hex;
    }

    public static CreateDropdownOption(ddlOptionData: DropdownOptionDTO): HTMLOptionElement {
        const ddlOption = document.createElement("option") as HTMLOptionElement;
        ddlOption.value = ddlOptionData.dropdownValue;
        ddlOption.textContent = ddlOptionData.dropdownTextContent;
        return ddlOption;
    }

    public static CreateSingleChoiceOption(scOptionData: SingleChoiceOptionDTO): HTMLDivElement {
        const divSinglChoiceWrapper = document.createElement("div") as HTMLDivElement;
        divSinglChoiceWrapper.classList.add("form-check");

        const singleChoiceInput = document.createElement("input") as HTMLInputElement;
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        singleChoiceInput.disabled = true;
        divSinglChoiceWrapper.appendChild(singleChoiceInput);

        const singleChoiceLabel = document.createElement("label") as HTMLLabelElement;
        singleChoiceLabel.classList.add("form-check-label");
        singleChoiceLabel.htmlFor = scOptionData.singleChoiceOptionId;
        singleChoiceLabel.textContent = scOptionData.singleChoiceOptionTextContent;
        divSinglChoiceWrapper.appendChild(singleChoiceLabel);

        return divSinglChoiceWrapper;
    }

    public static CreateMultipleChoiceOption(mcOptionData: MultipleChoiceOptionDTO): HTMLDivElement {
        const divCheckboxOption = document.createElement("div") as HTMLDivElement;
        divCheckboxOption.classList.add("form-check");

        const checkboxInput = document.createElement("input") as HTMLInputElement;
        checkboxInput.classList.add("form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        checkboxInput.disabled = true;
        divCheckboxOption.appendChild(checkboxInput);

        const checkboxLabel = document.createElement("label") as HTMLLabelElement;
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.htmlFor = mcOptionData.multipleChoiceOptionId;
        checkboxLabel.textContent = mcOptionData.multipleChoiceOptionTextContent;
        divCheckboxOption.appendChild(checkboxLabel);

        return divCheckboxOption;
    }

    //#region Table
    public static CreateTableHeader(tableHeaderVal: string): HTMLTableHeaderCellElement {
        const thQuestion = document.createElement("th") as HTMLTableHeaderCellElement;
        thQuestion.scope = "col";
        thQuestion.textContent = tableHeaderVal;

        return thQuestion;
    }

    public static CreateTableBody(tableBodyData: string): HTMLTableCaptionElement {
        const tdQuestion = document.createElement("td") as HTMLTableDataCellElement;
        tdQuestion.textContent = tableBodyData;

        return tdQuestion;
    }

    public static CreateTable(tblHeaderData: string[], tableBodyData: string[], inputType: string): HTMLTableElement {
        const table = document.createElement("table") as HTMLTableElement;
        table.classList.add("table", "table-striped", "table-bordered", "border-secondary");

        const thead = document.createElement("thead") as HTMLTableSectionElement;
        table.appendChild(thead);

        const trHeaderRow = document.createElement("tr") as HTMLTableRowElement;
        thead.appendChild(trHeaderRow);

        tblHeaderData.forEach((col) => {
            const th = this.CreateTableHeader(col);
            trHeaderRow.appendChild(th);
        });

        const slicedTblHeaderData = tblHeaderData.slice(1);

        const tbody = document.createElement("tbody") as HTMLTableSectionElement;
        table.appendChild(tbody);

        tableBodyData.forEach((row) => {
            const tr = document.createElement("tr") as HTMLTableRowElement;
            tbody.appendChild(tr);

            const th = document.createElement("th") as HTMLTableHeaderCellElement;
            th.scope = "row";
            th.textContent = row;
            tr.appendChild(th);

            for (let i = 0; i < slicedTblHeaderData.length; i++) {
                switch (inputType) {
                    case "SingleChoice":
                        const singleChoiceData: SingleChoiceOptionDTO = {
                            singleChoiceOptionId: "scOption" + i,
                            singleChoiceElName: row,
                            singleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const scOptionData = this.CreateTableSingleChoiceOption(singleChoiceData);
                        tr.appendChild(scOptionData);
                        break;

                    case "MultipleChoice":
                        const name: string = row.split(" ").join("_");
                        const data: MultipleChoiceOptionDTO = {
                            multipleChoiceOptionId: `${name}_${i}`,
                            multipleChoiceElName: `${name}_${i}`,
                            multipleChoiceOptionValue: slicedTblHeaderData[i],
                            multipleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const mcOptionData = this.CreateTableMultipleChoiceOption(data);
                        tr.appendChild(mcOptionData);
                        break;
                    
                    case "Dropdown":
                        const dropdownData: TableDDLOptionDTO = {
                            ddlOptionId: `ddlOption${i}`,
                            ddlName: row,
                            ddlOption: slicedTblHeaderData,
                        };
                        const ddlOptionData = this.CreateTableDropdown(dropdownData);
                        tr.appendChild(ddlOptionData);
                        break;

                    case "Textbox":
                        const textboxData: TxtOptionDTO = {
                            txtOptionId: `txtOption${i}`,
                            txtName: row
                        };
                        const txtOptionData = this.CreateTableTextbox(textboxData);
                        tr.appendChild(txtOptionData);
                        break;

                    case "Numeric":
                        const numericData: NumericOptionDTO = {
                            numericOptionId: `txtOption${i}`,
                            numericName: row
                        };
                        const numericOptionData = this.CreateTableNumeric(numericData);
                        tr.appendChild(numericOptionData);
                };
            }
        });

        return table;
    }

    public static CreateTableSingleChoiceOption(scOptionData: SingleChoiceOptionDTO): HTMLTableDataCellElement {
        const td = document.createElement("td") as HTMLTableDataCellElement;

        const singleChoiceInput = document.createElement("input") as HTMLInputElement;
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input", "mx-auto", "d-flex");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        singleChoiceInput.value = scOptionData.singleChoiceOptionTextContent;
        singleChoiceInput.disabled = true;
        td.appendChild(singleChoiceInput);

        return td;
    }

    public static CreateTableMultipleChoiceOption(mcOptionData: MultipleChoiceOptionDTO): HTMLTableDataCellElement {
        const td = document.createElement("td") as HTMLTableDataCellElement;

        const checkboxInput = document.createElement("input") as HTMLInputElement;
        checkboxInput.classList.add("form-check-input", "mx-auto", "d-flex");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        checkboxInput.disabled = true;
        td.appendChild(checkboxInput);

        return td;
    }

    public static CreateTableDropdown(ddlOptionData: TableDDLOptionDTO): HTMLTableDataCellElement {
        const td = document.createElement("td") as HTMLTableDataCellElement;

        const ddlInput = document.createElement("select") as HTMLSelectElement;
        ddlInput.classList.add("fosrm-select");
        ddlInput.id = ddlOptionData.ddlOptionId;
        ddlInput.name = ddlOptionData.ddlName;
        ddlInput.disabled = true;
        td.appendChild(ddlInput);

        //loop through ddlOptionData.ddlOption and create options
        ddlOptionData.ddlOption.forEach((option) => {
            const optionData: DropdownOptionDTO = {
                dropdownValue: option,
                dropdownTextContent: option
            };
            const ddlOption = this.CreateDropdownOption(optionData);
            ddlInput.appendChild(ddlOption);
        });

        return td;
    }

    public static CreateTableTextbox(txtOptionData: TxtOptionDTO): HTMLTableDataCellElement {
        const td = document.createElement("td") as HTMLTableDataCellElement;

        const txtInput = document.createElement("input") as HTMLInputElement;
        txtInput.classList.add("form-control", "mx-auto", "d-flex");
        txtInput.type = "text";
        txtInput.id = txtOptionData.txtOptionId;
        txtInput.name = txtOptionData.txtName;
        txtInput.disabled = true;
        td.appendChild(txtInput);

        return td;
    }

    public static CreateTableNumeric(numericOptionData: NumericOptionDTO): HTMLTableDataCellElement {
        const td = document.createElement("td") as HTMLTableDataCellElement;

        const numericInput = document.createElement("input") as HTMLInputElement;
        numericInput.classList.add("form-control", "mx-auto", "d-flex", "text-center");
        numericInput.type = "number";
        numericInput.id = numericOptionData.numericOptionId;
        numericInput.name = numericOptionData.numericName;
        numericInput.disabled = true;
        td.appendChild(numericInput);

        return td;
    }
    //#endregion
    //#endregion
}