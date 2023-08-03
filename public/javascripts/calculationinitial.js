//General functions - Start

let isNext = false; //Used to allow the user to go to the next page without the prompt of the risk-of-losing-data alert
let notEnoughForce = false; //Used to check if the forces created by the cylinder specs are enough to achieve what is required by the client

//Variables used to calculate forces and open centers/length
let pullForceWP = 0, pushForceWP = 0, pullForceTest = 0, pushForceTest = 0, openCenters = 0;

const cylinderMounting = ['None', 'Female Clevis', 'Male Clevis', 'Spherical Bearing', 'Front Flange', 'Rear Flange', 'Tapped Mount', 'Lug Mount', 'Front Trunnion', 'Rear Trunnion', 'Double Ended Cylinder', '__________', 'None', '1 - MX3 - Extended Tie Rod Head End', '1A - MX2 - Extended Tie Rod Cap End', '1B - MX1 - Extended Tie Rod Both Ends', '2 - MF1 - Head Rectangular Flange', '3 - MF2 - Cap Rectangular Flange', '4 - MF5 - Head Square Flange',
'5 - MF6 - Cap Square Flange', '6 - MS2 - Side Lugs', '7 - MS3 - Centre Line Lugs', '8 - MS4 - Side Tapped', '9 - End Angles', '10 - MS7 - End Lugs', '11 - MT1 - Head Trunnion', '12 - MT2 - Cap Trunnion', '13 - MT4 - Intermediate Trunnion',
'14 - MP1 - Cap Fixed Eye', '14B - MU3 - Cap Spherical Bearing', '__________', 'None', 'Cap Fixed Eye', 'Cap Spherical Bearing', 'Head Circular Flange', 'Cap Circular Flange', 'Intermediate Trunnion', 'Non-standard']; //HHMI and HSMI have the same mountings

function loadCylinderMountings () {
  let accumHTML = '';
  cylinderMounting.forEach((e, i) => {
    accumHTML += `<option value='${i}'>${e}</option>`;
  })
  document.getElementById('inputCylMounting').innerHTML = accumHTML;
}
loadCylinderMountings();

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

