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
  
  const youngsModulus = Number(document.getElementById('inputYoungsModulus').value);
  const pushForceWP = sessionStorage.getItem('push-force-wp-newton-for-calc');
  const pushForceTP = sessionStorage.getItem('push-force-tp-newton-for-calc');
  const rodOD = sessionStorage.getItem('rod-mm-for-calc');
  const columnLength = sessionStorage.getItem('open-centers-for-calc');
  let safetyFactorWP = 0;
  let safetyFactorTP = 0;

  if (document.getElementById('js-round-hollow-no').checked) {
    if (document.getElementById('inputEndCondition').value === 'endCondition1') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(16 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(16 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition2') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(64 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(64 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition3') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(8 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(8 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(4 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * Math.pow(rodOD, 4))/(4 * Math.pow(columnLength, 2) * pushForceTP);
    }
  }
  else {
    const rodID = Number(document.getElementById('inputRodID').value);
    if (document.getElementById('inputEndCondition').value === 'endCondition1') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(16 * Math.pow(columnLength, 2) * pushForceWP); //1000 is necessary as E should be in GPa
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(16 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition2') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(64 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(64 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else if (document.getElementById('inputEndCondition').value === 'endCondition3') {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(8 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(8 * Math.pow(columnLength, 2) * pushForceTP);
    }
    else {
      safetyFactorWP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(4 * Math.pow(columnLength, 2) * pushForceWP);
      safetyFactorTP = (youngsModulus * 1000 * Math.pow(Math.PI, 2) * (Math.pow(rodOD, 4) - Math.pow(rodID, 4)))/(4 * Math.pow(columnLength, 2) * pushForceTP);
    }
  }
  console.log('Safety factor wp:' + safetyFactorWP);
  console.log('Safety factor tp:' + safetyFactorTP);
})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



