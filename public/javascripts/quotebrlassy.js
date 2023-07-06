//General functions - Start

//Global variables definition
let brlAssyMatlLine = 5;
let brlAssyLabourLine = 5;
let brlAssyServLine = 5;
let htmlAccumulator = '';
let htmlAccumulatorServ = '';

//Global arrays definition

//Used to create new lines keeping the data
let arrayColumns = [];
let arrayRows = [];
let serverHydroilId = [];
let serverServiceCode = [];

//Object with 2 functions to keep data when lines are added to forms
const keepDataNewLine = {
  saveData(rows, columns, classId) {
    arrayColumns = [];
    for (i = 0; i < rows; i++) {
      arrayRows = [];
      for (j = 0; j < columns; j++) {
        arrayRows[j] = document.querySelectorAll('.' + classId)[(i*columns)+j].value;
      }
      arrayColumns.push(arrayRows);
    }
  },
  populateData(rows, columns, classId) {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        document.querySelectorAll('.' + classId)[(i*columns)+j].value = arrayColumns[i][j];
      }
    }
  }
}

//Giving input fiels some default values
document.getElementById('inputServicePart0').value = document.getElementById('inputLabourPart0').value = document.getElementById('inputPart0').value = 'Barrel';
document.getElementById('inputServicePart1').value = document.getElementById('inputLabourPart1').value = document.getElementById('inputPart1').value = 'End cap';

