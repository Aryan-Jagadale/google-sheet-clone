//Access cols and rows
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [activecell, cellProp] = activeCell(address);

      let enteredData = activecell.innerText;

      if (enteredData === cellProp.value) return;

      cellProp.value = enteredData;
      // If data modifies remove P-C relation, formula empty, update children with new hardcoded (modified) value
      removeChildFromParent(cellProp.formula);
      cellProp.formula = "";
      updateChildrenCells(address);
    });
  }
}

let formulaBar = document.querySelector(".formula-bar");

formulaBar.addEventListener("keydown", (e) => {
  let inputValue = formulaBar.value;
  if (e.key === "Enter" && inputValue) {
    //If change in formula break p-c relationship, vealaute new formula and add new Relationship
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    if (inputValue !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    let evalutaed = evaluateFormula(inputValue); //Data
    setCellUIAndCellProp(evalutaed, inputValue, address);
    //Establish Parent-Child relationship
    addChildToParent(inputValue);
    //console.log(sheetDB[0]);
    updateChildrenCells(address);
  }
});

function updateChildrenCells(parentAddress) {
  let [parentCell, parentCellProp] = activeCell(parentAddress);
  let children = parentCellProp.children;

  for (let i = 0; i < children.length; i++) {
    let childAddress = children[i];
    let [childCell, childCellProp] = activeCell(childAddress);
    let childFormula = childCellProp.formula;
    let evaluedtValue = evaluateFormula(childFormula);
    setCellUIAndCellProp(evaluedtValue, childFormula, childAddress);
    updateChildrenCells(childAddress);
  }
}

function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      let idx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function evaluateFormula(formula) {
  let encodedFormula = formula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = activeCell(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }
  let deocdedFormula = encodedFormula.join(" ");
  return eval(deocdedFormula);
}

function setCellUIAndCellProp(value, formula, address) {
  let [cell, cellProp] = activeCell(address);

  //UI changes
  cell.innerText = value;
  cellProp.value = value;
  cellProp.formula = formula;
}
