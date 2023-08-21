//General functions - Start

let isNext = false;

document.getElementById('js-number-welds').value = 1; //Used to make sure the number of wels is at least 1 (just to show to user).

//Used to add listeners for unit conversions
conversionListener();

//Used to add listeners to the tab key
tabOrginiser();

//Selector is used to indicate which conversion has to be performed. 1 = In to MM, 2 = MM to In, for example.
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
    const rodOD = sessionStorage.getItem('rod-mm-for-calc');
    const wireYield = document.getElementById('inputMinYieldMPa').value;
    
    let jointNames= [], sfPull = [], sfPush = [], sfTest = []; //Used to hold the names and the safety factors for each welding joint row.

    let tableLinesHTML = ``;

    document.querySelectorAll('.js-joint').forEach((e, i) => {
      let calcSFPush = (2.308 * wireYield * document.querySelectorAll('.js-throat-mm')[i].value * document.querySelectorAll('.js-length-mm')[i].value) / (Math.PI * Math.pow(barrelID, 2) * pushPressWP);
      let calcSFPull = (2.308 * wireYield * document.querySelectorAll('.js-throat-mm')[i].value * document.querySelectorAll('.js-length-mm')[i].value) / (Math.PI * (Math.pow(barrelID, 2) - Math.pow(rodOD, 2)) * pullPressWP);
      let calcSFTest = (2.308 * wireYield * document.querySelectorAll('.js-throat-mm')[i].value * document.querySelectorAll('.js-length-mm')[i].value) / (Math.PI * Math.pow(barrelID, 2) * testPress);
      jointNames.push(e.value);
      sfPush.push(calcSFPush);
      sfPull.push(calcSFPull);
      sfTest.push(calcSFTest);
    })

    console.log(sfPull);

    for (let i = 0; i < jointNames.length; i++) {
      tableLinesHTML += `
      <tr>
        <td scope="col" class="text-center" colspan="2">${jointNames[i]}</td>
        <td scope="col" class="text-center" colspan="2">${Number(sfPull[i]).toFixed(1)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(sfPush[i]).toFixed(1)}</td>
        <td scope="col" class="text-center" colspan="2">${Number(sfTest[i]).toFixed(1)}</td>
        <td scope="col" class="text-center" colspan="2">${document.querySelectorAll('.js-throat-mm')[i].value}</td>
        <td scope="col" class="text-center" colspan="2">${document.querySelectorAll('.js-length-mm')[i].value}</td>
      </tr>`
    }

    //Main table generation part
    let accumHTML = 
    `<table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center" colspan="2" rowspan="2" valign="middle">Joint</th>
          <th scope="col" class="text-center" colspan="6">Safety Factors</th>
          <th scope="col" class="text-center" colspan="4">Specific values used on the calcualtion</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="2">Pull</th>
          <th scope="col" class="text-center" colspan="2">Push</th>
          <th scope="col" class="text-center" colspan="2">Test</th>
          <th scope="col" class="text-center" colspan="2">Throat (mm)</th>
          <th scope="col" class="text-center" colspan="2">Length (mm)</th>
        </tr>
      </thead>
      <tbody>
        ${tableLinesHTML}
        <tr>
          <th scope="col" class="text-center" colspan="12">General values used on the calcualtion</th>
        </tr>
        <tr>
          <th scope="col" class="text-center" colspan="2">Wire Yield (MPa)</th>
          <th scope="col" class="text-center" colspan="2">Pull (MPa)</th>
          <th scope="col" class="text-center" colspan="2">Push (MPa)</th>
          <th scope="col" class="text-center" colspan="2">Test (MPa)</th>
          <th scope="col" class="text-center" colspan="2">Bore (mm)</th>
          <th scope="col" class="text-center" colspan="2">Rod (mm)</th>
        </tr>
        <tr>
          <td scope="col" class="text-center" colspan="2">${wireYield}</td>
          <td scope="col" class="text-center" colspan="2">${pullPressWP}</td>
          <td scope="col" class="text-center" colspan="2">${pushPressWP}</td>
          <td scope="col" class="text-center" colspan="2">${testPress}</td>
          <td scope="col" class="text-center" colspan="2">${barrelID}</td>
          <td scope="col" class="text-center" colspan="2">${rodOD}</td>
        </tr>
      </tbody>
  </table>`

  document.getElementById('js-weld-sf-result').innerHTML = accumHTML;

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
    e.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (!(index === document.querySelectorAll(".js-in-to-mm").length - 8)) {
          document.querySelectorAll('.js-in-to-mm')[index + 1].focus();
        }
        else {
          document.getElementById('js-add-new-line').focus();
        }
      }
      else {
        elementsConversion(e, other, 1);
      }
    });
    e.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        if (!(index === document.querySelectorAll(".js-in-to-mm").length - 8)) {
          event.preventDefault();
          document.querySelectorAll('.js-in-to-mm')[index + 1].focus();
        }
      }
      else {
        elementsConversion(e, other, 1);
      }
    });
    e.addEventListener('change', () => {
      elementsConversion(e, other, 1);
    });
  });

  //General - Changing values from millimeters to inches
  document.querySelectorAll(".js-mm-to-in").forEach((e, index) => {
    let other = document.querySelectorAll(".js-in-to-mm")[index];
    e.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (!(index === document.querySelectorAll(".js-mm-to-in").length - 8)) {
          document.querySelectorAll('.js-mm-to-in')[index + 1].focus();
        }
        else {
          document.getElementById('js-add-new-line').focus();
        }
      }
      else {
        elementsConversion(e, other, 2);
      }
    });
    e.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        if (!(index === document.querySelectorAll(".js-mm-to-in").length - 8)) {
          event.preventDefault();
          document.querySelectorAll('.js-mm-to-in')[index + 1].focus();
        }
      }
      else {
        elementsConversion(e, other, 1);
      }
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

