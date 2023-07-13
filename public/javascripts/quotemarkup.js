//General functions - Start

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
    subTotal = (Number(assyData[i]) + Number(assyData[i + 7 * assyLines]) + Number(assyData[i + 14 * assyLines])).toFixed(2);
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

//Loading barrel assembly table
tableLoader('storeDataBrlAssy', 'brlAssyMatlLines', 'js-tbl-brl-assy', 'js-markup-brl', 'js-price-brl');

//Loading rod assembly table
tableLoader('storeDataRodAssy', 'rodAssyMatlLines', 'js-tbl-rod-assy', 'js-markup-rod', 'js-price-rod');

//Loading gland assembly table
tableLoader('storeDataGldAssy', 'gldAssyMatlLines', 'js-tbl-gld-assy', 'js-markup-gld', 'js-price-gld');



//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



