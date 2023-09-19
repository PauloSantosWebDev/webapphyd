//Global variables
let isNext = false;

//Initiating page
sessionStorage.setItem('quoteTitle', document.querySelector(".registration-forms-title").innerHTML); //Used to capture the title and use the same on the next pages
conversionListener();
mountingsList();
netStrokeListener ();

//If statetement used to populate back information when previous button is used
if (sessionStorage.getItem('firstPrevious') === 'true') {
  const radioSelected = sessionStorage.getItem('radio-btn-quote-for');
  if (radioSelected === 'option1') {
    callToPopulate();
  }
  sessionStorage.setItem('firstPrevious', false);

  //This is used to make sure all the customer information details are populated back
  document.addEventListener('DOMContentLoaded', () => {
    const nameToReload = sessionStorage.getItem('customerInfo').split(',')[1];
    if (sessionStorage.getItem('contactDetails')) {
      let array = JSON.parse(sessionStorage.getItem('contactDetails'));
      let htmlAccumulator = `<option></option>`;
      array.forEach(e => {
        htmlAccumulator += `<option value="${e.name}">${e.name}</option>`;
      })
      document.getElementById('inputContact').innerHTML = htmlAccumulator;
      document.getElementById('inputContact').value = nameToReload;
    }
  })
}

//--------------------------------------------------------------------------------------------------------------------------
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

//IMPORTANT!!! Note that this function is for standard new cylinders only
//For any other situation, other functions are in use (or have to be created)
function newCylStd () {
  const arrayPsi = [];
  const arrayMpa = [];
  const arrayBar = [];
  const arrayLbf = [];
  const arrayNew = [];
  const arrayTon = [];
  const arrayIn = [];
  const arrayMM = [];
  const arrayCustInfo = [];
  const arrayType = [];
  const arrayExtra = [];
  const inputId = ['.js-psi', '.js-mpa', '.js-bar', '.js-lbf', '.js-newton', '.js-ton', '.js-in-to-mm', '.js-mm-to-in', '.js-customer-info', '.js-type', '.js-extra'];
  const arrayArrays = [arrayPsi, arrayMpa, arrayBar, arrayLbf, arrayNew, arrayTon, arrayIn, arrayMM, arrayCustInfo, arrayType, arrayExtra];
  for (i = 0; i < inputId.length; i++) {
    document.querySelectorAll(inputId[i]).forEach((e) => {
      // arrayPsi.push(e.value);
      arrayArrays[i].push(e.value);
    })
  }
  const theoreticalPush = Number(arrayMpa[1] * (Math.PI/4) * Math.pow(arrayMM[0], 2)).toFixed(2);
  const theoreticalPull = Number(arrayMpa[0] * (Math.PI/4) * (Math.pow(arrayMM[0], 2) - Math.pow(arrayMM[1], 2))).toFixed(2);
  
  //Checking if input values make sense
  //Checking if Customer and contact information were provided
  if (!(document.getElementById('inputCustomer').value || document.getElementById('inputContact').value)) {
    alert(`Please inform Customer and Contact.`);
    return;
  }
  
  //Checking bore and rod, and gross stroke and stop tube.
  if (Number(arrayMM[0]) <= Number(arrayMM[1])) {
    alert(`Bore cannot be smaller or equal to rod diameter.`);
    return;
  } else if (Number(arrayMM[2]) <= Number(arrayMM[3])) {
    alert(`Gross stroke cannot be smaller or equal to stop tube length.`);
    return;
  }

  //Checking if the closed centers was informed
  if (!document.getElementById('inputClosedCentersIn').value) {
    alert(`Please informed the closed centers.`);
    return;
  }

  //Checking theoretical against required forces
  if (theoreticalPush < arrayNew[1]) {
    const isTrue = confirm(`Do you want to continue? Theoretical push (${theoreticalPush} Newtons) is smaller then required push (${arrayNew[1]} Newtons).`);
    if (!isTrue) {
      return;
    }
  } 
  else if (theoreticalPull < arrayNew[0]) {
    const isTrue = confirm(`Do you want to continue? Theoretical pull (${theoreticalPull} Newtons) is smaller then required pull (${arrayNew[0]} Newtons).`);
    if (!isTrue) {
      return;
      // location.replace('http://localhost:3000/');
    }
  }
  sessionStorage.setItem('psi', arrayPsi);
  sessionStorage.setItem('mpa', arrayMpa);
  sessionStorage.setItem('bar', arrayBar);
  sessionStorage.setItem('lbf', arrayLbf);
  sessionStorage.setItem('new', arrayNew);
  sessionStorage.setItem('ton', arrayTon);
  sessionStorage.setItem('inches', arrayIn);
  sessionStorage.setItem('millimeters', arrayMM);
  sessionStorage.setItem('customerInfo', arrayCustInfo);
  sessionStorage.setItem('type', arrayType);
  sessionStorage.setItem('extra', arrayExtra);
  window.location.pathname = '/quotebrlassy';
}

