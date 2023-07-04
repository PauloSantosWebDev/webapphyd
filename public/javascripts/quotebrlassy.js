//General functions - Start

//Global variables definition
let brlAssyMatlLine = 5;
let brlAssyLabourLine = 5;
let brlAssyServLine = 5;

let isPrevious = false;


//General functions - End

//Giving input fiels some default values
document.getElementById('inputPart0').value = 'Barrel';
document.getElementById('inputPart1').value = 'End cap';

//Add listeners to barrel assembly material part lines
function listenBrlMatlChange() {
  document.querySelectorAll('.js-part').forEach((e, i) => {
    e.addEventListener('keyup', () => {
      document.querySelectorAll('.js-lab-part')[i].value = e.value;
    })
    e.addEventListener('change', () => {
      document.querySelectorAll('.js-lab-part')[i].value = e.value;
    })
  })
}
listenBrlMatlChange();

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Add new lines to the material session of the barrel assembly page
document.getElementById('js-new-line-brl-matl').addEventListener('click', () => {
  
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

  document.getElementById('js-first-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-part js-save" id="inputPart${brlAssyMatlLine}" name="inputPart${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputHydroilId${brlAssyMatlLine}" name="inputHydroilId${brlAssyMatlLine}" class="form-select js-save">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control js-save" id="inputItem${brlAssyMatlLine}" name="inputItem${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputSupplier${brlAssyMatlLine}" name="inputSupplier${brlAssyMatlLine}" class="form-select js-save">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-1"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control js-save" id="inputCost${brlAssyMatlLine}" name="inputCost${brlAssyMatlLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control js-save" id="inputUsage${brlAssyMatlLine}" name="inputUsage${brlAssyMatlLine}">
  </div>
  <div class="col-md-2"> 
    <input type="number" min="0.00" class="form-control js-save" id="inputSubTotal${brlAssyMatlLine}" name="inputSubTotal${brlAssyMatlLine}">
  </div>`;
  brlAssyMatlLine++;
  listenBrlMatlChange();
  console.log('array length: ' + arrayMatlInfo.length);
  // console.log('array part: ' + arrayMatlInfo[0].part);
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
    // document.querySelector('.js-save').value = arrayMatlInfo[i].part;
  }
})

//Add new lines to the labour session of the barrel assembly page.
document.getElementById('js-new-line-brl-labour').addEventListener('click', () => {
  document.getElementById('js-second-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-lab-part" id="inputLabourPart${brlAssyLabourLine}" name="inputLabourPart${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control" id="inputMC${brlAssyLabourLine}" name="inputMC${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control" id="inputNC${brlAssyLabourLine}" name="inputNC${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control" id="inputWelding${brlAssyLabourLine}" name="inputWelding${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control" id="inputHonning${brlAssyLabourLine}" name="inputHonning${brlAssyLabourLine}">
  </div>
  <div class="col-md-1">
  <input type="number" min="0.00" class="form-control" id="inputAssy${brlAssyLabourLine}" name="inputAssy${brlAssyLabourLine}">
  </div>
  <div class="col-md-2"> 
  <input type="number" min="0.00" class="form-control" id="inputLabourSubTotal${brlAssyLabourLine}" name="inputLabourSubTotal${brlAssyLabourLine}">
  </div>
  <div class="col-md-2"> 
  <input type="hidden">
  </div>`;
  brlAssyLabourLine++;
  listenBrlMatlChange();
})

//Add new lines to the service session of the barrel assembly page.
document.getElementById('js-new-line-brl-serv').addEventListener('click', () => {
  document.getElementById('js-third-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-serv-part" id="inputServicePart${brlAssyServLine}" name="inputServicePart${brlAssyServLine}">
  </div>
  <div class="col-md-2">
    <select id="inputServiceCode${brlAssyServLine}" name="inputServiceCode${brlAssyServLine}" class="form-select">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control" id="inputService${brlAssyServLine}" name="inputService${brlAssyServLine}">
  </div>
  <div class="col-md-2">
    <select id="inputServiceSupplier${brlAssyServLine}" name="inputServiceSupplier${brlAssyServLine}" class="form-select">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-1"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control" id="inputServiceCost${brlAssyServLine}" name="inputServiceCost${brlAssyServLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control" id="inputServiceUsage${brlAssyServLine}" name="inputServiceUsage${brlAssyServLine}">
  </div>
  <div class="col-md-2"> 
    <input type="number" min="0.00" class="form-control" id="inputServiceSubTotal${brlAssyServLine}" name="inputServiceSubTotal${brlAssyServLine}">
  </div>`;
  brlAssyServLine++;
})

document.body.addEventListener('click', () => {
  isPrevious = true;
  sessionStorage.setItem('firstPrevious', true);
})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



