//General functions - Start

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Enable fields with class js-off-through-radio-.. when js-radio-off class radio buttons are selected.
document.querySelectorAll(".js-radio-quote-for").forEach((e, index) => {
  e.addEventListener('change', () => {
      console.log(e.value);
      const radioOpt = e.value;
  });
});

//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



