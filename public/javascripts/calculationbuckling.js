//General functions - Start

let isThereRodID = false;

//Selector is used to indicate which conversion has to be performed. 1 = In to MM, 2 = MM to In.
function elementsConversion (elementYouAre, otherElement, selector) { 
  if (elementYouAre.value < 0 || elementYouAre.value === '') {
      emptyFields(elementYouAre, otherElement);
  }
  else {
      otherElement.value = conversion(elementYouAre.value, selector);
  }
}

//Used to convert a variety of numbers from one measurement unit to another
function conversion (origim, selector) {
  let resultDestiny = 0;
  switch (Number(selector)) {
      case 1:
          resultDestiny = origim * 254 / 10; //Conversion from inches to millimeters.
          break;
      case 2:
          resultDestiny = origim / 254 * 10; //Conversion from millimeters to inches.
          break;
      case 3:
          resultDestiny = origim / 1450377377 * 10000000; //Conversion from psi to MPa
          break;
      case 4:
          resultDestiny = origim / 1450377377 * 100000000; //Conversion from psi to Bar
          break;
      case 5:
          resultDestiny = origim * 1450377377 / 10000000; //Conversion from MPa to psi
          break;
      case 6:
          resultDestiny = origim * 10; //Conversion from MPa to bar
          break;
      case 7:
          resultDestiny = origim * 1450377377 / 100000000; //Conversion from bar to psi
          break;
      case 8:
          resultDestiny = origim / 10; //Conversion from bar to MPa
          break;
      case 9:
          resultDestiny = origim * 44482216153 / Math.pow(10,10); //Conversion from lbf to Newton
          break;
      case 10:
          resultDestiny = origim * 4535924 / Math.pow(10,10); //Conversion from lbf to ton-force
          break;
      case 11:
          resultDestiny = origim / 44482216153 * Math.pow(10,10); //Conversion from Newton to lbf
          break;
      case 12:
          resultDestiny = origim * 1019716 / Math.pow(10,10); //Conversion from Newton to ton-force
          break;
      case 13:
          resultDestiny = origim / 4535924 * Math.pow(10,10); //Conversion from ton-force to lbf
          break;
      case 14:
          resultDestiny = origim / 1019716 * Math.pow(10,10); //Conversion from ton-force to Newton
          break;
  }
  return resultDestiny.toFixed(2);
}

//Used to bring the fields back to showing placeholders' values
function emptyFields (first, second) {
  const fieldsToEmpty = [first, second];
  fieldsToEmpty.forEach((field) => field.value = '');
}

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Used to include the rod id in mm field
document.querySelectorAll('.js-radio-round-hollow').forEach((e) => {
  e.addEventListener('change', () => {
    if (document.getElementById('js-round-hollow-yes').checked) {
      document.getElementById('js-buckling-rod-id').innerHTML = 
      `<div class="col-md-3">
        <label for="inputRodIDInches" class="form-label">Rod ID - inches</label>
        <input type="number" min="0.00" step="0.01" class="form-control js-in-to-mm" id="inputRodIDInches" name="inputRodIDInches">
      </div>
      <div class="col-md-3" style="margin-left: 0; padding-left: 0;">
        <label for="inputRodID" class="form-label">Rod ID - millimeters</label>
        <input type="number" min="0.00" step="0.01" class="form-control js-mm-to-in" id="inputRodID" name="inputRodID">
      </div>`;
      isThereRodID = true;
      
      //Used to block Enter key default actions
      function blockReloadEnterKey () {
        document.getElementById('inputRodID').addEventListener('keydown', (element) => {
          if (element.key === 'Enter') {
            element.preventDefault();
            document.getElementById('js-calc-sf-buckling').click();
          }
        })
      }
      blockReloadEnterKey();

      //Used to add listeners for unit conversions
      conversionListener();
    }
    else {
      document.getElementById('js-buckling-rod-id').innerHTML = ``;
      isThereRodID = false;
    }
  })
})

