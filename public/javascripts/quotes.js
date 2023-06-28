//General functions - Start

async function updatePageRadio (selection) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selection})
  }

  const response = await fetch('/quoteone', options);

  const data = await response.json();
  console.log(data);
  console.log(data.status);
  console.log(data.body);

  return data.body;
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Enable fields with class js-off-through-radio-.. when js-radio-off class radio buttons are selected.
document.querySelectorAll(".js-radio-quote-for").forEach((e, index) => {
  e.addEventListener('change', async () => {
      console.log(e.value);
      const radioOpt = await updatePageRadio(e.value);
      const contentChanger = document.getElementById('js-page-content');
      if (radioOpt === 'option1') {
        contentChanger.innerHTML = `<h2>STILL OPTION 1 WORKING</h2>`
      } 
      else if (radioOpt === 'option2') {
        contentChanger.innerHTML = `<h2>OPTION 2 WORKING</h2>`
      }
      else if (radioOpt === 'option3') {
        contentChanger.innerHTML = `<h2>OPTION 3 WORKING</h2>`
      }
      else {
        contentChanger.innerHTML = `<h2>SOMETHING ELSE WORKING</h2>`
      }
  });
});

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