//Used to calculate the net stroke. Difference btw gross stroke and stop tube length.
function netStrokeCalc () {
  let gsElementIn = document.getElementById('inputGrossStrokeIn');
  let stElementIn = document.getElementById('inputStopTubeIn');
  let gsElementMM = document.getElementById('inputGrossStrokeMM');
  let stElementMM = document.getElementById('inputStopTubeMM');
  if (gsElementIn.value == '' && stElementIn.value == '') {
      emptyFields(document.getElementById('inputNetStrokeIn'), document.getElementById('inputNetStrokeMM'));
  }
  else
  {
      let result = document.getElementById('inputNetStrokeIn');
      result.value = (gsElementIn.value - stElementIn.value).toFixed(2);
      result = document.getElementById('inputNetStrokeMM');
      result.value = (gsElementMM.value - stElementMM.value).toFixed(2);
  }
}

//Function used to populate back information when previous button is used
function populateBack (nameStorage, nameClass) {
  let arrayGeneric = sessionStorage.getItem(nameStorage);
  arrayGeneric = arrayGeneric.split(',');
  arrayGeneric.forEach((e, i) => {
    document.querySelectorAll('.' + nameClass)[i].value = e;
  })
}

//Function used to call multiple times the function popuplateBack
function callToPopulate () {
  populateBack('millimeters', 'js-mm-to-in');
  populateBack('inches', 'js-in-to-mm');
  populateBack('psi', 'js-psi');
  populateBack('mpa', 'js-mpa');
  populateBack('bar', 'js-bar');
  populateBack('lbf', 'js-lbf');
  populateBack('new', 'js-newton');
  populateBack('ton', 'js-ton');
  populateBack('customerInfo', 'js-customer-info');
  populateBack('type', 'js-type');
  mountingsList();
  populateBack('extra', 'js-extra');
  return
}

//General functions - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//Fetch and async functions - start

//Used to fetch .html files to autogenerate part of the page.
async function getHtmlContent (path) {
  const response = await fetch(path);
  const data = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const docBody = doc.body.innerHTML;
  return docBody;
}

//Used to fetch data to feed dropdown fields
//Used to get labour costs for the labour session
async function showContact (target, value) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target, value})
  };
  try {
    const response = await fetch("/quoteone", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Used to update contact details
async function updateDetails (target, id, email, phone, mobile) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target, id, email, phone, mobile})
  };
  try {
    const response = await fetch("/quoteone", options);
    const result = await response.json();
    return result.body;
  } catch (error) {
    console.error("Error: ", error);
  }
}

