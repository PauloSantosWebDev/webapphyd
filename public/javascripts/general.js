//General functions - Start
  async function loadContactsCompanyName () {
    const selection = document.getElementById('js-input-customer-supplier').value;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({selection})
    };

    const response = await fetch('/regcontacts', options);
    
    const data = await response.json();
    
    return data.body;
  };

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

document.getElementById('js-input-customer-supplier').addEventListener('change', async () => {

  const arrayFromFunction = await loadContactsCompanyName();
  let accumulatorHTML = '<option selected>Choose...</option>';
  let controller = document.getElementById('js-input-company-name');
  
  arrayFromFunction.forEach(e => {
    accumulatorHTML += `<option value='${e.value}'>${e.label}</option>`
  })
  
  controller.innerHTML = accumulatorHTML;

})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