//Add listeners to barrel assembly material part lines
function listenBrlMatlChange() {
  if (brlAssyLabourLine >= brlAssyMatlLine) {
    document.querySelectorAll('.js-part').forEach((e, i) => {
      e.addEventListener('keyup', () => {
        document.querySelectorAll('.js-lab-part')[i].value = e.value;
      })
      e.addEventListener('change', () => {
        document.querySelectorAll('.js-lab-part')[i].value = e.value;
      })
    })
  }
  if (brlAssyServLine >= brlAssyMatlLine) {
    document.querySelectorAll('.js-part').forEach((e, i) => {
      e.addEventListener('keyup', () => {
        document.querySelectorAll('.js-serv-part')[i].value = e.value;
      })
      e.addEventListener('change', () => {
        document.querySelectorAll('.js-serv-part')[i].value = e.value;
      })
    })
  }
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Asynchronous functions setction - Start

//Used to fetch data to feed dropdown fields
async function addIdCode (target) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target})
  };
  try {
    const response = await fetch("/quotebrlassy", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Used to fetch suppliers, items and cost for materials
async function getSupplier(target, value) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target, value})
  };
  try {
    const response = await fetch("/quotebrlassy", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

// //Used to fetch items for materials
// async function getItem(target, value) {
//   const options = {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({target, value})
//   };
//   try {
// }

//Asynchronous functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

window.addEventListener('load', () => {
  listenBrlMatlChange();
  dependenceFieldsUpdate();
})

//Add new lines to the material session of the barrel assembly page
document.getElementById('js-new-line-brl-matl').addEventListener('click', async () => {
  
  const matlInfo = {
    part: '',
    hydroilId: '',
    item: '',
    supplier: '',
    cost: '',
    usage: '',
    subtotal: ''
  }
  let arrayMatlInfo = [];
  
  //for used to get all the data already inserted into the fields
  for(i = 0; i <= (brlAssyMatlLine - 6); i++) {
    for(j = 0; j <= 6; j++) {
      if (j === 0) {
        matlInfo.part = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 1) {
        matlInfo.hydroilId = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 2) {
        matlInfo.item = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 3) {
        matlInfo.supplier = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 4) {
        matlInfo.cost = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 5) {
        matlInfo.usage = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
      else if (j === 6) {
        matlInfo.subtotal = document.querySelectorAll('.js-save')[(i*7)+j].value;
      }
    }
    arrayMatlInfo[i] = Object.assign({}, matlInfo);
  }

  //Used as a guard to avoid fetching all the time the add new line button is clicked
  if (htmlAccumulator === '') {
    serverHydroilId = await addIdCode('hydId');
    serverHydroilId.forEach(e => {
      htmlAccumulator += `<option value="${e.id}">${e.id}</option>`;
    })    
  }
  
  document.getElementById('js-first-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-part js-save" id="inputPart${brlAssyMatlLine}" name="inputPart${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputHydroilId${brlAssyMatlLine}" name="inputHydroilId${brlAssyMatlLine}" class="form-select js-save js-hyd-id">
      <option></option>
      ${htmlAccumulator}
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control js-save js-item" id="inputItem${brlAssyMatlLine}" name="inputItem${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputSupplier${brlAssyMatlLine}" name="inputSupplier${brlAssyMatlLine}" class="form-select js-save js-supplier">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-1"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control js-save js-cost" id="inputCost${brlAssyMatlLine}" name="inputCost${brlAssyMatlLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control js-save" id="inputUsage${brlAssyMatlLine}" name="inputUsage${brlAssyMatlLine}">
  </div>
  <div class="col-md-2"> 
    <input type="number" min="0.00" class="form-control js-save" id="inputSubTotal${brlAssyMatlLine}" name="inputSubTotal${brlAssyMatlLine}">
  </div>`;
  brlAssyMatlLine++;
  listenBrlMatlChange();
  dependenceFieldsUpdate();
  //Used to insert the data back after another line is added
  for (i = 0; i < arrayMatlInfo.length; i++) {
    for (j = 0; j <= 6; j++) {
      if (j === 0) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].part;
      }
      else if (j === 1) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].hydroilId;
      }
      else if (j === 2) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].item;
      }
      else if (j === 3) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].supplier;
      }
      else if (j === 4) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].cost;
      }
      else if (j === 5) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].usage;
      }
      else if (j === 6) {
        document.querySelectorAll('.js-save')[(i*7)+j].value = arrayMatlInfo[i].subtotal;
      }
    }
  }
})

//Add new lines to the labour session of the barrel assembly page.
document.getElementById('js-new-line-brl-labour').addEventListener('click', () => {

  keepDataNewLine.saveData((brlAssyLabourLine-5), 7, 'js-save-lab');
  // const arrayToParse = keepDataNewLine.saveData((brlAssyLabourLine-5), 7, 'js-save-lab');

  document.getElementById('js-second-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-lab-part js-save-lab" id="inputLabourPart${brlAssyLabourLine}" name="inputLabourPart${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputMC${brlAssyLabourLine}" name="inputMC${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputNC${brlAssyLabourLine}" name="inputNC${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputWelding${brlAssyLabourLine}" name="inputWelding${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputHonning${brlAssyLabourLine}" name="inputHonning${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputAssy${brlAssyLabourLine}" name="inputAssy${brlAssyLabourLine}">
  </div>
  <div class="col-md-2"> 
  <input type="number" min="0.00" class="form-control js-save-lab" id="inputLabourSubTotal${brlAssyLabourLine}" name="inputLabourSubTotal${brlAssyLabourLine}">
  </div>
  <div class="col-md-2"> 
  <input type="hidden">
  </div>`;
  keepDataNewLine.populateData((brlAssyLabourLine-5), 7, 'js-save-lab');
  brlAssyLabourLine++;
  listenBrlMatlChange();
})

//Add new lines to the service session of the barrel assembly page.
document.getElementById('js-new-line-brl-serv').addEventListener('click', async () => {
  keepDataNewLine.saveData((brlAssyServLine-5), 7, 'js-save-serv');
  
  //Used as a guard to guarantee that the data needed is fetched only once, not everytime the button is clicked.
  if (htmlAccumulatorServ === '') {
    serverServiceCode = await addIdCode('serviceCode');
    serverServiceCode.forEach(e => {
      htmlAccumulatorServ += `<option value="${e.id}">${e.id}</option>`;
    })
  }
  document.getElementById('js-third-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-serv-part js-save-serv" id="inputServicePart${brlAssyServLine}" name="inputServicePart${brlAssyServLine}">
  </div>
  <div class="col-md-2">
    <select id="inputServiceCode${brlAssyServLine}" name="inputServiceCode${brlAssyServLine}" class="form-select js-save-serv">
      <option></option>
      ${htmlAccumulatorServ}
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control js-save-serv" id="inputService${brlAssyServLine}" name="inputService${brlAssyServLine}">
  </div>
  <div class="col-md-2">
    <select id="inputServiceSupplier${brlAssyServLine}" name="inputServiceSupplier${brlAssyServLine}" class="form-select js-save-serv">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-1"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control js-save-serv" id="inputServiceCost${brlAssyServLine}" name="inputServiceCost${brlAssyServLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control js-save-serv" id="inputServiceUsage${brlAssyServLine}" name="inputServiceUsage${brlAssyServLine}">
  </div>
  <div class="col-md-2"> 
    <input type="number" min="0.00" class="form-control js-save-serv" id="inputServiceSubTotal${brlAssyServLine}" name="inputServiceSubTotal${brlAssyServLine}">
  </div>`;
  keepDataNewLine.populateData((brlAssyServLine-5), 7, 'js-save-serv');
  brlAssyServLine++;
  listenBrlMatlChange();
})

//Necessary to re-populate data in the quoteone page.
document.getElementById('js-first-previous').addEventListener('click', () => {
  sessionStorage.setItem('firstPrevious', true);
})

//Used to add listener and update other fields accordingly
//Is triggered when page is loaded and also when a new line is added
function dependenceFieldsUpdate() {
  //Updates the supplier when the Hydroil ID is chosen
  document.querySelectorAll('.js-hyd-id').forEach(async (e, i) => {
    e.addEventListener('change', async () => {
      const item = await getSupplier('matlItem', e.value);
      document.querySelectorAll('.js-item')[i].value = item[0].item;
      const arraySuppliers = await getSupplier('matlSupplier', e.value);
      let accumHTML = '';
      arraySuppliers.forEach(elem => {
        accumHTML += `<option>${elem.name}</option>`
      })
      document.querySelectorAll('.js-supplier')[i].innerHTML = accumHTML;
      const cost = await getSupplier('matlCost', e.value);
      document.querySelectorAll('.js-cost')[i].value = cost[0].cost;
    })
  })
}
//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



