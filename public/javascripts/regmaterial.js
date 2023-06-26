const imp = require('./general.js');
// import { elementsConversion } from 'general.js';

//General functions - Start

//General - It changes values from psi to mpa and bar
document.querySelectorAll(".js-psi").forEach((e, index) => {
  let mpaElement = document.querySelectorAll(".js-mpa")[index];
  
  e.addEventListener('change', () => {
      elementsConversion(e, mpaElement, 3);
      
  });
  e.addEventListener('keyup', () => {
      elementsConversion(e, mpaElement, 3);
      
  });
});

//General - It changes values from mpa to psi and bar
document.querySelectorAll(".js-mpa").forEach((e, index) => {
  let psiElement = document.querySelectorAll(".js-psi")[index];
  
  e.addEventListener('change', () => {
      elementsConversion(e, psiElement, 5);
  
  });
  e.addEventListener('keyup', () => {
      elementsConversion(e, psiElement, 5);
  
  });
});

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