//Fetch and async functions - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Change the content of js-page-content-first div, autogenerating the HTML.
//Create event listeners for all radios with class of js-radio-quote-for
document.querySelectorAll(".js-radio-quote-for").forEach((e, index) => {
  e.addEventListener('change', async () => {
      // const radioOpt = await updatePageRadio(e.value);
      const radioOpt = e.value;
      const contentChanger = document.getElementById('js-page-content-first');
      if (radioOpt === 'option1') {
        contentChanger.innerHTML = await generateNewCylinderPage();
        mountingsList();
        netStrokeListener();
      } 
      else if (radioOpt === 'option2') {
        contentChanger.innerHTML = generateRepairPage();
      }
      else if (radioOpt === 'option3') {
        contentChanger.innerHTML = generateRepeatCylinderPage();
      }
      conversionListener();
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
      innerType.addEventListener('change', async () =>{
        if (innerType.value === 'doubleEnded') {
          const content = await getHtmlContent('../pages/doubleended.html');
          controllerHTML.innerHTML = content;
          conversionListener();
          mountingsList();
        }
        else if (innerType.value === 'telescopic') {
          const content = await getHtmlContent('../pages/telescopic.html');
          controllerHTML.innerHTML = content;
          // controllerHTML.innerHTML=`<h2>Telescopic${innerType.value}</h2>`;
          conversionListener();
        }
        else if (innerType.value === 'spring') {
          const content = await getHtmlContent('../pages/spring.html');
          controllerHTML.innerHTML = content;
          conversionListener();
        }
        else if (innerType.value === 'displacement') {
          const content = await getHtmlContent('../pages/displacement.html');
          controllerHTML.innerHTML = content;
          conversionListener();
        }
        else {
          const content = await getHtmlContent('../pages/standard.html');
          controllerHTML.innerHTML = content;
          conversionListener();
          mountingsList();
          netStrokeListener ();
        }
      })
    }
  }
  else if (event.target.id == 'inputBodyType') {
    mountingsList();
  }
})

