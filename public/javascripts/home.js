//General functions - Start

window.addEventListener('load', () => {
    console.log("The loading method is working.");
    const working = sessionStorage.getItem('storeDataGlandAssy');
    console.log(working);
})

document.getElementById('js-previous-test').addEventListener('click', () => {
    sessionStorage.setItem('fifthPrevious', true);
    location.assign('http://localhost:3000/quoteseals');
})

//General functions - End


//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



