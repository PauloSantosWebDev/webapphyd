//Used to centralize the functions and listeners used by the layout page as it is used by all the other pages

//-----------------------------------------------------------------------------------------------------------
//ASYNC FUNCTIONS

//Used to set a session value to false and make sure a new number is created for a new quote
async function layoutNewQuote (target) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({target})
  };
  try {
    const response = await fetch("/quoteone", options);
    const result = await response.json();
    return result.status;
  } catch (error) {
    console.error("Error: ", error);
  }
}


//-----------------------------------------------------------------------------------------------------------
//LISTENERS

//New quote listener
document.getElementById('js-new-quote-layout').addEventListener('click', async () => {
  let promise = await layoutNewQuote('4');
  if (promise = 'success') {
    window.location.pathname = '/quoteone';
  }
})