//Function that generate the main table that shows forces and open centers/length
function loadingTable () {
  notEnoughForce = false; //This variable needs to be restarted everytime changes are made to the input values. Otherwise, the user will be locked in the page, not being able to proceed. 
  const pullPressWP = document.getElementById('inputPullPressureMpa').value;
  const pushPressWP = document.getElementById('inputPushPressureMpa').value;
  const testPress = document.getElementById('inputTestPressureMpa').value;
  const boreMM = document.getElementById('inputBoreMM').value;
  const rodMM = document.getElementById('inputRodMM').value;

  pullForceWP = Number(pullPressWP * (Math.PI/4) * (Math.pow(boreMM, 2) - Math.pow(rodMM, 2))).toFixed(2);
  pushForceWP = Number(pushPressWP * (Math.PI/4) * Math.pow(boreMM, 2)).toFixed(2);

  pullForceTest = Number(testPress * (Math.PI/4) * (Math.pow(boreMM, 2) - Math.pow(rodMM, 2))).toFixed(2);
  pushForceTest = Number(testPress * (Math.PI/4) * Math.pow(boreMM, 2)).toFixed(2);
  
  openCenters = Number(document.getElementById('inputNetStrokeMM').value) + Number(document.getElementById('inputClosedCentersMM').value);

  let pullHTMLBlock = ``;
  let pushHTMLBlock = ``;

  if (Number(document.getElementById('inputPullForceNewton').value) > pullForceWP) {
    notEnoughForce = true;
    pullHTMLBlock = 
      `<td scope="col" class="text-center" colspan="3">Working Pressure - Pull - ${document.getElementById('inputPullPressurePsi').value} psi</td>
      <td class="text-center" id="js-wp-pull-lbf" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(conversion(pullForceWP, 11))}</td>
      <td class="text-center" id="js-wp-pull-newton" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(pullForceWP)}</td>
      <td class="text-center css-red-alert" id="js-wp-pull-ton" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(conversion(pullForceWP, 12))}</td>`
  }
  else {
    pullHTMLBlock = 
      `<td scope="col" class="text-center" colspan="3">Working Pressure - Pull - ${document.getElementById('inputPullPressurePsi').value} psi</td>
      <td class="text-center" id="js-wp-pull-lbf" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceWP, 11))}</td>
      <td class="text-center" id="js-wp-pull-newton" colspan="3">${new Intl.NumberFormat().format(pullForceWP)}</td>
      <td class="text-center" id="js-wp-pull-ton" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceWP, 12))}</td>`
  }

  if (Number(document.getElementById('inputPushForceNewton').value) > pushForceWP) {
    notEnoughForce = true;
    pushHTMLBlock =
      `<td scope="col" class="text-center" colspan="3">Working Pressure - Push - ${document.getElementById('inputPushPressurePsi').value} psi</td>
      <td class="text-center" id="js-wp-push-lbf" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(conversion(pushForceWP, 11))}</td>
      <td class="text-center" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(pushForceWP)}</td>
      <td class="text-center" colspan="3" style="background-color: red; color: white; font-weight: bold;">${new Intl.NumberFormat().format(conversion(pushForceWP, 12))}</td>`
  }
  else {
    pushHTMLBlock =
      `<td scope="col" class="text-center" colspan="3">Working Pressure - Push - ${document.getElementById('inputPushPressurePsi').value} psi</td>
      <td class="text-center" id="js-wp-push-lbf" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceWP, 11))}</td>
      <td class="text-center" colspan="3">${new Intl.NumberFormat().format(pushForceWP)}</td>
      <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceWP, 12))}</td>`
  }
  

  let accumHTML =
  `<tr>${pullHTMLBlock}</tr>
   <tr>${pushHTMLBlock}</tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Test Pressure - Pull - ${document.getElementById('inputTestPressurePsi').value} psi</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceTest, 11))}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(pullForceTest)}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceTest, 12))}</td>
  </tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Test Pressure - Push - ${document.getElementById('inputTestPressurePsi').value} psi</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceTest, 11))}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(pushForceTest)}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceTest, 12))}</td>
  </tr>
  <tr>
    <th scope="col" class="text-center" colspan="3" rowspan="2" valign="middle">DIMENSION</th>
    <th scope="col" class="text-center" colspan="9">MEASUREMENT UNIT</th>
  </tr>
  <tr>
    <th scope="col" class="text-center" colspan="4">Inches</th>
    <th scope="col" class="text-center" colspan="4">Millimeters</th>
  </tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Open centers/length</td>
    <td scope="col" class="text-center" colspan="4">${new Intl.NumberFormat().format(conversion(openCenters, 2))}</th>
    <td scope="col" class="text-center" colspan="4">${new Intl.NumberFormat().format(openCenters)}</th>
  </tr>`

  document.getElementById('js-tbl-forces').innerHTML = accumHTML;
}

//Data is saved to be used in the next calculation pages and to reload if needed
function saveData() {
  const arrayToSaveAllData = [];
  document.querySelectorAll('.js-save').forEach((e) => {
    arrayToSaveAllData.push(e.value);
  })
  sessionStorage.setItem('calc-init-data', arrayToSaveAllData); //Used specifically to reload data when previous button on the next page is used.
  sessionStorage.setItem('pull-press-mpa-for-calc', Number(document.getElementById('inputPullPressureMpa').value));
  sessionStorage.setItem('push-press-mpa-for-calc', Number(document.getElementById('inputPushPressureMpa').value));
  sessionStorage.setItem('test-press-mpa-for-calc', Number(document.getElementById('inputTestPressureMpa').value));
  sessionStorage.setItem('bore-mm-for-calc', Number(document.getElementById('inputBoreMM').value));
  sessionStorage.setItem('rod-mm-for-calc', Number(document.getElementById('inputRodMM').value));
  sessionStorage.setItem('open-centers-for-calc', openCenters);
  sessionStorage.setItem('pull-force-wp-newton-for-calc', pullForceWP);
  sessionStorage.setItem('push-force-wp-newton-for-calc', pushForceWP);
  sessionStorage.setItem('push-force-tp-newton-for-calc', pushForceTest);
}

//Check if all the fiels have the appropriate data inside them and if the force required is achieved
function emptyFields () {
  let returnCheck = false;
  let idAccumCheck = 0;
  document.querySelectorAll('.js-save').forEach((e, i) => {
    if (i === 0 || i === 1 || i === 2) {
      if (e.value === '') {
        idAccumCheck++;
      }
      if (idAccumCheck === 3) {
        returnCheck = true;
      }
    } 
    else {
      if (e.value === '') {
        returnCheck = true;
      }
    }
  })
  return returnCheck;
}