//Global variable to accumulate welding lines
let accumHTMLWeldingLines = '';

//Used to add new lines to calculate welding safety factors
document.getElementById('js-add-new-line').addEventListener('click', () => {
  let keepData = [];
  document.querySelectorAll('.js-save-welding').forEach((e) => {
    keepData.push(e.value);
  })
  accumHTMLWeldingLines +=
    `<div class="col-md-4" style="margin-top: 1em;">
      <input type="text" class="form-control js-joint js-save-welding js-save">
    </div>
    <div class="col-md-2" style="margin-top: 1em;">
      <input type="text" class="form-control js-in-to-mm js-throat-in js-save-welding js-save" tabindex="-1">
    </div>
    <div class="col-md-2" style="margin-top: 1em;">
      <input type="text" class="form-control js-mm-to-in js-throat-mm js-save-welding js-save" tabindex="-1">
    </div>
    <div class="col-md-2" style="margin-top: 1em;">
      <input type="text" class="form-control js-in-to-mm js-length-in js-save-welding js-save" tabindex="-1">
    </div>
    <div class="col-md-2" style="margin-top: 1em;">
      <input type="text" class="form-control js-mm-to-in js-length-mm js-save-welding js-save" tabindex="-1">
    </div>`;
    document.getElementById('js-div-new-line').innerHTML = accumHTMLWeldingLines;
    conversionListener();
    tabOrginiser();
    for (let i = 0; i < keepData.length; i++) {
      document.querySelectorAll('.js-save-welding')[i].value = keepData[i];
    }
})

//Used to calculate throat size for 45-degree fillets
document.getElementById('js-leg-in').addEventListener('keyup', () => {
  if (document.getElementById('js-leg-in').value === '' || document.getElementById('js-leg-in').value === 0) {
    emptyFields(document.getElementById('js-throat-in-calc'), document.getElementById('js-throat-mm-calc'));
  }
  else {
    document.getElementById('js-throat-in-calc').value = Number(Math.sin(45 * (Math.PI / 180)) * document.getElementById('js-leg-in').value).toFixed(4);
    document.getElementById('js-throat-mm-calc').value = Number(document.getElementById('js-throat-in-calc').value * 25.4).toFixed(2);
  }
})
document.getElementById('js-leg-in').addEventListener('change', () => {
  if (document.getElementById('js-leg-in').value === '' || document.getElementById('js-leg-in').value === 0) {
    emptyFields(document.getElementById('js-throat-in-calc'), document.getElementById('js-throat-mm-calc'));
  }
  else {
    document.getElementById('js-throat-in-calc').value = Number(Math.sin(45 * (Math.PI / 180)) * document.getElementById('js-leg-in').value).toFixed(4);
    document.getElementById('js-throat-mm-calc').value = Number(document.getElementById('js-throat-in-calc').value * 25.4).toFixed(2);
  }
})
document.getElementById('js-leg-mm').addEventListener('keyup', () => {
  if (document.getElementById('js-leg-mm').value === '' || document.getElementById('js-leg-mm').value === 0) {
    emptyFields(document.getElementById('js-throat-in-calc'), document.getElementById('js-throat-mm-calc'));
  }
  else {
    document.getElementById('js-throat-in-calc').value = Number(Math.sin(45 * (Math.PI / 180)) * document.getElementById('js-leg-in').value).toFixed(4);
    document.getElementById('js-throat-mm-calc').value = Number(document.getElementById('js-throat-in-calc').value * 25.4).toFixed(2);
  }
})
document.getElementById('js-leg-mm').addEventListener('change', () => {
  if (document.getElementById('js-leg-mm').value === '' || document.getElementById('js-leg-mm').value === 0) {
    emptyFields(document.getElementById('js-throat-in-calc'), document.getElementById('js-throat-mm-calc'));
  }
  else {
    document.getElementById('js-throat-in-calc').value = Number(Math.sin(45 * (Math.PI / 180)) * document.getElementById('js-leg-in').value).toFixed(4);
    document.getElementById('js-throat-mm-calc').value = Number(document.getElementById('js-throat-in-calc').value * 25.4).toFixed(2);
  }
})

