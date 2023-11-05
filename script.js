let rows = 100;
let columns = 26;

let cellsCont = document.querySelector(".cells-cont");
let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");


for (let i = 0; i < rows; i++) {

    let addressCol = document.createElement("div");
    addressCol.setAttribute("class","address-col")
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol)
}

for (let j = 0; j < columns; j++) {

    let addressRow = document.createElement("div");
    addressRow.setAttribute("class","address-row")
    addressRow.innerText = String.fromCharCode(65 + j);
    addressRowCont.appendChild(addressRow)
}

for (let i = 0;i < rows;i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");

    for (let j = 0;j < columns;j++) {

        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");

        rowCont.appendChild(cell);
    }
    cellsCont.appendChild(rowCont);
}