function showCylinderSuggestions () {
  const hshCombinations = [{bore: 1.5, rod: 0.875}, {bore: 2, rod: 1}, {bore: 2.5, rod: 1.375}, {bore: 3, rod: 1.75}, {bore: 3.5, rod: 1.75}, {bore: 4, rod: 2}, {bore: 4.5, rod: 2}, {bore: 5, rod: 2.5},
                          {bore: 5.5, rod: 2.5}, {bore: 6, rod: 3}, {bore: 6.5, rod: 3}, {bore: 7, rod: 3.5}, {bore: 7.5, rod: 3.5}, {bore: 8, rod: 4}, {bore: 9, rod: 4.5}, {bore: 10, rod: 5}];
  
  const hbCombinations = [{bore: 1.5, rod: 0.625}, {bore: 1.5, rod: 1}, {bore: 2, rod: 1}, {bore: 2, rod: 1.375}, {bore: 2.5, rod: 1}, {bore: 2.5, rod: 1.375}, {bore: 2.5, rod: 1.75}, 
                          {bore: 3.25, rod: 1.375}, {bore: 3.25, rod: 1.75}, {bore: 3.25, rod: 2}, {bore: 4, rod: 1.75}, {bore: 4, rod: 2}, {bore: 4, rod: 2.5}, {bore: 5, rod: 2}, {bore: 5, rod: 2.5},
                          {bore: 5, rod: 3}, {bore: 5, rod: 3.5}, {bore: 6, rod: 2.5}, {bore: 6, rod: 3}, {bore: 6, rod: 3.5}, {bore: 6, rod: 4}, {bore: 7, rod: 3}, {bore: 7, rod: 3.5}, {bore: 7, rod: 4},
                          {bore: 7, rod: 5}, {bore: 8, rod: 3.5}, {bore: 8, rod: 4}, {bore: 8, rod: 5}, {bore: 8, rod: 5.5}];

  const hhmiCombinations = [{bore: 50, rod: 32}, {bore: 50, rod: 36}, {bore: 63, rod: 40}, {bore: 63, rod: 45}, {bore: 80, rod: 50}, {bore: 80, rod: 56}, {bore: 100, rod: 63}, {bore: 100, rod: 70},
                            {bore: 125, rod: 80}, {bore: 125, rod: 90}, {bore: 160, rod: 100}, {bore: 160, rod: 110}, {bore: 200, rod: 125}, {bore: 200, rod: 140}, {bore: 250, rod: 160}, 
                            {bore: 320, rod: 200}, {bore: 320, rod: 220}, {bore: 400, rod: 250}, {bore: 400, rod: 280}, {bore: 500, rod: 320}, {bore: 500, rod: 360}];

  let referenceBoreMM = Math.pow(((4 * document.getElementById('inputPushForceNewton').value)) / (Math.PI * document.getElementById('inputPushPressureMpa').value), 1/2);
  let referenceBoreIN = referenceBoreMM / 254 * 10;
  let tempRod = 0; //Used to temporarily hold the value of suitable rod to add to the table.
  let constantForPull = (4 * document.getElementById('inputPullForceNewton').value) / (Math.PI * document.getElementById('inputPullPressureMpa').value);
  
  let hshHTMLAcc = ``, hbHTMLAcc = ``, hhmiHTMLAcc = ``; //Used to accumulate the HTML code to be added to the table.
  
  function checkBoreRod (arrayCombinations, reference) {
    let htmlAcc = ``;
    for (let i = 0; i < arrayCombinations.length; i++) {
      if (Number(arrayCombinations[i].bore) >= Number(reference)) {
        tempRod = Number(Math.pow((Math.pow(Number(arrayCombinations[i].bore), 2) - Number(constantForPull)), 1/2));
        console.log(Number(arrayCombinations[i].bore));
        console.log('Temp: ' + tempRod + ' i: ' + i);
        if (Number(arrayCombinations[i].rod) <= tempRod) {
          htmlAcc += `<tr><td scope="col" class="text-center" colspan="6">${arrayCombinations[i].bore}</td><td scope="col" class="text-center" colspan="6">${arrayCombinations[i].rod}</td></tr>`
        }
      }
    }
    return htmlAcc
  }

  hshHTMLAcc = checkBoreRod(hshCombinations, referenceBoreIN);
  hbHTMLAcc = checkBoreRod(hbCombinations, referenceBoreIN);
  hhmiHTMLAcc = checkBoreRod(hhmiCombinations, referenceBoreMM);

  let accumHTML = 
  `<table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">HSH</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="6" valign="middle">Bore</th>
        <th scope="col" class="text-center" colspan="6" valign="middle">Rod</th>
      </tr>
    </thead>
    <tbody>
      ${hshHTMLAcc}
    </tbody>
  </table>
  
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">HB</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="6" valign="middle">Bore</th>
        <th scope="col" class="text-center" colspan="6" valign="middle">Rod</th>
      </tr>
    </thead>
    <tbody>
      ${hbHTMLAcc}
    </tbody>
  </table>
  
  <table class="table table-sm table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center" colspan="12" valign="middle">HHMI</th>
      </tr>
      <tr>
        <th scope="col" class="text-center" colspan="6" valign="middle">Bore</th>
        <th scope="col" class="text-center" colspan="6" valign="middle">Rod</th>
      </tr>
    </thead>
    <tbody>
      ${hhmiHTMLAcc}
    </tbody>
  </table>`

  document.getElementById('js-show-div').innerHTML = accumHTML;
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Asynchronous functions setction - Start


//Asynchronous functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start
window.addEventListener('load', () => {
  loadCylinderMountings();
  conversionListener();
  if (sessionStorage.getItem('prev-buckling-initial') === 'true') {
    const arrayToReloadData = sessionStorage.getItem('calc-init-data').split(',');
    arrayToReloadData.forEach((e, i) => {
      document.querySelectorAll('.js-save')[i].value = e;
    })
    loadingTable();
    sessionStorage.setItem('prev-buckling-initial', false);
  }
})

//Add listeners for the conversions to happen
function conversionListener() {
  //General - It changes values from psi to mpa and bar
  document.querySelectorAll(".js-psi").forEach((e, index) => {
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    let barElement = document.querySelectorAll(".js-bar")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, mpaElement, 3);
        elementsConversion(e, barElement, 4);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, mpaElement, 3);
        elementsConversion(e, barElement, 4);
    });
  });

  //General - It changes values from mpa to psi and bar
  document.querySelectorAll(".js-mpa").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let barElement = document.querySelectorAll(".js-bar")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, psiElement, 5);
        elementsConversion(e, barElement, 6);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, psiElement, 5);
        elementsConversion(e, barElement, 6);
    });
  });

  //General - It changes values from bar to psi and mpa
  document.querySelectorAll(".js-bar").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, psiElement, 7);
        elementsConversion(e, mpaElement, 8);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, psiElement, 7);
        elementsConversion(e, mpaElement, 8);
    });
  });

  //General - It changes values from lbf to Newtons and ton-force
  document.querySelectorAll(".js-lbf").forEach((e, index) => {
    let newtonElement = document.querySelectorAll(".js-newton")[index];
    let tonElement = document.querySelectorAll(".js-ton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, newtonElement, 9);
        elementsConversion(e, tonElement, 10);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, newtonElement, 9);
        elementsConversion(e, tonElement, 10);
    });
  });

  //General - It changes values from Newtons to lbf and ton-force
  document.querySelectorAll(".js-newton").forEach((e, index) => {
    let lbfElement = document.querySelectorAll(".js-lbf")[index];
    let tonElement = document.querySelectorAll(".js-ton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, lbfElement, 11);
        elementsConversion(e, tonElement, 12);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, lbfElement, 11);
        elementsConversion(e, tonElement, 12);
    });
  });

  //General - It changes values from ton-force to lbf and Newtons
  document.querySelectorAll(".js-ton").forEach((e, index) => {
    let lbfElement = document.querySelectorAll(".js-lbf")[index];
    let newtonElement = document.querySelectorAll(".js-newton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, lbfElement, 13);
        elementsConversion(e, newtonElement, 14);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, lbfElement, 13);
        elementsConversion(e, newtonElement, 14);
    });
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

//Makes sure the table is created and updated every time a change is done
document.querySelectorAll('.js-load-table').forEach((e, i) => {
  e.addEventListener('focusout', () => {
    loadingTable();
  })
  e.addEventListener('keyup', () => {
    loadingTable();
  })
  e.addEventListener('change', () => {
    loadingTable();
  })
})

// document.body.addEventListener('click', () => {
//   loadingTable();
// })

//Used to show cylinder specs suggestions
document.getElementById('js-show-suitable-cylinders').addEventListener('click', () => {
  showCylinderSuggestions();
})

window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

//When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-first-next').addEventListener('click', () => {
  if (emptyFields()) {
    alert('Please provide at least one link to number and make sure fields for cylinder initial specs are not empty!');
  }
  else if (notEnoughForce) {
    alert('Design changes needed. Actual forces smaller than required!');
  }
  else {
    isNext = true;
    saveData();
    location.assign('http://localhost:3000/calculationbuckling');
  }  
})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