//Code to check if user really want to leave or reload the page
window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

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
    e.addEventListener('keyup', (element) => { 
      elementsConversion(e, mpaElement, 3);
      elementsConversion(e, barElement, 4);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-psi').length) {
          document.querySelectorAll(".js-psi")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-lbf")[0].focus();
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
          document.querySelectorAll(".js-lbf")[0].focus();
        }
      }
    })
  });

  //General - It changes values from mpa to psi and bar
  document.querySelectorAll(".js-mpa").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let barElement = document.querySelectorAll(".js-bar")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, psiElement, 5);
        elementsConversion(e, barElement, 6);
    });
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, psiElement, 5);
      elementsConversion(e, barElement, 6);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-mpa').length) {
          document.querySelectorAll(".js-mpa")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-newton")[0].focus();
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
          document.querySelectorAll(".js-newton")[0].focus();
        }
      }
    })
  });

  //General - It changes values from bar to psi and mpa
  document.querySelectorAll(".js-bar").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    e.addEventListener('change', () => {
      elementsConversion(e, psiElement, 7);
      elementsConversion(e, mpaElement, 8);
    });
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, psiElement, 7);
      elementsConversion(e, mpaElement, 8);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-bar').length) {
          document.querySelectorAll(".js-bar")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-ton")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-bar').length) {
          document.querySelectorAll(".js-bar")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-ton")[0].focus();
        }
      }
    })
  });

  //General - It changes values from lbf to Newtons and ton-force
  document.querySelectorAll(".js-lbf").forEach((e, index) => {
    let newtonElement = document.querySelectorAll(".js-newton")[index];
    let tonElement = document.querySelectorAll(".js-ton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, newtonElement, 9);
        elementsConversion(e, tonElement, 10);
    });
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, newtonElement, 9);
      elementsConversion(e, tonElement, 10);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-lbf').length) {
          document.querySelectorAll(".js-lbf")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-in-to-mm")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-lbf').length) {
          document.querySelectorAll(".js-lbf")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-in-to-mm")[0].focus();
        }
      }
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
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, lbfElement, 11);
      elementsConversion(e, tonElement, 12);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-newton').length) {
          document.querySelectorAll(".js-newton")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-mm-to-in")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-newton').length) {
          document.querySelectorAll(".js-newton")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-mm-to-in")[0].focus();
        }
      }
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
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, lbfElement, 13);
      elementsConversion(e, newtonElement, 14);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-ton').length) {
          document.querySelectorAll(".js-ton")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-mm-to-in")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-ton').length) {
          document.querySelectorAll(".js-ton")[index + 1].focus();
        }
        else {
          document.querySelectorAll(".js-mm-to-in")[0].focus();
        }
      }
    });
  });

  //General - Changing values from inches to millimeters
  document.querySelectorAll(".js-in-to-mm").forEach((e, index) => {
    let other = document.querySelectorAll(".js-mm-to-in")[index];
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, other, 1);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-in-to-mm').length) {
          if ((index + 1) === 4) {
            document.querySelectorAll(".js-in-to-mm")[index + 2].focus();
          }
          else {
            document.querySelectorAll(".js-in-to-mm")[index + 1].focus();
          }
        }
        else {
          document.querySelectorAll(".js-extra")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-in-to-mm').length) {
          if ((index + 1) === 4) {
            document.querySelectorAll(".js-in-to-mm")[index + 2].focus();
          }
          else {
            document.querySelectorAll(".js-in-to-mm")[index + 1].focus();
          }
        }
        else {
          document.querySelectorAll(".js-extra")[0].focus();
        }
      }
    });
    e.addEventListener('change', () => {
      elementsConversion(e, other, 1);
    });
  });

  //General - Changing values from millimeters to inches
  document.querySelectorAll(".js-mm-to-in").forEach((e, index) => {
    let other = document.querySelectorAll(".js-in-to-mm")[index];
    e.addEventListener('keyup', (element) => {
      elementsConversion(e, other, 2);
      if (element.key === 'Enter') {
        if ((index + 1) < document.querySelectorAll('.js-mm-to-in').length) {
          if ((index + 1) === 4) {
            document.querySelectorAll(".js-mm-to-in")[index + 2].focus();
          }
          else {
            document.querySelectorAll(".js-mm-to-in")[index + 1].focus();
          }
        }
        else {
          document.querySelectorAll(".js-extra")[0].focus();
        }
      }
    });
    e.addEventListener('keydown', (element) => {
      if (element.key === 'Tab') {
        element.preventDefault();
        if ((index + 1) < document.querySelectorAll('.js-mm-to-in').length) {
          if ((index + 1) === 4) {
            document.querySelectorAll(".js-mm-to-in")[index + 2].focus();
          }
          else {
            document.querySelectorAll(".js-mm-to-in")[index + 1].focus();
          }
        }
        else {
          document.querySelectorAll(".js-extra")[0].focus();
        }
      }
    });
    e.addEventListener('change', () => {
      elementsConversion(e, other, 2);
    });
  });
}

//Add listeners to the gross stroke and stop tube changes
//It is used to calculate the net stroke
function netStrokeListener() {
  const arrayId = ['inputGrossStrokeIn', 'inputGrossStrokeMM', 'inputStopTubeIn', 'inputStopTubeMM'];
  for (i = 0; i < arrayId.length; i++) {
    document.getElementById(arrayId[i]).addEventListener('change', () => {
      netStrokeCalc();
    })
    document.getElementById(arrayId[i]).addEventListener('keyup', () => {
      netStrokeCalc();
    })
  }
}

//Checking the theoretical forces against the required forces and alerting the user if theoretical is smaller than required
//Creating session variables for the information
document.getElementById('js-btn-first-next').addEventListener('click', () => {
  const checker = document.querySelectorAll('.js-radio-quote-for');
  const checkerInner = document.getElementById('inputInnerType');
  if (checker[0].checked) {
    if (checkerInner.value === 'standard') {
      isNext = true;
      sessionStorage.setItem('radio-btn-quote-for', checker[0].value);
      newCylStd();
    }
  }
})


//Used to call the function to populate the Contact field
//Also used to make sure the reload can be done properly
document.getElementById('inputCustomer').addEventListener('change', () => {
  async function loadContact () {
    let value = document.getElementById('inputCustomer').value;
    let htmlAccumulator = `<option></option>`;
    let contacts = await showContact('1', value);
    contacts.forEach(e => {
      htmlAccumulator += `<option value="${e.name}">${e.name}</option>`;
    })
    sessionStorage.setItem('contactDetails', JSON.stringify(contacts));
    document.getElementById('inputContact').innerHTML = htmlAccumulator;
  }
  loadContact();
})

