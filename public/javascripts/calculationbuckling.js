//General functions - Start

let isThereRodID = false;

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Used to include the rod id in mm field
document.querySelectorAll('.js-radio-round-hollow').forEach((e) => {
  e.addEventListener('change', () => {
    if (document.getElementById('js-round-hollow-yes').checked) {
      document.getElementById('js-buckling-rod-id').innerHTML = 
      `<label for="inputRodID" class="form-label">Rod ID in millimeters</label>
      <input type="number" min="0.00" step="0.01" class="form-control" id="inputRodID" name="inputRodID">`;
      isThereRodID = true;
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
//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