//Used to calculate throat size for circular groove welds
document.getElementById('js-weld-id-in').addEventListener('keyup', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-id-in').addEventListener('change', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-id-mm').addEventListener('keyup', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-id-mm').addEventListener('change', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-od-in').addEventListener('keyup', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-od-in').addEventListener('change', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-od-mm').addEventListener('keyup', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})
document.getElementById('js-weld-od-mm').addEventListener('change', () => {
  if ((document.getElementById('js-weld-id-in').value === '' || document.getElementById('js-weld-id-mm').value === '') && (document.getElementById('js-weld-od-in').value === '' || document.getElementById('js-weld-od-mm').value === '')) {
    emptyFields(document.getElementById('js-throat-in-calc-diam'), document.getElementById('js-throat-mm-calc-diam'));
  }
  else {
    document.getElementById('js-throat-in-calc-diam').value = Number((document.getElementById('js-weld-od-in').value - document.getElementById('js-weld-id-in').value) / 2).toFixed(4);
    document.getElementById('js-throat-mm-calc-diam').value = Number((document.getElementById('js-weld-od-mm').value - document.getElementById('js-weld-id-mm').value) / 2).toFixed(4);
  }
})



//Trigger the table generation
document.getElementById('js-calc-sf-weld').addEventListener('click', () => {
  // if (document.getElementById('inputBarrelOutsideDiameter').value === '' 
  //     || Number(document.getElementById('inputBarrelOutsideDiameter').value) < Number(sessionStorage.getItem('bore-mm-for-calc')) 
  //     || document.getElementById('inputHydroilId').value === '') {
  //   alert('Please make sure there is no empty fields and barrel OD greater than barrel ID');
  //   return;
  // }
  // else {
    loadTable();
  // }
})

//Search when enter is the keyup in hydroil's id input element
document.getElementById('inputHydroilId').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('js-search-mech-properties').click();
  }
})

//Used to calculate weld appropriate length when in a perimeter
document.getElementById('js-diameter-in').addEventListener('keyup', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})
document.getElementById('js-diameter-in').addEventListener('change', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})
document.getElementById('js-diameter-mm').addEventListener('keyup', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})
document.getElementById('js-diameter-mm').addEventListener('change', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})
document.getElementById('js-number-welds').addEventListener('keyup', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})
document.getElementById('js-number-welds').addEventListener('change', () => {
  document.getElementById('js-length-in-calc').value = Number(document.getElementById('js-diameter-in').value * (document.getElementById('js-number-welds').value || 1) * Math.PI).toFixed(2);
  document.getElementById('js-length-mm-calc').value = Number(document.getElementById('js-length-in-calc').value * 25.4).toFixed(2);
})

//When previous is clicked, data has to be preparad to be reloaded in the calculationinitial page
document.getElementById('js-fourth-previous').addEventListener('click', () => {
  sessionStorage.setItem('prev-welding-hoop', true);
  window.location.pathname = '/calculationhoop';
  // location.assign('http://localhost:3000/calculationhoop');
})

// When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-fourth-next').addEventListener('click', () => {
  isNext = true;
  saveData();
  window.location.pathname = '/';
  // location.assign('http://localhost:3000/');
})

//Used to make tab work well for Joint names
function tabOrginiser () {
  document.querySelectorAll('.js-joint').forEach((e, i) => {
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab' || element.key === 'Enter') {
        element.preventDefault();
        document.querySelectorAll('.js-throat-in')[i].focus();
      }
    })
  })
}

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------