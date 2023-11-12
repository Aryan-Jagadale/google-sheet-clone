// Storage
let collectedSheetDB = [];  //Contains all SheetDB
let sheetDB = [];

for (let i = 0; i < rows; i++) {
    let sheetRow = []
    for (let j = 0; j < columns; j++) {
      let cellProps = {
        bold:false,
        italic:false,
        underLine:false,
        alignment:"left",
        fontFamily:"monospace",
        fontSize:14,
        fontColor:"#000000",
        bgColor:"#000000"
      };
      sheetRow.push(cellProps)  
        
    }
    sheetDB.push(sheetRow)
}

// Selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//Two way binding---> Change in data as well as in UI

bold.addEventListener("click",(e)=>{
    let address = addressBar.value;
    let [cell,cellProp] =  activeCell(address);
    //Modification
    cellProp.bold = !cellProp.bold;//Data
    cell.style.fontWeight = cellProp.bold ? "bold"  :"normal";//UI change 1;
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)
})

function activeCell(address) {
    let [rid,cid] = decodeRIDCIDfromAddress(address);
    console.log("rid-->",rid,"cid-->",cid);
    //Access cell and storage
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid]
    return [cell,cellProp]
}

function decodeRIDCIDfromAddress(address) {
    let rowID = Number(address.slice(1)-1);
    let colID = Number(address.charCodeAt(0))-65;
    return [rowID,colID]
}

