//General functions - Start

let isNext = false;

//Used to add listeners for unit conversions
conversionListener();

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

//Used to create the tables needed to present the information to the user
function loadTable () {
    const pushPressWP = sessionStorage.getItem('push-press-mpa-for-calc');
    const pullPressWP = sessionStorage.getItem('pull-press-mpa-for-calc');
    const testPress = sessionStorage.getItem('test-press-mpa-for-calc');
    const barrelID = sessionStorage.getItem('bore-mm-for-calc');
    
    let safetyFactorWPThinUts = 0, safetyFactorWPThinYield = 0, safetyFactorWPThickUts = 0, safetyFactorWPThickYield = 0; //Used to calculate safety factor for working pressure
    let safetyFactorTPThinUts = 0, safetyFactorTPThinYield = 0, safetyFactorTPThickUts = 0, safetyFactorTPThickYield = 0; //Used to calculate safety factor for test pressure

    const barrelOD = Number(document.getElementById('inputBarrelOutsideDiameter').value);

    const maxWorkPress = Math.max(pushPressWP, pullPressWP);

    const wallThickness = (barrelOD - barrelID) / 2;

    //Calculation of safety factors
    safetyFactorWPThinYield = Number((2 * wallThickness * Number(document.getElementById('inputMinYieldMPa').value))/(maxWorkPress * barrelID)).toFixed(1);
    safetyFactorWPThinUts = Number((2 * wallThickness * Number(document.getElementById('inputMinUtsMPa').value))/(maxWorkPress * barrelID)).toFixed(1);
    safetyFactorTPThinYield = Number((2 * wallThickness * Number(document.getElementById('inputMinYieldMPa').value))/(testPress * barrelID)).toFixed(1);
    safetyFactorTPThinUts = Number((2 * wallThickness * Number(document.getElementById('inputMinUtsMPa').value))/(testPress * barrelID)).toFixed(1);

    safetyFactorWPThickYield = Number((Number(document.getElementById('inputMinYieldMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2)))/(maxWorkPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);
    safetyFactorWPThickUts = Number((Number(document.getElementById('inputMinUtsMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2)))/(maxWorkPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);
    safetyFactorTPThickYield = Number((Number(document.getElementById('inputMinYieldMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2)))/(testPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);
    safetyFactorTPThickUts = Number((Number(document.getElementById('inputMinUtsMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2)))/(testPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);

    //Alert creation part
    let htmlWpThinY = '', htmlWpThinU = '', htmlWpThickY = '', htmlWpThickU = '', htmlTpThinY = '', htmlTpThinU = '', htmlTpThickY = '', htmlTpThickU = ''; //Used to alert when sf is less than what it should be

    if (safetyFactorWPThinYield < 3) {
      htmlWpThinY = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorWPThinYield}</td>`
    } 
    else {
      htmlWpThinY = `<td scope="col" class="text-center" colspan="4">${safetyFactorWPThinYield}</td>`
    }

    if (safetyFactorWPThinUts < 3) {
      htmlWpThinU = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorWPThinUts}</td>`
    } 
    else {
      htmlWpThinU = `<td scope="col" class="text-center" colspan="4">${safetyFactorWPThinUts}</td>`
    }

    if (safetyFactorWPThickYield < 3) {
      htmlWpThickY = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorWPThickYield}</td>`;
    }
    else {
      htmlWpThickY = `<td scope="col" class="text-center" colspan="4">${safetyFactorWPThickYield}</td>`;
    }

    if (safetyFactorWPThickUts < 3) {
      htmlWpThickU = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorWPThickUts}</td>`;
    }
    else {
      htmlWpThickU = `<td scope="col" class="text-center" colspan="4">${safetyFactorWPThickUts}</td>`;
    }

    if (safetyFactorTPThinYield < 2) {
      htmlTpThinY = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorTPThinYield}</td>`;
    }
    else {
      htmlTpThinY = `<td scope="col" class="text-center" colspan="4">${safetyFactorTPThinYield}</td>`;
    }

    if (safetyFactorTPThinUts < 2) {
      htmlTpThinU = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorTPThinUts}</td>`;
    }
    else {
      htmlTpThinU = `<td scope="col" class="text-center" colspan="4">${safetyFactorTPThinUts}</td>`;
    }

    if (safetyFactorTPThickYield < 2) {
      htmlTpThickY = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorTPThickYield}</td>`;
    }
    else {
      htmlTpThickY = `<td scope="col" class="text-center" colspan="4">${safetyFactorTPThickYield}</td>`;
    }

    if (safetyFactorTPThickUts < 2) {
      htmlTpThickU = `<td scope="col" class="text-center" colspan="4" style="background-color: red; color: white; font-weight: bold;">${safetyFactorTPThickUts}</td>`;
    }
    else {
      htmlTpThickU = `<td scope="col" class="text-center" colspan="4">${safetyFactorTPThickUts}</td>`;
    }

    //Minimum and maximum values calculation
    let minYUWp = 0, maxBrlIDWp = 0, minWtBWp = 0, minWp = 0; //Used to indicate minimum and maximum values that guarantee sf of 3:1 (work pressure)
    let minYUTp = 0, maxBrlIDTp = 0, minWtBTp = 0, minTp = 0; //Used to indicate minimum and maximum values that guarantee sf of 2:1 (test pressure)

    //Variables used to show and choose between thin or thick walled formulas for safety factors
    let thinOrThick = '', bodyThinOrThick = '', OdOrWT = '', valueWT = null;

    //Thin/Thick wall test and table part to include in main table
    if ((wallThickness / barrelID) < 0.07) {
      thinOrThick = 'Thin';
      OdOrWT = 'Wall Thickness (mm)';
      valueWT = Number(wallThickness).toFixed(2);
      bodyThinOrThick = 
      `<tr>
      <td scope="col" class="text-center" colspan="2">Max. Working Pressure</td>
        ${htmlWpThinY}
        ${htmlWpThinU}
        <td scope="col" class="text-center" colspan="2">3.0</td>
      </tr>
      <tr>
        <td scope="col" class="text-center" colspan="2">Test Pressure</td>
        ${htmlTpThinY}
        ${htmlTpThinU}
        <td scope="col" class="text-center" colspan="2">2.0</td>
      </tr>`

      //Calculate min. and max. for work pressure
      minYUWp = Number((3 * maxWorkPress * barrelID) / (2 * wallThickness)).toFixed(1);
      maxBrlIDWp = Number((2 * wallThickness * Number(document.getElementById('inputMinYieldMPa').value)) / (3 * maxWorkPress)).toFixed(1);
      minWtBWp = Number((3 * maxWorkPress * barrelID) / (2 * Number(document.getElementById('inputMinYieldMPa').value))).toFixed(1);
      minWp = Number((2 * wallThickness * Number(document.getElementById('inputMinYieldMPa').value)) / (3 * barrelID)).toFixed(1);

      //Calculate min. and max. for test pressure
      minYUTp = Number((testPress * barrelID) / (wallThickness)).toFixed(1);
      maxBrlIDTp = Number((wallThickness * Number(document.getElementById('inputMinYieldMPa').value)) / (testPress)).toFixed(1);
      minWtBTp = Number((testPress * barrelID) / (Number(document.getElementById('inputMinYieldMPa').value))).toFixed(1);
      minTp = Number((wallThickness * Number(document.getElementById('inputMinYieldMPa').value)) / (barrelID)).toFixed(1);

      //Making sure the proper value is shown to user
      if (minYUWp < minYUTp) {
        minYUWp = minYUTp;
      } //Done to make sure the maximum value of the min yield is shown. It has to be the greater value between the two minimums.

      if (maxBrlIDWp > maxBrlIDTp) {
        maxBrlIDWp = maxBrlIDTp;
      } // The opposite logic is applied here. The lower value between the two maximums should be shown.

      if (minWtBWp < minWtBTp) {
        minWtBWp = minWtBTp;
      }
    }
    else {
      thinOrThick = 'Thick';
      OdOrWT = 'Barrel OD (mm)';
      bodyThinOrThick = 
      `<tr>
      <td scope="col" class="text-center" colspan="2">Max. Working Pressure</td>
        ${htmlWpThickY}
        ${htmlWpThickU}
        <td scope="col" class="text-center" colspan="2">3.0</td>
      </tr>
      <tr>
        <td scope="col" class="text-center" colspan="2">Test Pressure</td>
        ${htmlTpThickY}
        ${htmlTpThickU}
        <td scope="col" class="text-center" colspan="2">2.0</td>
      </tr>`

      //Calculate min. and max. for work pressure
      minYUWp = Number((3 * maxWorkPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2))) / (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2))).toFixed(1);
      maxBrlIDWp = Number(barrelOD * Math.pow(((Number(document.getElementById('inputMinYieldMPa').value) - 3 * maxWorkPress) / (Number(document.getElementById('inputMinYieldMPa').value) + 3 * maxWorkPress)), 1/2)).toFixed(1);
      minWtBWp = Number(barrelID * Math.pow(((Number(document.getElementById('inputMinYieldMPa').value) + 3 * maxWorkPress) / (Number(document.getElementById('inputMinYieldMPa').value) - 3 * maxWorkPress)), 1/2)).toFixed(1);
      minWp = Number((Number(document.getElementById('inputMinYieldMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2))) / (3 * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);

      //Calculate min. and max. for test pressure
      minYUTp = Number((2 * testPress * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2))) / (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2))).toFixed(1);
      maxBrlIDTp = Number(barrelOD * Math.pow(((Number(document.getElementById('inputMinYieldMPa').value) - 2 * testPress) / (Number(document.getElementById('inputMinYieldMPa').value) + 2 * testPress)), 1/2)).toFixed(1);
      minWtBTp = Number(barrelID * Math.pow(((Number(document.getElementById('inputMinYieldMPa').value) + 2 * testPress) / (Number(document.getElementById('inputMinYieldMPa').value) - 2 * testPress)), 1/2)).toFixed(1);
      minTp = Number((Number(document.getElementById('inputMinYieldMPa').value) * (Math.pow(barrelOD, 2) - Math.pow(barrelID, 2))) / (2 * (Math.pow(barrelID, 2) + Math.pow(barrelOD, 2)))).toFixed(1);

      //Making sure the proper value is shown to user
      if (minYUWp < minYUTp) {
        minYUWp = minYUTp;
      } //Done to make sure the maximum value of the min yield is shown. It has to be the greater value between the two minimums.

      if (maxBrlIDWp > maxBrlIDTp) {
        maxBrlIDWp = maxBrlIDTp;
      } // The opposite logic is applied here. The lower value between the two maximums should be shown.

      if (minWtBWp < minWtBTp) {
        minWtBWp = minWtBTp;
      }
    }

    //Main table generation part
    let accumHTML = 
    `<table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center" colspan="2" rowspan="3" valign="middle"></th>
          <th scope="col" class="text-center" colspan="10">Safety Factors</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="8">${thinOrThick}-walled</th>
          <th scope="col" class="text-center" colspan="2" rowspan="2" valign="middle">Required</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="4">Yield</th>
          <th scope="col" class="text-center" colspan="4">UTS</th>
        </tr>
      </thead>
      <tbody>
        ${bodyThinOrThick}
      </tbody>
  </table>
  
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">Values used to calculate hoop stress safety factors</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="2" valign="middle">Thin or thick?</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Yield (MPa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">UTS (MPa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Barrel ID (mm)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">${OdOrWT}</th>
        <th scope="col" class="text-center" colspan="1" valign="middle">Working Pressure (MPa)</th>
        <th scope="col" class="text-center" colspan="1" valign="middle">Test Pressure (MPa)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="col" class="text-center" colspan="2">${thinOrThick}</td>
        <td scope="col" class="text-center" colspan="2">${Number(document.getElementById('inputMinYieldMPa').value)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(document.getElementById('inputMinUtsMPa').value)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(barrelID).toFixed(2)}</td>
        <td scope="col" class="text-center" colspan="2">${valueWT || Number(barrelOD).toFixed(2)}</td>
        <td scope="col" class="text-center" colspan="1">${Number(maxWorkPress).toFixed(1)}</td>
        <td scope="col" class="text-center" colspan="1">${Number(testPress).toFixed(1)}</td>
      </tr>
    </tbody>
  </table>
    
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">Required values to get the minimum safety factor of 3:1 at working pressure and 2:1 at test pressure</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="2" valign="middle">Min. Yield (MPa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">MIn. UTS (MPa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. Barrel ID (mm)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Min. ${OdOrWT}</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. Work Press. (MPa)</th>
        <th scope="col" class="text-center" colspan="2" valign="middle">Max. Test Press. (MPa)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td scope="col" class="text-center" colspan="2">${minYUWp}</td>
        <td scope="col" class="text-center" colspan="2">${minYUWp}</td>
        <td scope="col" class="text-center" colspan="2">${maxBrlIDWp}</td>
        <td scope="col" class="text-center" colspan="2">${minWtBWp}</td>
        <td scope="col" class="text-center" colspan="2">${minWp}</td>
        <td scope="col" class="text-center" colspan="2">${minTp}</td>
      </tr>
    </tbody>
  </table>`

  document.getElementById('js-hoop-sf-result').innerHTML = accumHTML;

}

//Used to save the data created in the hoop stress calculation page
function saveData () {
  let arrayDataHoop = [];
  document.querySelectorAll('.js-save').forEach((e) => {
    arrayDataHoop.push(e.value);
  })
  sessionStorage.setItem('hoop-save-data', arrayDataHoop);
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Asynchronous functions setction - Start

//Used to fetch material and mechanical properties based on hydroil's id number
async function  findItem (target) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({target})
      };
      try {
        const response = await fetch("/calculationhoop", options);
        const result = await response.json();
        return result.body;
      } catch (error) {
        console.error("Error: ", error);
      }
}

//Asynchronous functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start
window.addEventListener('load', () => {
  conversionListener();
})

//Add listeners for the conversions to happen
function conversionListener() {
  //General - It changes values from psi to mpa and bar
  document.querySelectorAll(".js-psi").forEach((e, index) => {
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    e.addEventListener('change', () => {
      elementsConversion(e, mpaElement, 3);
    });
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, mpaElement, 3);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-psi').length) {
          document.querySelectorAll(".js-psi")[index + 1].focus();
        }
        else {
          document.getElementById('js-search-mech-properties').click();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-psi').length) {
          document.querySelectorAll(".js-psi")[index + 1].focus();
        }
        else {
          document.getElementById('js-search-mech-properties').focus();
        }
      }
    })
  });

  //General - It changes values from mpa to psi and bar
  document.querySelectorAll(".js-mpa").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    e.addEventListener('change', () => {
      elementsConversion(e, psiElement, 5);
    });
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, psiElement, 5);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-mpa').length) {
          document.querySelectorAll(".js-mpa")[index + 1].focus();
        }
        else {
          document.getElementById('js-search-mech-properties').click();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-mpa').length) {
          document.querySelectorAll(".js-mpa")[index + 1].focus();
        }
        else {
          document.getElementById('js-search-mech-properties').focus();
        }
      }
    })
  });
  
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

//When leaving the page an alert is triggered to avoid data loss
window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

//Will search and bring information based on Hydroil's id number
document.getElementById('js-search-mech-properties').addEventListener('click', async () => {
    const target = document.getElementById('inputHydroilId').value;
    const result = await findItem (target);
    document.getElementById('inputItem').value = result[0].item;
    document.getElementById('inputDescription').value = result[0].desc;
    document.getElementById('inputAltDescription').value = result[0].altdesc;
    document.getElementById('inputMinYieldMPa').value = result[1].yieldM.toFixed(0);
    document.getElementById('inputMinYieldPSI').value = result[1].yieldP.toFixed(0);
    document.getElementById('inputMinUtsMPa').value = result[1].utsM.toFixed(0);
    document.getElementById('inputMinUTSPSI').value = result[1].utsP.toFixed(0);
})

//Trigger the table generation
document.getElementById('js-calc-sf-hoop').addEventListener('click', () => {
  if (document.getElementById('inputBarrelOutsideDiameter').value === '' 
      || Number(document.getElementById('inputBarrelOutsideDiameter').value) < Number(sessionStorage.getItem('bore-mm-for-calc')) 
      || document.getElementById('inputHydroilId').value === '') {
    alert('Please make sure there is no empty fields and barrel OD greater than barrel ID');
    return;
  }
  else {
    loadTable();
  }
})

//Search when enter is the keyup in hydroil's id input element
document.getElementById('inputHydroilId').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('js-search-mech-properties').click();
  }
})

//Preventing default form submission when enter is pressed for the barrel id input element
//Calculating, if possible, when enter is the keyup in barrel od input element
document.getElementById('js-form-barrel-od').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('js-calc-sf-hoop').click();
  }
})

//When previous is clicked, data has to be preparad to be reloaded in the calculationinitial page
document.getElementById('js-third-previous').addEventListener('click', () => {
  sessionStorage.setItem('prev-hoop-buckling', true);
  location.assign('http://localhost:3000/calculationbuckling');
})

// When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-third-next').addEventListener('click', () => {
  isNext = true;
  saveData();
  location.assign('http://localhost:3000/');
})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------