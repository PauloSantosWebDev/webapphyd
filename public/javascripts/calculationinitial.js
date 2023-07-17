//General functions - Start
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


function loadingTable () {
  const pullPressWP = document.getElementById('inputPullPressureMpa').value;
  const pushPressWP = document.getElementById('inputPushPressureMpa').value;
  const testPress = document.getElementById('inputTestPressureMpa').value;
  const boreMM = document.getElementById('inputBoreMM').value;
  const rodMM = document.getElementById('inputRodMM').value;

  let pullForceWP = Number(pullPressWP * (Math.PI/4) * (Math.pow(boreMM, 2) - Math.pow(rodMM, 2))).toFixed(2);
  let pushForceWP = Number(pushPressWP * (Math.PI/4) * Math.pow(boreMM, 2)).toFixed(2);

  let pullForceTest = Number(testPress * (Math.PI/4) * (Math.pow(boreMM, 2) - Math.pow(rodMM, 2))).toFixed(2);
  let pushForceTest = Number(testPress * (Math.PI/4) * Math.pow(boreMM, 2)).toFixed(2);
  
  let openCenters = Number(document.getElementById('inputNetStrokeMM').value) + Number(document.getElementById('inputClosedCentersMM').value);
  
  let accumHTML =
  `<tr>
    <td scope="col" class="text-center" colspan="3">Working Pressure - Pull - ${document.getElementById('inputPullPressurePsi').value} psi</th>
    <td class="text-center" id="js-wp-pull-lbf" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceWP, 11))}</td>
    <td class="text-center" id="js-wp-pull-newton" colspan="3">${new Intl.NumberFormat().format(pullForceWP)}</td>
    <td class="text-center" id="js-wp-pull-ton" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceWP, 12))}</td>
  </tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Working Pressure - Push - ${document.getElementById('inputPushPressurePsi').value} psi</th>
    <td class="text-center" id="js-wp-push-lbf" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceWP, 11))}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(pushForceWP)}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pushForceWP, 12))}</td>
  </tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Test Pressure - Pull - ${document.getElementById('inputTestPressurePsi').value} psi</th>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceTest, 11))}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(pullForceTest)}</td>
    <td class="text-center" colspan="3">${new Intl.NumberFormat().format(conversion(pullForceTest, 12))}</td>
  </tr>
  <tr>
    <td scope="col" class="text-center" colspan="3">Test Pressure - Push - ${document.getElementById('inputTestPressurePsi').value} psi</th>
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

  if (Number(document.getElementById('inputPullForceNewton').value) <= pullForceWP) {

  }
}


document.body.addEventListener('click', () => {
  loadingTable();
})


//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Asynchronous functions setction - Start


//Asynchronous functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start
window.addEventListener('load', () => {
  loadCylinderMountings();
  conversionListener();
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

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



