class Utilities {
    //#region Boostrap Modals
    BTSP_GetOffCanvas(selector) {
        const offCanvasElement = document.querySelector(selector);
        return new bootstrap.Offcanvas(offCanvasElement);
    }
    BTSP_OpenOffCanvas(offCanvas) {
        offCanvas.show();
    }
    BTSP_CloseOffCanvas(offCanvas) {
        offCanvas.hide();
    }
    //#endregion
    //#region TinyMCE
    InitTinyMCE(tinymce, editorSelector) {
        // Initialize tinymce editor
        tinymce.init({
            selector: editorSelector
        });
    }
    AddTinymceListeners(tinymce, element, callback) {
        const btnTinymceUpgrade = document.querySelector('.tox-promotion');
        btnTinymceUpgrade.classList.add("hideElement");
        const iconTinymce = document.querySelector('.tox-statusbar__branding');
        iconTinymce.classList.add("hideElement");
        //add input event listner for tinymce
        tinymce.activeEditor.getBody().oninput = (ev) => {
            if (ev.target) {
                //update paragraph element
                callback(tinymce, element);
            }
        };
    }
    //#endregion
    //#region Form Utils
    RgbToHex(rgbVal) {
        const rgb = rgbVal.substring(4, rgbVal.length - 1).replace(/ /g, '').split(',');
        const r = parseInt(rgb[0], 10).toString(16);
        const g = parseInt(rgb[1], 10).toString(16);
        const b = parseInt(rgb[2], 10).toString(16);
        const hex = "#" + r + g + b;
        return hex;
    }
    CreateDropdownOption(ddlOptionData) {
        const ddlOption = document.createElement("option");
        ddlOption.value = ddlOptionData.dropdownValue;
        ddlOption.textContent = ddlOptionData.dropdownTextContent;
        return ddlOption;
    }
    CreateSingleChoiceOption(scOptionData) {
        const divSinglChoiceWrapper = document.createElement("div");
        divSinglChoiceWrapper.classList.add("form-check");
        const singleChoiceInput = document.createElement("input");
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        singleChoiceInput.disabled = true;
        divSinglChoiceWrapper.appendChild(singleChoiceInput);
        const singleChoiceLabel = document.createElement("label");
        singleChoiceLabel.classList.add("form-check-label");
        singleChoiceLabel.htmlFor = scOptionData.singleChoiceOptionId;
        singleChoiceLabel.textContent = scOptionData.singleChoiceOptionTextContent;
        divSinglChoiceWrapper.appendChild(singleChoiceLabel);
        return divSinglChoiceWrapper;
    }
    CreateMultipleChoiceOption(mcOptionData) {
        const divCheckboxOption = document.createElement("div");
        divCheckboxOption.classList.add("form-check");
        const checkboxInput = document.createElement("input");
        checkboxInput.classList.add("form-check-input");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        checkboxInput.disabled = true;
        divCheckboxOption.appendChild(checkboxInput);
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("form-check-label");
        checkboxLabel.htmlFor = mcOptionData.multipleChoiceOptionId;
        checkboxLabel.textContent = mcOptionData.multipleChoiceOptionTextContent;
        divCheckboxOption.appendChild(checkboxLabel);
        return divCheckboxOption;
    }
    //#region Table
    CreateTableHeader(tableHeaderVal) {
        const thQuestion = document.createElement("th");
        thQuestion.scope = "col";
        thQuestion.textContent = tableHeaderVal;
        return thQuestion;
    }
    CreateTableBody(tableBodyData) {
        const tdQuestion = document.createElement("td");
        tdQuestion.textContent = tableBodyData;
        return tdQuestion;
    }
    CreateTable(tblHeaderData, tableBodyData, inputType) {
        const table = document.createElement("table");
        table.classList.add("table", "table-striped", "table-bordered", "border-primary");
        const thead = document.createElement("thead");
        table.appendChild(thead);
        const trHeaderRow = document.createElement("tr");
        thead.appendChild(trHeaderRow);
        tblHeaderData.forEach((col) => {
            const th = this.CreateTableHeader(col);
            trHeaderRow.appendChild(th);
        });
        const slicedTblHeaderData = tblHeaderData.slice(1);
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        tableBodyData.forEach((row) => {
            const tr = document.createElement("tr");
            tbody.appendChild(tr);
            const th = document.createElement("th");
            th.scope = "row";
            th.textContent = row;
            tr.appendChild(th);
            for (let i = 0; i < slicedTblHeaderData.length; i++) {
                switch (inputType) {
                    case "SingleChoice":
                        const singleChoiceData = {
                            singleChoiceOptionId: "scOption" + i,
                            singleChoiceElName: row,
                            singleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const scOptionData = this.CreateTableSingleChoiceOption(singleChoiceData);
                        tr.appendChild(scOptionData);
                        break;
                    case "MultipleChoice":
                        const name = row.split(" ").join("_");
                        const data = {
                            multipleChoiceOptionId: `${name}_${i}`,
                            multipleChoiceElName: `${name}_${i}`,
                            multipleChoiceOptionValue: slicedTblHeaderData[i],
                            multipleChoiceOptionTextContent: slicedTblHeaderData[i]
                        };
                        const mcOptionData = this.CreateTableMultipleChoiceOption(data);
                        tr.appendChild(mcOptionData);
                        break;
                    case "Dropdown":
                        const dropdownData = {
                            ddlOptionId: `ddlOption${i}`,
                            ddlName: row,
                            ddlOption: slicedTblHeaderData,
                        };
                        const ddlOptionData = this.CreateTableDropdown(dropdownData);
                        tr.appendChild(ddlOptionData);
                        break;
                    case "Textbox":
                        const textboxData = {
                            txtOptionId: `txtOption${i}`,
                            txtName: row
                        };
                        const txtOptionData = this.CreateTableTextbox(textboxData);
                        tr.appendChild(txtOptionData);
                        break;
                    case "Numeric":
                        const numericData = {
                            numericOptionId: `txtOption${i}`,
                            numericName: row
                        };
                        const numericOptionData = this.CreateTableNumeric(numericData);
                        tr.appendChild(numericOptionData);
                }
                ;
            }
        });
        return table;
    }
    CreateTableSingleChoiceOption(scOptionData) {
        const td = document.createElement("td");
        const singleChoiceInput = document.createElement("input");
        singleChoiceInput.type = "radio";
        singleChoiceInput.id = scOptionData.singleChoiceOptionId;
        singleChoiceInput.classList.add("form-check-input", "mx-auto", "d-flex");
        singleChoiceInput.name = scOptionData.singleChoiceElName;
        singleChoiceInput.value = scOptionData.singleChoiceOptionTextContent;
        singleChoiceInput.disabled = true;
        td.appendChild(singleChoiceInput);
        return td;
    }
    CreateTableMultipleChoiceOption(mcOptionData) {
        const td = document.createElement("td");
        const checkboxInput = document.createElement("input");
        checkboxInput.classList.add("form-check-input", "mx-auto", "d-flex");
        checkboxInput.type = "checkbox";
        checkboxInput.id = mcOptionData.multipleChoiceOptionId;
        checkboxInput.name = mcOptionData.multipleChoiceElName;
        checkboxInput.value = mcOptionData.multipleChoiceOptionValue;
        checkboxInput.disabled = true;
        td.appendChild(checkboxInput);
        return td;
    }
    CreateTableDropdown(ddlOptionData) {
        const td = document.createElement("td");
        const ddlInput = document.createElement("select");
        ddlInput.classList.add("form-select");
        ddlInput.id = ddlOptionData.ddlOptionId;
        ddlInput.name = ddlOptionData.ddlName;
        ddlInput.disabled = true;
        td.appendChild(ddlInput);
        //loop through ddlOptionData.ddlOption and create options
        ddlOptionData.ddlOption.forEach((option) => {
            const optionData = {
                dropdownValue: option,
                dropdownTextContent: option
            };
            const ddlOption = this.CreateDropdownOption(optionData);
            ddlInput.appendChild(ddlOption);
        });
        return td;
    }
    CreateTableTextbox(txtOptionData) {
        const td = document.createElement("td");
        const txtInput = document.createElement("input");
        txtInput.classList.add("form-control", "mx-auto", "d-flex");
        txtInput.type = "text";
        txtInput.id = txtOptionData.txtOptionId;
        txtInput.name = txtOptionData.txtName;
        txtInput.disabled = true;
        td.appendChild(txtInput);
        return td;
    }
    CreateTableNumeric(numericOptionData) {
        const td = document.createElement("td");
        const numericInput = document.createElement("input");
        numericInput.classList.add("form-control", "mx-auto", "d-flex", "text-center");
        numericInput.type = "number";
        numericInput.id = numericOptionData.numericOptionId;
        numericInput.name = numericOptionData.numericName;
        numericInput.disabled = true;
        td.appendChild(numericInput);
        return td;
    }
}
//# sourceMappingURL=Utilities.js.map