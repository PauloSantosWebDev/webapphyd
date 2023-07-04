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
  document.getElementById('js-first-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-part" id="inputPart${brlAssyMatlLine}" name="inputPart${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputHydroilId${brlAssyMatlLine}" name="inputHydroilId${brlAssyMatlLine}" class="form-select">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control" id="inputItem${brlAssyMatlLine}" name="inputItem${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputSupplier${brlAssyMatlLine}" name="inputSupplier${brlAssyMatlLine}" class="form-select">
      <option>...</option>
    </select>
  </div>
  <div class="col-md-1"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control" id="inputCost${brlAssyMatlLine}" name="inputCost${brlAssyMatlLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control" id="inputUsage${brlAssyMatlLine}" name="inputUsage${brlAssyMatlLine}">
  </div>
  <div class="col-md-2"> 
    <input type="number" min="0.00" class="form-control" id="inputSubTotal${brlAssyMatlLine}" name="inputSubTotal${brlAssyMatlLine}">
  </div>`;
  brlAssyMatlLine++;
  listenBrlMatlChange();
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