//Used to populate Email, Phone, and Mobile for the contact chosen
document.getElementById('inputContact').addEventListener('change', () => {
  let contactDetails = JSON.parse(sessionStorage.getItem('contactDetails'));
  let target = 0;
  let contactName = document.getElementById('inputContact').innerHTML;
  for (let i = 0; i < contactDetails.length; i++) {
    if (contactDetails[i].name === contactName) {
      target = i;
    }
  }
  document.getElementById('inputEmail').value = contactDetails[target].email || "Not supplied";
  document.getElementById('inputPhone').value = contactDetails[target].phone || "Not supplied";
  document.getElementById('inputMobile').value = contactDetails[target].mobile || "Not supplied";
  let specificContact = {id: contactDetails[target].id, email: contactDetails[target].email, phone: contactDetails[target].phone, mobile: contactDetails[target].mobile};
  sessionStorage.setItem('specificContact', JSON.stringify(specificContact));
})

//Used to update the contact details
//The user does note have to go to the register contact to update information
document.getElementById('js-btn-update-contact').addEventListener('click', async () => {
  const response = confirm("Are you sure you want to update contact details?");
  if (response) {
    let specificContact = JSON.parse(sessionStorage.getItem('specificContact'));
    await updateDetails ('2', specificContact.id, document.getElementById('inputEmail').value, document.getElementById('inputPhone').value, document.getElementById('inputMobile').value);
    return
  }
  else {
    return
  }
})

//Event listeners setction - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//Autogenerate Standard section for new cylinder specs.
async function generateNewCylinderPage() {
  const res = await getHtmlContent('../pages/newcylinder.html');
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

//Autogenerate Cylinder mountings options
function mountingsList() {
  let hshMountings = ['None', 'Female Clevis', 'Male Clevis', 'Spherical Bearing', 'Front Flange', 'Rear Flange', 'Tapped Mount', 'Lug Mount', 'Front Trunnion', 'Rear Trunnion', 'Double Ended Cylinder'];
  let hbMountings = ['None', '1 - MX3 - Extended Tie Rod Head End', '1A - MX2 - Extended Tie Rod Cap End', '1B - MX1 - Extended Tie Rod Both Ends', '2 - MF1 - Head Rectangular Flange', '3 - MF2 - Cap Rectangular Flange', '4 - MF5 - Head Square Flange',
                    '5 - MF6 - Cap Square Flange', '6 - MS2 - Side Lugs', '7 - MS3 - Centre Line Lugs', '8 - MS4 - Side Tapped', '9 - End Angles', '10 - MS7 - End Lugs', '11 - MT1 - Head Trunnion', '12 - MT2 - Cap Trunnion', '13 - MT4 - Intermediate Trunnion',
                    '14 - MP1 - Cap Fixed Eye', '14B - MU3 - Cap Spherical Bearing'];
  let hhmiMountings = ['None', 'Cap Fixed Eye', 'Cap Spherical Bearing', 'Head Circular Flange', 'Cap Circular Flange', 'Intermediate Trunnion', 'Non-standard']; //Same mountings for hsmi

  const controller = document.getElementById('inputCylMounting');
  const checker = document.getElementById('inputBodyType');
  let accumulator = '';
  if (checker.value === 'HSH') {
    hshMountings.forEach((e, i) => {
      accumulator += `<option value='${i}'>${e}</option>`;
    })
    controller.innerHTML = accumulator;
  }
  else if (checker.value === 'HB') {
    hbMountings.forEach((e, i) => {
      accumulator += `<option value='${i}'>${e}</option>`;
    })
    controller.innerHTML = accumulator;
  }
  else {
    hhmiMountings.forEach((e, i) => {
      accumulator += `<option value='${i}'>${e}</option>`;
    })
    controller.innerHTML = accumulator;
  }
}
//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------