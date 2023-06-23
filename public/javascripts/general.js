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
    console.log('The response is: ' + response);
    const data = await response.json();
    console.log('The data is: ' + data.body);
    // console.log (data.body.codeOptionsCompanyName);
    return data.body;
  };

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start
// let controller = getElementById('js-input-company-name');
document.getElementById('js-input-customer-supplier').addEventListener('change', async () => {
  
  // const element = document.getElementById('js-input-customer-supplier');
  // const selection = element.value;
  
  // console.log('The element I am parsing is: ' + element);
  // console.log('The value of the element I am parsing is: ' + element.value);

  const arrayFromFunction = await loadContactsCompanyName();
  console.log('arrayFromFunction is: ' + JSON.stringify(arrayFromFunction));
  console.log('arrayFromFunction is: ' + typeof(arrayFromFunction));
  
  // let accumulatorHTML = '';
  // let controller = document.getElementById('js-input-company-name');
  
  // arrayFromFunction.forEach(e => {
  //   accumulatorHTML += `<option>${e.value}</option>`
  // })
  
  // controller.innerHTML = accumulatorHTML;

})

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



