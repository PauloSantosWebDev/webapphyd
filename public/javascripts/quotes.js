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

async function getHtmlContent (path) {
  // const options = {
  //   method: 'get'
  // }
  const response = await fetch(path);
  const data = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const docBody = doc.body.innerHTML;
  return docBody;
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
      } 
      else if (radioOpt === 'option2') {
        contentChanger.innerHTML = generateRepairPage();
      }
      else if (radioOpt === 'option3') {
        contentChanger.innerHTML = generateRepeatCylinderPage();
      }
      // else {
      //   contentChanger.innerHTML = `<h2>SOMETHING ELSE WORKING</h2>`
      // }
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
        }
        else if (innerType.value === 'telescopic') {
          const content = await getHtmlContent('../pages/telescopic.html');
          controllerHTML.innerHTML = content;
          // controllerHTML.innerHTML=`<h2>Telescopic${innerType.value}</h2>`;
        }
        else if (innerType.value === 'spring') {
          const content = await getHtmlContent('../pages/spring.html');
          controllerHTML.innerHTML = content;
        }
        else if (innerType.value === 'displacement') {
          const content = await getHtmlContent('../pages/displacement.html');
          controllerHTML.innerHTML = content;
        }
        else {
          const content = await getHtmlContent('../pages/standard.html');
          controllerHTML.innerHTML = content;
        }
      })
    }
  }
})

window.addEventListener('load', () => conversionListener());

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
}
//Event listeners setction - End
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

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

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



