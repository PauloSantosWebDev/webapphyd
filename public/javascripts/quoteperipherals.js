//General functions - Start

//Global variables definition
let brlAssyMatlLine = 5;
let htmlAccumulator = '';
let htmlAccumulatorSupplier = '';
let isNext = false;

//Global arrays definition

//Used to create new lines keeping the data
let arrayColumns = [];
let arrayRows = [];
let serverHydroilId = [];
let serverSupplierNames = [];

//Used to save the data in the sessionStorage
//Data will be used to populate sql database and in case the page is reloaded
function saveDataForReload() {
  sessionStorage.setItem('peripheralsMatlLines', brlAssyMatlLine);
  const arrayStoreData = [];
  document.querySelectorAll('.js-store-data').forEach((e, i) => {
    arrayStoreData.push(e.value);
  });
  sessionStorage.setItem('storeDataPeripherals', arrayStoreData);
  location.assign('http://localhost:3000/quotemarkup');
}

//Used to populate back when previous is clicked in the next page
function populateBack () {
  let iteration = Number(sessionStorage.getItem('peripheralsMatlLines'));
  for (let i = 0; i < (iteration - 5); i++) {
    document.getElementById('js-new-line-brl-matl').click();
  }
  let arrayStoreData = sessionStorage.getItem('storeDataPeripherals');
  arrayStoreData = arrayStoreData.split(',');
  setTimeout(() => {
    document.querySelectorAll('.js-store-data').forEach((e, i) => {
      e.value = arrayStoreData[i];
    })
  }, 1000);

  sessionStorage.setItem('seventhPrevious', false);
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Asynchronous functions setction - Start

//Used to fetch data to feed dropdown fields
//Used to get labour costs for the labour session
async function addIdCode (target) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target})
  };
  try {
    const response = await fetch("/quoteperipherals", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Used to fetch suppliers, items and cost for materials
async function getInfo(target, value) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target, value})
  };
  try {
    const response = await fetch("/quoteperipherals", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Used to fetch cost for materials depending on the supplier chosen
async function getCost(target, value, name) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target, value, name})
  };
  try {
    const response = await fetch("/quoteperipherals", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Asynchronous functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Loads page with functionalities it needs when page is loaded
window.addEventListener('load', () => {
  dependenceFieldsUpdate();
  if (sessionStorage.getItem('seventhPrevious') === 'true') {
    populateBack();
  }
  isNext = false;
})

//Code to check if user really want to leave or reload the page
window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

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
  //Used for Hydroil ID
  if (htmlAccumulator === '') {
    serverHydroilId = await addIdCode('hydId');
    serverHydroilId.forEach(e => {
      htmlAccumulator += `<option value="${e.id}">${e.id}</option>`;
    })    
  }

  //Used as a guard to avoid fetching all the time the add new line button is clicked
  //Used for suppliers
  if (htmlAccumulatorSupplier === '') {
    serverSupplierNames = await addIdCode('supplierNames');
    serverSupplierNames.forEach(e => {
      htmlAccumulatorSupplier += `<option value="${e.name}">${e.name}</option>`;
    })    
  }
  
  document.getElementById('js-first-form-add-lines').innerHTML += `<div class="col-md-2">
  <input type="text" class="form-control js-part js-save js-store-data" id="inputPart${brlAssyMatlLine}" name="inputPart${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputHydroilId${brlAssyMatlLine}" name="inputHydroilId${brlAssyMatlLine}" class="form-select js-save js-hyd-id js-store-data">
      <option></option>
      ${htmlAccumulator}
    </select>
  </div>
  <div class="col-md-2">
    <input type="text" class="form-control js-save js-item js-store-data" id="inputItem${brlAssyMatlLine}" name="inputItem${brlAssyMatlLine}">
  </div>
  <div class="col-md-2">
    <select id="inputSupplier${brlAssyMatlLine}" name="inputSupplier${brlAssyMatlLine}" class="form-select js-save js-supplier js-store-data input-off" tabindex="-1">
      <option></option>
      ${htmlAccumulatorSupplier}
    </select>
  </div>
  <div class="col-md-2"> <!--Here the cost per unit should be specified-->
    <input type="text" class="form-control js-save js-cost js-store-data input-off" id="inputCost${brlAssyMatlLine}" name="inputCost${brlAssyMatlLine}" tabindex="-1">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control js-save js-usage js-store-data" id="inputUsage${brlAssyMatlLine}" name="inputUsage${brlAssyMatlLine}">
  </div>
  <div class="col-md-1"> 
    <input type="number" min="0.00" class="form-control js-save js-subtotal input-off js-store-data" id="inputSubTotal${brlAssyMatlLine}" name="inputSubTotal${brlAssyMatlLine}" tabindex=-1>
  </div>`;
  brlAssyMatlLine++;
  dependenceFieldsUpdate();
  //Used to insert the data back after another line is added
  for (let i = 0; i < arrayMatlInfo.length; i++) {
    for (let j = 0; j <= 6; j++) {
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

//Necessary to re-populate data in the quoteone page.
document.getElementById('js-sixth-previous').addEventListener('click', () => {
  sessionStorage.setItem('sixthPrevious', true);
})

//Used to add listener and update other fields accordingly
//Is triggered when page is loaded and also when a new line is added
function dependenceFieldsUpdate() {
  //Updates the supplier and cost when the Hydroil ID is chosen
  document.querySelectorAll('.js-hyd-id').forEach(async (e, i) => {
    e.addEventListener('change', async () => {
      document.querySelectorAll('.js-supplier')[i].removeAttribute('tabindex');
      document.querySelectorAll('.js-supplier')[i].classList.remove('input-off');
      const item = await getInfo('matlItem', e.value);
      document.querySelectorAll('.js-item')[i].value = item[0].item;
      const arraySuppliers = await getInfo('matlSupplier', e.value);
      let accumHTML = '';
      arraySuppliers.forEach(elem => {
        accumHTML += `<option>${elem.name}</option>`
      })
      document.querySelectorAll('.js-supplier')[i].innerHTML = accumHTML;
      document.querySelectorAll('.js-usage')[i].value = '';
      document.querySelectorAll('.js-subtotal')[i].value = '';
    })
  })

  //Updates the cost depending on the supplier and hydroil id
  document.querySelectorAll('.js-supplier').forEach(async (e, i) => {
    e.addEventListener('change', async() => {
      const hydroiIdSelected = document.querySelectorAll('.js-hyd-id')[i].value;
      const cost = await getCost('matlCost', hydroiIdSelected, e.value);
      document.querySelectorAll('.js-cost')[i].value = `${cost[0].cost}/${cost[0].unit}`;
      document.querySelectorAll('.js-usage')[i].value = '';
      document.querySelectorAll('.js-subtotal')[i].value = '';
    })
    e.addEventListener('click', async() => {
      if (e.value == '') {
        return;
      }
      else {
        const hydroiIdSelected = document.querySelectorAll('.js-hyd-id')[i].value;
        const cost = await getCost('matlCost', hydroiIdSelected, e.value);
        document.querySelectorAll('.js-cost')[i].value = `${cost[0].cost}/${cost[0].unit}`;
      }
    })
  })
  
  //Used to calculate subtotal for materials
  document.querySelectorAll('.js-usage').forEach((e, i) => {
    e.addEventListener('change', () => {
      document.querySelectorAll('.js-subtotal')[i].value = (Number(e.value) * Number(document.querySelectorAll('.js-cost')[i].value.split('/')[0])).toFixed(2);
    })
    e.addEventListener('keyup', () => {
      document.querySelectorAll('.js-subtotal')[i].value = (Number(e.value) * Number(document.querySelectorAll('.js-cost')[i].value.split('/')[0])).toFixed(2);
    })
  })
}

//When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-seventh-next').addEventListener('click', () => {
  isNext = true;
  saveDataForReload();
})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



