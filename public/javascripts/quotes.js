//General functions - Start

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
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//Fetch and async functions - start
// async function updatePageRadio (selection) {
//   const options = {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({selection})
//   }

//   const response = await fetch('/quoteone', options);

//   const data = await response.json();
//   console.log(data);
//   console.log(data.status);
//   console.log(data.body);

//   return data.body;
// }

//Fetch and async functions - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Change the content of js-page-content-first div, autogenerating the HTML.
//Create event listeners for all radios with class of js-radio-quote-for
document.querySelectorAll(".js-radio-quote-for").forEach((e, index) => {
  e.addEventListener('change', () => {
      // const radioOpt = await updatePageRadio(e.value);
      const radioOpt = e.value;
      const contentChanger = document.getElementById('js-page-content-first');
      if (radioOpt === 'option1') {
        contentChanger.innerHTML = generateNewCylinderPage();
      } 
      else if (radioOpt === 'option2') {
        contentChanger.innerHTML = generateRepairPage();
      }
      else if (radioOpt === 'option3') {
        contentChanger.innerHTML = generateRepeatCylinderPage();
      }
      else {
        contentChanger.innerHTML = `<h2>SOMETHING ELSE WORKING</h2>`
      }
  });
});

//Change the content of js-page-content-second div, autogenerating the HTML.
//Create event listener inner type input field.
document.body.addEventListener('click', (event) => {
  if (event.target.id == 'inputInnerType') {
    const quoteForRadioChecker = document.getElementById('js-radio-new-cyl');
    const controllerHTML = document.getElementById('js-page-content-second');
    if (quoteForRadioChecker.value === 'option1') {
      const innerType = document.getElementById('inputInnerType');
      innerType.addEventListener('change', () =>{
        if (innerType.value === 'doubleEnded') {
          controllerHTML.innerHTML='<h2>Double-ended</h2>';
        }
        else if (innerType.value === 'telescopic') {
          controllerHTML.innerHTML=`<h2>Telescopic${innerType.value}</h2>`;
        }
        else if (innerType.value === 'spring') {
          controllerHTML.innerHTML='<h2>spring</h2>';
        }
        else if (innerType.value === 'displacement') {
          controllerHTML.innerHTML='<h2>Displacement</h2>';
        }
        else {
          controllerHTML.innerHTML='<h2>Standard</h2>';
        }

      })
    }
  }
})



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

//Event listeners setction - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