//Used to calculate the safety factor and create the table to show user the safety factors
document.getElementById('js-calc-sf-buckling').addEventListener('click', () => {
  
  const youngsModulus = Number(document.getElementById('inputYoungsModulus').value) || 200;
  const pushPressWP = sessionStorage.getItem('push-press-mpa-for-calc');
  const pushPressTP = sessionStorage.getItem('test-press-mpa-for-calc');
  const barrelID = sessionStorage.getItem('bore-mm-for-calc');
  const pushForceWP = sessionStorage.getItem('push-force-wp-newton-for-calc');
  const pushForceTP = sessionStorage.getItem('push-force-tp-newton-for-calc');
  const rodOD = sessionStorage.getItem('rod-mm-for-calc');
  const columnLength = sessionStorage.getItem('open-centers-for-calc');
  let rodID = 0;
  let safetyFactorWP = 0;
  let safetyFactorTP = 0;
  let maxWP = 0, minRodOD = 0, maxRodID = 0, maxColumnLength = 0, maxBarrelID = 0, minYoungsModulus = 0; //Used to indicate minimum and maximum values that guarantee sf of 3:1
  

  if (document.getElementById('js-round-hollow-no').checked) {
    if (document.getElementById('inputEndCondition').value === 'endCondition1') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(16 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2)); //1000 is necessary as E should be in GPa.
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(16 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(48 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow(((48 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(48 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(48 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((48 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * Math.pow(rodOD, 4) * 1000)).toFixed(0);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition2') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(64 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(64 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(192 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow(((192 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(192 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(192 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((192 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * Math.pow(rodOD, 4) * 1000)).toFixed(0);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition3') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(8 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(8 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(24 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow(((24 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(24 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(24 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((24 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * Math.pow(rodOD, 4) * 1000)).toFixed(0);
    }
    else {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(4 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(4 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(12 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow(((12 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(12 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(12 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((12 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * Math.pow(rodOD, 4) * 1000)).toFixed(0);
    }
  }
  else {
    rodID = Number(document.getElementById('inputRodID').value).toFixed(4);
    if (document.getElementById('inputEndCondition').value === 'endCondition1') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(16 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2)); //1000 is necessary as E should be in GPa. Also Math.PI/4 is added to work with proper values.
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(16 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(48 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow((((48 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))) + Math.pow(rodID, 4)), 1/4)).toFixed(4);
      maxRodID = Number(Math.pow((Math.pow(rodOD, 4) - ((48 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2)))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(48 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(48 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((48 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)) * 1000)).toFixed(0);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition2') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(64 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(64 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(192 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow((((192 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))) + Math.pow(rodID, 4)), 1/4)).toFixed(4);
      maxRodID = Number(Math.pow((Math.pow(rodOD, 4) - ((192 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2)))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(192 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(192 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((192 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)) * 1000)).toFixed(0);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition3') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(8 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(8 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(24 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow((((24 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))) + Math.pow(rodID, 4)), 1/4)).toFixed(4);
      maxRodID = Number(Math.pow((Math.pow(rodOD, 4) - ((24 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2)))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(24 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(24 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((24 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)) * 1000)).toFixed(0);
    }
    else {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(4 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2));
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(4 * Math.pow(columnLength, 2) * pushPressTP * Math.pow(barrelID, 2));
      maxWP = Number((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(12 * Math.pow(columnLength, 2) * Math.pow(barrelID, 2))).toFixed(2);
      minRodOD = Number(Math.pow((((12 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2))) + Math.pow(rodID, 4)), 1/4)).toFixed(4);
      maxRodID = Number(Math.pow((Math.pow(rodOD, 4) - ((12 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(youngsModulus * 1000 * Math.pow(Math.PI, 2)))), 1/4)).toFixed(4);
      maxColumnLength = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(12 * pushPressWP * Math.pow(barrelID, 2))), 1/2)).toFixed(4);
      maxBarrelID = Number(Math.pow(((youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(12 * pushPressWP * Math.pow(columnLength, 2))), 1/2)).toFixed(4);
      minYoungsModulus = Number((12 * Math.pow(columnLength, 2) * pushPressWP * Math.pow(barrelID, 2))/(Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)) * 1000)).toFixed(0);
    }
  }

  safetyFactorWP = safetyFactorWP.toFixed(1);
  safetyFactorTP = safetyFactorTP.toFixed(1);

  let actualSFWP = ''; //Used for signaling if the safety factor is according to standard or not.
  let actualSFTP = ''; //Used for signaling if the safety factor is according to standard or not.
  
  if (safetyFactorWP < 3) {
    actualSFWP = `<td class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorWP}</td>`;
  } 
  else {
    actualSFWP = `<td class="text-center" colspan="4">${safetyFactorWP}</td>`;
  }

  if (safetyFactorTP < 2) {
    actualSFTP = `<td class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorTP}</td>`;
  } 
  else {
    actualSFTP = `<td class="text-center" colspan="4">${safetyFactorTP}</td>`;
  }

  let endCondition = '';

  switch (document.getElementById('inputEndCondition').value) {
    case 'endCondition1':
      endCondition = 'First';
      break;
    case 'endCondition2':
      endCondition = 'Second';
      break;
    case 'endCondition3':
      endCondition = 'Third';
      break;
    case 'endCondition4':
      endCondition = 'Fourth';
      break;
  }

  let rodIDHTML = '';

  if (rodID === 0) {
    rodIDHTML = 'N/A';
  }
  else {
    rodIDHTML = rodID/1000;
  }

  let maxRodIDHTML = '';

  if (maxRodID === 0) {
    maxRodIDHTML = 'N/A';
  }
  else {
    maxRodIDHTML = maxRodID / 1000;
  }

  document.getElementById('js-buckling-sf-result').innerHTML =
    `<table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center" colspan="4" rowspan="2" valign="middle"></th>
          <th scope="col" class="text-center" colspan="8">Safety Factors</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="4">Actual</th>
          <th scope="col" class="text-center" colspan="4">Required</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="col" class="text-center" colspan="4">Working Pressure - Push</td>
          ${actualSFWP}
          <td class="text-center" colspan="4">3.0</td>
        </tr>
        <tr>
          <td scope="col" class="text-center" colspan="4">Testing Pressure</td>
          ${actualSFTP}
          <td class="text-center" colspan="4">2.0</td>
        </tr>
      </tbody>
    </table>

    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center" colspan="12" valign="middle">Values used to calculate rod buckling safety factors</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="2" valign="middle">End-condition</th>
          <th scope="col" class="text-center" colspan="3" valign="middle">Young's Modulus (Pa)</th>
          <th scope="col" class="text-center" colspan="1" valign="middle">Rod OD (m)</th>
          <th scope="col" class="text-center" colspan="1" valign="middle">Rod ID (m)</th>
          <th scope="col" class="text-center" colspan="1" valign="middle">Column length (m)</th>
          <th scope="col" class="text-center" colspan="3" valign="middle">Push pressure (Pa)</th>
          <th scope="col" class="text-center" colspan="1" valign="middle">Barrel ID (m)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="col" class="text-center" colspan="2">${endCondition}</td>
          <td scope="col" class="text-center" colspan="3">${youngsModulus.toFixed(0)} &#183 10<sup>9</sup></td>
          <td scope="col" class="text-center" colspan="1">${(rodOD / 1000).toFixed(4)}</td>
          <td scope="col" class="text-center" colspan="1">${rodIDHTML}</td>
          <td scope="col" class="text-center" colspan="1">${(columnLength / 1000).toFixed(4)}</td>
          <td scope="col" class="text-center" colspan="3">${Number(pushPressWP).toFixed(2)} &#183 10<sup>6</sup></td>
          <td scope="col" class="text-center" colspan="1">${(barrelID / 1000).toFixed(4)}</td>
        </tr>
      </tbody>
    </table>

    <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">Required values to get the minimum safety factor of 3:1 at working pressure</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. push pressure (Pa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Min. rod OD (m)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. rod ID (m)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. column length (m)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. barrel ID (m)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Min. Young's Modulus (Pa)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="col" class="text-center" colspan="2">${Number(maxWP).toFixed(2)} &#183 10<sup>6</sup></td>
        <td scope="col" class="text-center" colspan="2">${(minRodOD / 1000).toFixed(4)}</td>
        <td scope="col" class="text-center" colspan="2">${maxRodIDHTML}</td>
        <td scope="col" class="text-center" colspan="2">${(maxColumnLength / 1000).toFixed(4)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(maxBarrelID / 1000).toFixed(4)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(minYoungsModulus).toFixed(2)} &#183 10<sup>9</sup></td>
      </tr>
    </tbody>
  </table>`
})

//Make sure that when enter is pressed in the input tags, the page doesn't reload. Also, that it triggers calculate button.
document.getElementById('inputYoungsModulus').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('js-calc-sf-buckling').click();
  }
})

//When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-second-next').addEventListener('click', () => {
  isNext = true;
  location.assign('http://localhost:3000/calculationhoop');
})

//When previous is clicked, data has to be preparad to be reloaded in the calculationinitial page
document.getElementById('js-second-previous').addEventListener('click', () => {
  sessionStorage.setItem('prev-buckling-initial', true);
  location.assign('http://localhost:3000/calculationinitial');
})

//Add listeners for the conversions to happen
function conversionListener() {
  //General - Changing values from inches to millimeters
  document.querySelectorAll(".js-in-to-mm").forEach((e, index) => {
    let other = document.querySelectorAll(".js-mm-to-in")[index];
    e.addEventListener('keyup', () => {
      elementsConversion(e, other, 1);
    });
    e.addEventListener('change', () => {
      elementsConversion(e, other, 1);
    });
  });

  //General - Changing values from millimeters to inches
  document.querySelectorAll(".js-mm-to-in").forEach((e, index) => {
    let other = document.querySelectorAll(".js-in-to-mm")[index];
    e.addEventListener('keyup', () => {
      elementsConversion(e, other, 2);
    });
    e.addEventListener('change', () => {
      elementsConversion(e, other, 2);
    });
  });
}

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



