//General functions - Start

let isNext = false;
let sum = 0;

function getMarkedUpPrice () {
  const arrayMarkedUpPrice = sessionStorage.getItem('partsPrice').split(',');
  let sumPrice = 0;
  arrayMarkedUpPrice.forEach((e) => {
    sumPrice += Number(e);
  })
  document.querySelectorAll('.js-input-final-price')[0].value = Number(sumPrice).toFixed(2);

  for (let i = 1; i <= 6; i++) {
    document.querySelectorAll('.js-input-final-price')[i].value = '0.00';
  }
}

getMarkedUpPrice();

function saveDataForReload () {
  // const arrayMarkup = [];
  // document.querySelectorAll('.js-markup').forEach((e) => {
  //   arrayMarkup.push(e.value);
  // })
  // console.log(arrayMarkup);
  
  // sessionStorage.setItem('markup', arrayMarkup);
  // const arrayPrice = [];
  // document.querySelectorAll('.js-price').forEach((e) => {
  //   arrayPrice.push(e.value);
  // });
  // sessionStorage.setItem('partsPrice', arrayPrice);
  // location.assign('http://localhost:3000/calculationinitial');
  window.location.pathname = '/calculationinitial';
}

function populateBack () {
 
  // const event = new Event('change');
  // const arrayMarkup = sessionStorage.getItem('markup').split(',');
  // arrayMarkup.forEach((e,i) => {
  //   document.querySelectorAll('.js-markup')[i].value = e;
  //   document.querySelectorAll('.js-markup')[i].dispatchEvent(event);
  // })

  sessionStorage.setItem('ninthPrevious', false);
}

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Sum to get the final price
const prices = document.querySelectorAll('.js-input-final-price');
prices.forEach((e, i) => {
  e.addEventListener('keyup', () => {
    prices.forEach((event, index) => {
      if (index !== 6) {
        sum += Number(event.value);  
      }
    })
    prices[6].value = sum;
    sum = 0;
  })
  e.addEventListener('change', () => {
    prices.forEach((event, index) => {
      if (index !== 6) {
        sum += Number(event.value);  
      }
    })
    prices[6].value = sum;
    sum = 0;
  })
})

// Loads page with functionalities it needs when page is loaded
window.addEventListener('load', () => {
  document.querySelector(".registration-forms-title").innerHTML = sessionStorage.getItem('quoteTitle');
  if (sessionStorage.getItem('ninthPrevious') === 'true') {
    populateBack();
  }
  isNext = false;
})

// Code to check if user really want to leave or reload the page
window.onbeforeunload = () => {
  if (!isNext) {
    return "Are you sure you want to reload or leave the page? Data could be lost.";
  }  
}

//Necessary to re-populate data in the peripherals page.
document.getElementById('js-eighth-previous').addEventListener('click', () => {
  sessionStorage.setItem('eighthPrevious', true);
})

//When next is clicked, all the date need to be saved and next page loaded
document.getElementById('js-btn-ninth-next').addEventListener('click', () => {
  isNext = true;
  saveDataForReload();
})


//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



