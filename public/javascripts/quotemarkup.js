//General functions - Start

let isNext = false;

//Used to get the information and load on the table so that the markup can be done
function tableLoader(dataSource, linesNumber, destinationTable, classMarkup, classPrice) {
  const assyData = sessionStorage.getItem(dataSource).split(',');
  const assyLines = sessionStorage.getItem(linesNumber);

  const arrayParts = [];
  const arraySub = [];
  let accumHTML = '';
  let subTotal = 0;

  for (let i = 0; i < 7 * assyLines; i = i + 7) {
    arrayParts.push(assyData[i]);
  }
  for (let i = 6; i < 7 * assyLines; i = i + 7) {
    if (destinationTable === 'js-tbl-seals' || destinationTable === 'js-tbl-fasteners' || destinationTable === 'js-tbl-peripherals') {
      subTotal = (Number(assyData[i])).toFixed(2);
    } 
    else {
      subTotal = (Number(assyData[i]) + Number(assyData[i + 7 * assyLines]) + Number(assyData[i + 14 * assyLines])).toFixed(2);
    }
    // subTotal = (Number(assyData[i]) + Number(assyData[i + 7 * assyLines]) + Number(assyData[i + 14 * assyLines])).toFixed(2);
    arraySub.push(subTotal);
    subTotal = 0;
  }

  arrayParts.forEach((e, i) => {
    accumHTML += `<tr>
    <th scope='row' class="text-center">${i + 1}</th>
    <td class="text-center">${e}</td>
    <td class="text-center">${arraySub[i]}</td>
    <td class="text-center"><input type='number' min="0.00" step="0.25" class="js-markup css-input ${classMarkup}"></td>
    <td class="text-center"><input type='number' min="0.00" step="0.25" class="js-price input-off css-input-price ${classPrice}" tabindex="-1"></td>
    </tr>`;
  })
  document.getElementById(destinationTable).innerHTML = accumHTML;
  document.querySelectorAll('.' + classPrice).forEach((e, i) => {
    e.value = arraySub[i];
  })

  document.querySelectorAll('.' + classMarkup).forEach((e, i) => {
    e.addEventListener('keyup', () => {
      document.querySelectorAll('.' + classPrice)[i].value = (Number(e.value/100) * Number(arraySub[i]) + Number(arraySub[i])).toFixed(2);
    })
    e.addEventListener('change', () => {
      document.querySelectorAll('.' + classPrice)[i].value = (Number(e.value/100) * Number(arraySub[i]) + Number(arraySub[i])).toFixed(2);
    })
  })
}

function buildPage () {
  //Loading barrel assembly table
  tableLoader('storeDataBrlAssy', 'brlAssyMatlLines', 'js-tbl-brl-assy', 'js-markup-brl', 'js-price-brl');

  //Loading rod assembly table
  tableLoader('storeDataRodAssy', 'rodAssyMatlLines', 'js-tbl-rod-assy', 'js-markup-rod', 'js-price-rod');

  //Loading gland assembly table
  tableLoader('storeDataGldAssy', 'gldAssyMatlLines', 'js-tbl-gld-assy', 'js-markup-gld', 'js-price-gld');

  //Loading seals table
  tableLoader('storeDataSeals', 'sealsMatlLines', 'js-tbl-seals', 'js-markup-seals', 'js-price-seals');

  //Loading fasteners table
  tableLoader('storeDataFasteners', 'fastenersMatlLines', 'js-tbl-fasteners', 'js-markup-fasteners', 'js-price-fasteners');

  //Loading peripherals table
  tableLoader('storeDataPeripherals', 'peripheralsMatlLines', 'js-tbl-peripherals', 'js-markup-peripherals', 'js-price-peripherals');


  //Loading session apply buttons
  sessionMarkupApply('js-btn-all-apply', '.js-markup', 'js-input-all-apply');

  sessionMarkupApply('js-btn-brl-apply', '.js-markup-brl', 'js-input-brl-apply');

  sessionMarkupApply('js-btn-rod-apply', '.js-markup-rod', 'js-input-rod-apply');

  sessionMarkupApply('js-btn-gld-apply', '.js-markup-gld', 'js-input-gld-apply');

  sessionMarkupApply('js-btn-seals-apply', '.js-markup-seals', 'js-input-seals-apply');

  sessionMarkupApply('js-btn-fasteners-apply', '.js-markup-fasteners', 'js-input-fasteners-apply');

  sessionMarkupApply('js-btn-peripherals-apply', '.js-markup-peripherals', 'js-input-peripherals-apply');
}

buildPage();

function saveDataForReload () {
  const arrayMarkup = [];
  document.querySelectorAll('.js-markup').forEach((e) => {
    arrayMarkup.push(e.value);
  })
  sessionStorage.setItem('markup', arrayMarkup);
  const arrayPrice = [];
  document.querySelectorAll('.js-price').forEach((e) => {
    arrayPrice.push(e.value);
  });
  sessionStorage.setItem('partsPrice', arrayPrice);
  window.location.pathname = '/quotefinal';
  // location.assign('http://localhost:3000/quotefinal');
}

function populateBack () {
  buildPage();
  const event = new Event('change');
  const arrayMarkup = sessionStorage.getItem('markup').split(',');
  arrayMarkup.forEach((e,i) => {
    document.querySelectorAll('.js-markup')[i].value = e;
    document.querySelectorAll('.js-markup')[i].dispatchEvent(event);
  })
  sessionStorage.setItem('eighthPrevious', false);
}

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

// Loads page with functionalities it needs when page is loaded
window.addEventListener('load', () => {
  if (sessionStorage.getItem('eighthPrevious') === 'true') {
    populateBack();
  }
  isNext = false;
})

// Code to check if user really want to leave or reload the page
window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

function sessionMarkupApply (btnId, markupClass, inputApplyId) {
  document.getElementById(btnId).addEventListener('click', () => {
    const event = new Event('change');
    document.querySelectorAll(markupClass).forEach((e) => {
      e.value = document.getElementById(inputApplyId).value;
      e.dispatchEvent(event);
    })
  })  
}

//Necessary to re-populate data in the peripherals page.
document.getElementById('js-seventh-previous').addEventListener('click', () => {
  sessionStorage.setItem('seventhPrevious', true);
})


//When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-eighth-next').addEventListener('click', () => {
  isNext = true;
  saveDataForReload();
})


//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



