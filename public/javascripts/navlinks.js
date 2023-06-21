//General functions - Start

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//Link to a new quote


//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions - Start

// document.body.addEventListener('click', (event) => {
//   // The if is necessary as the dynamically created element would not have any listener attached to it.
//   if (event.target.id == 'js-input-contact-new-customer') {
//     let controller = document.querySelector('.js-input-contact-new-customer');
//     db.all('SELECT name FROM contacts WHERE customer_id=?, VALUES (', (err, rows) => {
//       if (err) {
//         throw err;
//       }
//       rows.forEach(row => {
//         console.log(row.customer_id, row.name, row.bill_to, row.abn);
//       })
//     })
    
//   }

//HTML Generating Functions - End
//--------------------------------------------------------------------------------------------------------------------------