function generateNewCylinderPage() {
  const res = `<form class="row g-3">
  <h4 class="registration-forms-subtitle">CYLINDER SPECS</h4>
  
  <div class="col-md-3">
    <label for="inputBodyType" class="form-label">Body type</label>
    <select id="inputBodyType" name="inputBodyType" class="form-select">
      <option selected value="HSH">HSH</option>
      <option value="HB">HB</option>
      <option value="HHMI">HHMI</option>
      <option value="HSMI">HSMI</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="inputInnerType" class="form-label">Inner type</label>
    <select id="inputInnerType" name="inputInnerType" class="form-select">
      <option selected value="standard">Standard</option>
      <option value="doubleEnded">Double-ended</option>
      <option value="telescopic">Telescopic</option>
      <option value="spring">Spring</option>
      <option valeu="displacement">Displacement</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="inputForceGenerator" class="form-label">Force generator</label>
    <select id="inputForceGenerator" name="inputForceGenerator" class="form-select">
      <option selected value="hydraulic">Hydraulic</option>
      <option value="pneumatic">Pneumatic</option>
    </select>
  </div>
  <div class="col-md-3">
    <label for="inputActingType" class="form-label">Acting type</label>
    <select id="inputActingType" name="inputActingType" class="form-select">
      <option selected value="doubleActing">Double acting</option>
      <option value="singleActing">Single acting</option>
    </select>
  </div>
  
  <h5 class="registration-forms-subtitle">Pull Pressure</h5>
  <div class="col-md-4">
    <label for="inputPullPressurePsi" class="form-label">Pull pressure - psi</label>
    <input type="number" min="0.0" class="form-control js-psi" id="inputPullPressurePsi" name="inputPullPressurePsi">
  </div>
  <div class="col-md-4">
    <label for="inputPullPressureMpa" class="form-label">Pull pressure - MPa</label>
    <input type="number" min="0.0" class="form-control js-mpa" id="inputPullPressureMpa" name="inputPullPressureMpa">
  </div>
  <div class="col-md-4">
    <label for="inputPullPressureBar" class="form-label">Pull pressure - bar</label>
    <input type="number" min="0.0" class="form-control js-bar" id="inputPullPressureBar" name="inputPullPressureBar">
  </div>
  <h5 class="registration-forms-subtitle">Push Pressure</h5>
  <div class="col-md-4">
    <label for="inputPushPressurePsi" class="form-label">Push pressure - psi</label>
    <input type="number" min="0.0" class="form-control js-psi" id="inputPushPressurePsi" name="inputPushPressurePsi">
  </div>
  <div class="col-md-4">
    <label for="inputPushPressureMpa" class="form-label">Push pressure - MPa</label>
    <input type="number" min="0.0" class="form-control js-mpa" id="inputPushPressureMpa" name="inputPushPressureMpa">
  </div>
  <div class="col-md-4">
    <label for="inputPushPressureBar" class="form-label">Push pressure - bar</label>
    <input type="number" min="0.0" class="form-control  js-bar" id="inputPushPressureBar" name="inputPushPressureBar">
  </div>
  <h5 class="registration-forms-subtitle">Pull Force - Required</h5>
  <div class="col-md-4">
    <label for="inputPullForceLbf" class="form-label">Pull force - lbf</label>
    <input type="number" min="0.0" class="form-control js-lbf" id="inputPullForceLbf" name="inputPullForceLbf">
  </div>
  <div class="col-md-4">
    <label for="inputPullForceNewton" class="form-label">Pull force - Newton</label>
    <input type="number" min="0.0" class="form-control js-newton" id="inputPullForceNewton" name="inputPullForceNewton">
  </div>
  <div class="col-md-4">
    <label for="inputPullForceTon" class="form-label">Pull force - ton-force</label>
    <input type="number" min="0.0" class="form-control js-ton" id="inputPullForceTon" name="inputPullForceTon">
  </div>
  <h5 class="registration-forms-subtitle">Push Force - Required</h5>
  <div class="col-md-4">
    <label for="inputPushForceLbf" class="form-label">Push force - lbf</label>
    <input type="number" min="0.0" class="form-control js-lbf" id="inputPushForceLbf" name="inputPushForceLbf">
  </div>
  <div class="col-md-4">
    <label for="inputPushForceNewton" class="form-label">Push force - Newton</label>
    <input type="number" min="0.0" class="form-control js-newton" id="inputPushForceNewton" name="inputPushForceNewton">
  </div>
  <div class="col-md-4">
    <label for="inputPushForceTon" class="form-label">Push force - ton-force</label>
    <input type="number" min="0.0" class="form-control js-ton" id="inputPushForceTon" name="inputPushForceTon">
  </div>
</form>


<div id="js-page-content-second">
  
  <form class="row g-3">
    <h4 class="registration-forms-subtitle">Seoncond autogenerated part</h4>
    
    <div class="col-md-3">
      <label for="inputBodyType" class="form-label">Body type</label>
      <select id="inputBodyType" name="inputBodyType" class="form-select">
        <option selected value="HSH">HSH</option>
        <option value="HB">HB</option>
        <option value="HHMI">HHMI</option>
        <option value="HSMI">HSMI</option>
      </select>
    </div>
    <div class="col-md-3">
      <label for="inputInnerType" class="form-label">Inner type</label>
      <select id="inputInnerType" name="inputInnerType" class="form-select">
        <option selected value="standard">Standard</option>
        <option value="doubleEnded">Double-ended</option>
        <option value="telescopic">Telescopic</option>
        <option value="spring">Spring</option>
        <option valeu="displacement">Displacement</option>
      </select>
    </div>
    <div class="col-md-3">
      <label for="inputForceGenerator" class="form-label">Force generator</label>
      <select id="inputForceGenerator" name="inputForceGenerator" class="form-select">
        <option selected value="hydraulic">Hydraulic</option>
        <option value="pneumatic">Pneumatic</option>
      </select>
    </div>
    <div class="col-md-3">
      <label for="inputActingType" class="form-label">Acting type</label>
      <select id="inputActingType" name="inputActingType" class="form-select">
        <option selected value="doubleActing">Double acting</option>
        <option value="singleActing">Single acting</option>
      </select>
    </div>
  </form>
</div>`;
  return res;
}

function generateRepairPage() {
  const res = `<h2>OPTION 2 WORKING</h2>`;
  return res;
}

function generateRepeatCylinderPage() {
  const res = `<h2>OPTION 3 WORKING</h2>`;
  return res;
}

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



