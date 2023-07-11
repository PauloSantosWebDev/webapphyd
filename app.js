const express = require('express');
const db = require('./db');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

//Setting up view engine, templating and static files source
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

app.set('view engine', 'njk');


//Setting up static folders
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.static('views'));


//Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Clearing database commands
// db.run('DROP TABLE material_costs');
// db.all('SELECT * FROM labour ORDER BY date DESC', (err, rows) =>{
//   if (err) {
//     throw err;
//   }

//   rows.forEach(row => {
//     console.log(row);
//   })
// })

//----------------------------------------------------------------
//Routes
//Get methods
app.get('/', (req, res) =>{
    res.render('index.njk', {title: 'Home page'});
})

//Quote first page
app.get('/quoteone', (req, res) =>{
  res.render('quoteone.njk');
})

//Quote barrel assembly page
app.get('/quotebrlassy', (req, res) => {
  db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
    if (err) {
      throw err;
    }
    const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      
      db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
        if (err) {
          throw err;
        }
        const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
        
        res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
      })

      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode});
    })
    // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId});
  })
})

//Quote rod assembly page
app.get('/quoterodassy', (req, res) => {
  db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
    if (err) {
      throw err;
    }
    const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      
      db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
        if (err) {
          throw err;
        }
        const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
        
        res.render('quoterodassy.njk', {title: 'Rod assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
      })

      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode});
    })
    // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId});
  })
})

//Quote gland assembly page
app.get('/quotegland', (req, res) => {
  db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
    if (err) {
      throw err;
    }
    const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      
      db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
        if (err) {
          throw err;
        }
        const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
        
        res.render('quotegland.njk', {title: 'Gland assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
      })

      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode});
    })
    // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId});
  })
})

//Quote seals page
app.get('/quoteseals', (req, res) => {
  db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
    if (err) {
      throw err;
    }
    const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
    res.render('quoteseals.njk', {title: 'Seals quote', serverHydroilId});
    // db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
    //   if (err) {
    //     throw err;
    //   }
    //   const serverServiceCode = rows.map(row => ({id: row.service_code}));
      
    //   db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
    //     if (err) {
    //       throw err;
    //     }
    //     const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
        
    //     res.render('quoteseals.njk', {title: 'Seals quote', serverHydroilId, serverServiceCode, labourPrice});  
    //   })

      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode});
    // })
    // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId});
  })
})

//Customer registration form
app.get('/regcustomer', (req, res) =>{
  res.render('regcustomer.njk', {title: 'Customers Registration Form'});
})

//Supplier registration form
app.get('/regsupplier', (req, res) =>{
  res.render('regsupplier.njk', {title: 'Suppliers Registration Form'});
})

//Contacts registration form
app.get('/regcontacts', (req, res) => {

  db.all('SELECT * FROM customers ORDER BY name', (err, rows) => {
    
    if (err) {
      throw err;
    }

    const codeOptionsCompanyName = rows.map(row => ({value: row.customer_id, label: row.name}));

    res.render('regcontacts.njk', {title: 'Contacts Registration Form', codeOptionsCompanyName});

  })

})

//Labour costs registration form
app.get('/reglabour', (req, res) => {
  res.render('reglabour.njk', {title: 'Labour costs registration form'});
})

//Materials registration form
app.get('/regmaterial', (req, res) => {
  
  db.all('SELECT * FROM suppliers ORDER BY name', (err, rows) => {
    
    if (err) {
      throw err;
    }

    const lines = rows.map(row => ({value: row.supplier_id, label: row.name}));

    res.render('regmaterial.njk', {title: 'Material registration form', lines});

  })

})

//Services registration form
app.get('/regservices', (req, res) => {

  db.all('SELECT * FROM suppliers ORDER BY name', (err, rows) => {
    
    if (err) {
      throw err;
    }

    const lines = rows.map(row => ({value: row.supplier_id, label: row.name}));
    res.render('regservices.njk', {title: 'Services registration form', lines});

  })

})

//-----------------------------------------------------
//Post methods

//Inserting data into customers and contacts tables through post method.
app.post('/regcustomer', (req, res) =>{
  const companyName = req.body.inputCompanyName;
  const abn = req.body.inputABN;
  const address = req.body.inputAddress;
  const city = req.body.inputCity;
  const state = req.body.inputState;
  const postcode = req.body.inputPostCode;
  const country = req.body.inputCountry;

  const contactName = req.body.inputName;
  const email = req.body.inputEmail;
  const phone = req.body.inputPhoneNumber;
  const mobile = req.body.inputMobileNumber;

  let cust_id = null;
  
  //Command to insert new customes to the customers table in the hydroil.sqlite database
  db.run('INSERT INTO customers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in customer table.');
    } else {
      res.status(200);
      console.log('Data updated successfully in customers table.');
      // res.redirect('/regcustomer');
    }
  });

  //Used to find out the customer_id created for this customer so that it can be inserted in the contacts table as a foreign key.
  db.get('SELECT customer_id FROM customers WHERE name = ?', [companyName], (err, row) => {
    
    if (err) {
      console.error(err.message);
    }

    cust_id = row.customer_id;

    db.run('INSERT INTO contacts(customer_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [cust_id, contactName, email, phone, mobile], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in contacts table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in contacts table.');
        res.redirect('/regcustomer');
      }
    });
  });
});

//Inserting data into suppliers and suppliers_contacts tables through post method.
app.post('/regsupplier', (req, res) =>{
  const companyName = req.body.inputCompanyName;
  const abn = req.body.inputABN;
  const address = req.body.inputAddress;
  const city = req.body.inputCity;
  const state = req.body.inputState;
  const postcode = req.body.inputPostCode;
  const country = req.body.inputCountry;

  const contactName = req.body.inputName;
  const email = req.body.inputEmail;
  const phone = req.body.inputPhoneNumber;
  const mobile = req.body.inputMobileNumber;

  let cust_id = null;
  
  //Command to insert new suppliers to the suppliers table in the hydroil.sqlite database
  db.run('INSERT INTO suppliers (name, abn, address, city, state, postcode, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [companyName, abn, address, city, state, postcode, country], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in supplier table.');
    } else {
      res.status(200);
      console.log('Data updated successfully in supplier table.');
    }
  });

  //Used to find out the supplier_id created for this supplier so that it can be inserted in the suppliers_contacts table as a foreign key.
  db.get('SELECT supplier_id FROM suppliers WHERE name = ?', [companyName], (err, row) => {
    
    if (err) {
      console.error(err.message);
    }

    supp_id = row.supplier_id;

    db.run('INSERT INTO suppliers_contacts(supplier_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [supp_id, contactName, email, phone, mobile], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in suplliers_contacts table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in suppliers_contacts table.');
        res.redirect('/regsupplier');
      }
    });
  });
});


//Working with contacts page. 
app.post('/regcontacts', (req, res) => {
  
  const data = req.body;
  
  if (data.selection === 'Customer') {

    db.all('SELECT * FROM customers ORDER BY name', (err, rows) => {
    
      if (err) {
        throw err;
      }
  
      const codeOptionsCompanyName = rows.map(row => ({value: row.customer_id, label: row.name}));
      
      res.json({
        status: 'success',
        body: codeOptionsCompanyName
      });

    })

  } 
  
  else if (data.selection === 'Supplier') {
    
    db.all('SELECT * FROM suppliers ORDER BY name', (err, rows) => {
    
      if (err) {
        throw err;
      }
  
      const codeOptionsCompanyName = rows.map(row => ({value: row.supplier_id, label: row.name}));

      res.json({
        status: 'success',
        body: codeOptionsCompanyName
      });

    })

  } 
  
  else {

    const customerSupplierSelection = req.body.inputCustomerSupplier;
    const companyId = req.body.inputCompanyName;
    const contactName = req.body.inputName;
    const email = req.body.inputEmail;
    const phone = req.body.inputPhoneNumber;
    const mobile = req.body.inputMobileNumber;

    if (companyId === 'Choose...') {
      res.render('error.njk', {title: 'Invalid company name', errorMessage: 'Contact not registered! Please select a valid company name.', refLink: '/regcontacts'});
    }

    else if (customerSupplierSelection === 'Customer') {
  
      db.run('INSERT INTO contacts(customer_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [companyId, contactName, email, phone, mobile], (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Error updating data in contacts table.');
        } else {
          res.status(200);
          console.log('Data updated successfully in contacts table.');
          res.redirect('/regcontacts');
        }
      });

    } 
    
    else if (customerSupplierSelection === 'Supplier') {
    
      db.run('INSERT INTO suppliers_contacts(supplier_id, name, email, phone_number, mobile_number) VALUES (?, ?, ?, ?, ?);', [companyId, contactName, email, phone, mobile], (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Error updating data in suplliers_contacts table.');
        } else {
          res.status(200);
          console.log('Data updated successfully in suppliers_contacts table.');
          res.redirect('/regcontacts');
        }
      });

    } 
    
    else {
      res.send("Not working yet!");
    }
  }
})

//Inserting data into Labour costs table
app.post('/reglabour', (req, res) => {
  const date = req.body.inputDate;
  const mc = req.body.inputMc;
  const ncctr = req.body.inputNcCtr;
  const w = req.body.inputW;
  const h = req.body.inputH;
  const assy = req.body.inputAssy;
  const description = req.body.inputDescription;
  
  //Command to insert new costs to the labour costs table in the hydroil.sqlite database
  db.run('INSERT INTO labour (date, mc, ncctr, welding, honing, assembling, description) VALUES (?, ?, ?, ?, ?, ?, ?)', [date, mc, ncctr, w, h, assy, description], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating data in labour costs table.');
    } else {
      res.status(200);
      console.log('Data updated successfully in labour costs table.');
      res.redirect('/reglabour');
    }
  });

})

//Inserting data into material, mechanical properties, costs and resources table
app.post('/regmaterial', (req, res) => {
  
  const date = req.body.inputDate;
  const hydroilId = req.body.inputHydroilId;
  const item = req.body.inputItem;
  const description = req.body.inputDescription;
  const altDescription = req.body.inputAltDescription;
  const supplier = req.body.inputSupplier;
  const cost = req.body.inputCost;
  const unit = req.body.inputMeasurement;
  const details = req.body.inputDetails;
  const yieldMpa = req.body.inputMinYieldMPa;
  const yieldPsi = req.body.inputMinYieldPSI;
  const utsMpa = req.body.inputMinUtsMPa;
  const utsPsi = req.body.inputMinUTSPSI;
  const young = req.body.inputYoungsModulus;
  const file = req.body.inputSourceFile;
  
  //Checking if valid supplier name was provided.
  if (supplier === 'Choose...') {
    res.render('error.njk', {title: 'Invalid supplier name', errorMessage: 'Material not registered! Please select a valid supplier.', refLink: '/regmaterial'});
  }

  else {
    
    //Used to protect against the UNIQUE constraint for the hydroilId column.
    //Used to find out the supplier_id created for this supplier so that it can be inserted in the material_costs table as a foreign key.
    db.get('SELECT material_id FROM materials WHERE hydroil_id = ?', [hydroilId], (err, row) => {
      
      if (err) {
        console.error(err.message);
      }

      if (!row) {
        
        // Command to insert new materials to the materials table in the hydroil.sqlite database
        db.run('INSERT INTO materials (hydroil_id, item, description, alt_description, details) VALUES (?, ?, ?, ?, ?)', [hydroilId, item, description, altDescription, details], (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Error updating data in materials table.');
          } else {
            res.status(200);
            console.log('Data updated successfully in materials table.');
            // res.redirect('/regcustomer');
          }
        });

      }
      
    });
        
    // Command to insert new materials to the materials table in the hydroil.sqlite database
    db.run('INSERT INTO material_costs (hydroil_id, date, supplier_id, cost, unit) VALUES (?, ?, ?, ?, ?)', [hydroilId, date, supplier, cost, unit], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in material costs table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in material costs table.');
        // res.redirect('/regcustomer');
      }
    });

    // Command to insert new materials to the materials table in the hydroil.sqlite database
    db.run('INSERT INTO mechanical_properties (hydroil_id, yield_mpa, yield_psi, uts_mpa, uts_psi, young) VALUES (?, ?, ?, ?, ?, ?)', [hydroilId, yieldMpa, yieldPsi, utsMpa, utsPsi, young], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in mechanical properties table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in mechanical properties table.');
        // res.redirect('/regcustomer');
      }
    });

    // Command to insert new materials to the materials table in the hydroil.sqlite database
    db.run('INSERT INTO resources (hydroil_id, file) VALUES (?, ?)', [hydroilId, file], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in resources table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in resources table.');
        // res.redirect('/regcustomer');
      }
    });
    
    res.redirect('/regmaterial');
  }
})

//Insert data into ext_services and ext_services_costs tables
app.post('/regservices', (req, res) => {
  const date = req.body.inputDate;
  const serviceCode = req.body.inputServiceCode;
  const service = req.body.inputService;
  const description = req.body.inputDescription;
  const altDescription = req.body.inputAltDescription;
  const supplier = req.body.inputSupplier;
  const cost = req.body.inputCost;
  const unit = req.body.inputMeasurement;
  const details = req.body.inputDetails;

  console.log(supplier);
  console.log(req.body);
  
  //Checking if valid supplier name was provided.
  if (supplier === 'Choose...') {
    res.render('error.njk', {title: 'Invalid supplier name', errorMessage: 'Service not registered! Please select a valid supplier.', refLink: '/regservices'});
  }

  else {
  
    //Used to protect against the UNIQUE constraint for the supplier_code column.
    //Used to find out the supplier_id created for this supplier so that it can be inserted in the ext_services table as a foreign key.
    db.get('SELECT service_id FROM ext_services WHERE service_code = ?', [serviceCode], (err, row) => {
      
      if (err) {
        console.error(err.message);
      }

      console.log('Consoling the row: ' + row);

      if (!row) {
        
        // Command to insert new materials to the materials table in the hydroil.sqlite database
        db.run('INSERT INTO ext_services (service_code, service, description, alt_description, details) VALUES (?, ?, ?, ?, ?)', [serviceCode, service, description, altDescription, details], (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Error updating data in ext_services table.');
          } else {
            res.status(200);
            console.log('Data updated successfully in ext_services table.');
            // res.redirect('/regcustomer');
          }
        });

      }
      
    });
        
    // Command to insert new materials to the materials table in the hydroil.sqlite database
    db.run('INSERT INTO ext_services_costs (service_code, date, supplier_id, cost, unit) VALUES (?, ?, ?, ?, ?)', [serviceCode, date, supplier, cost, unit], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in material costs table.');
      } else {
        res.status(200);
        console.log('Data updated successfully in material costs table.');
        // res.redirect('/regcustomer');
      }
    });
    
    res.redirect('/regservices');
  }
})

//Main goal, submit the data to the database
//Second goal, update the page according to the radio button checked
app.post('/quoteone', (req, res) => {
  // const data = req.body;
  // console.log(data.selection);
  // console.log(req.body);

  // res.json({
  //   status: 'success',
  //   body: data.selection
  // })
})

//Used to load the Hydroil ID field when lines are added on brl assembly page
app.post('/quotebrlassy', (req, res) => {
  const checker = req.body.target;
  const parsedValue = req.body.value;
  const supplierName = req.body.name;
  if (checker === 'hydId') {
    db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
      res.json({
        status: 'success',
        body: serverHydroilId
      });
    })
  }
  else if (checker === 'serviceCode') {
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      res.json({
        status: 'success',
        body: serverServiceCode
      });
    })
  }
  else if (checker === 'matlSupplier') {
    db.all('SELECT supplier_id FROM material_costs WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'matlItem') {
    db.all('SELECT item FROM materials WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({item: row.item}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'matlCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM material_costs WHERE hydroil_id = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'servService') {
    db.all('SELECT service FROM ext_services WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({service: row.service}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'servSupplier') {
    db.all('SELECT supplier_id FROM ext_services_costs WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'servCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM ext_services_costs WHERE service_code = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'labourCost') {  
    db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
      if (err) {
        throw err;
      }
      const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
      
      res.json({
        status: 'success',
        body: labourPrice
      })
      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
    })
  }
})

//Used to load the Hydroil ID field when lines are added on rod assembly page
app.post('/quoterodassy', (req, res) => {
  const checker = req.body.target;
  const parsedValue = req.body.value;
  const supplierName = req.body.name;
  if (checker === 'hydId') {
    db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
      res.json({
        status: 'success',
        body: serverHydroilId
      });
    })
  }
  else if (checker === 'serviceCode') {
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      res.json({
        status: 'success',
        body: serverServiceCode
      });
    })
  }
  else if (checker === 'matlSupplier') {
    db.all('SELECT supplier_id FROM material_costs WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'matlItem') {
    db.all('SELECT item FROM materials WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({item: row.item}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'matlCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM material_costs WHERE hydroil_id = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'servService') {
    db.all('SELECT service FROM ext_services WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({service: row.service}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'servSupplier') {
    db.all('SELECT supplier_id FROM ext_services_costs WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'servCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM ext_services_costs WHERE service_code = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'labourCost') {  
    db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
      if (err) {
        throw err;
      }
      const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
      
      res.json({
        status: 'success',
        body: labourPrice
      })
      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
    })
  }
})

//Used to load the Hydroil ID field when lines are added on gland assembly page
app.post('/quotegland', (req, res) => {
  const checker = req.body.target;
  const parsedValue = req.body.value;
  const supplierName = req.body.name;
  if (checker === 'hydId') {
    db.all('SELECT hydroil_id FROM materials ORDER BY hydroil_id', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverHydroilId = rows.map(row => ({id: row.hydroil_id}));
      res.json({
        status: 'success',
        body: serverHydroilId
      });
    })
  }
  else if (checker === 'serviceCode') {
    db.all('SELECT service_code FROM ext_services ORDER BY service_code', (err, rows) => {
      if (err) {
        throw err;
      }
      const serverServiceCode = rows.map(row => ({id: row.service_code}));
      res.json({
        status: 'success',
        body: serverServiceCode
      });
    })
  }
  else if (checker === 'matlSupplier') {
    db.all('SELECT supplier_id FROM material_costs WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'matlItem') {
    db.all('SELECT item FROM materials WHERE hydroil_id = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({item: row.item}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'matlCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM material_costs WHERE hydroil_id = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'servService') {
    db.all('SELECT service FROM ext_services WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const data = rows.map(row => ({service: row.service}));
      res.json({
        status: 'success',
        body: data
      })
    })
  }
  else if (checker === 'servSupplier') {
    db.all('SELECT supplier_id FROM ext_services_costs WHERE service_code = ?', [parsedValue], (err, rows) => {
      if (err) {
        throw err;
      }
      const supplierIds = rows.map(row => ({id: row.supplier_id}));
      let promises = supplierIds.map((e, i) => {
        return new Promise((resolve, reject) => {
          db.all('SELECT name FROM suppliers WHERE supplier_id = ?', [e.id], (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows.map(row => ({name: row.name})));
          })
        })
      })
      Promise.all(promises)
        .then(results => {
          let accumulator = [];
          results.forEach(result => {
            accumulator = accumulator.concat(result);
          })
          res.json({
            status: 'success',
            body: accumulator
          })
        })
        .catch(err => {
          console.error(err);
        })
    })
  }
  else if (checker === 'servCost') {
    if(!supplierName) {
      res.end();
    }
    else {
      db.all('SELECT supplier_id FROM suppliers WHERE name = ?', [supplierName], (err, rows) => {
        if (err) {
          throw err;
        }
        const supId = rows.map(row => ({supId: row.supplier_id}));
        db.all('SELECT cost, unit FROM ext_services_costs WHERE service_code = ? AND supplier_id = ?', [parsedValue, supId[0].supId], (err, rows) => {
          if (err) {
            throw err;
          }
          const data = rows.map(row => ({cost: row.cost, unit: row.unit}));
          res.json({
            status: 'success',
            body: data
          })
        })
      })
    }
  }
  else if (checker === 'labourCost') {  
    db.all('SELECT mc, ncctr, welding, honing, assembling FROM labour ORDER BY date DESC LIMIT 1', (err, rows) => {
      if (err) {
        throw err;
      }
      const labourPrice = rows.map(row => ({mc: row.mc, ncctr: row.ncctr, welding: row.welding, honing: row.honing, assembling: row.assembling}));
      
      res.json({
        status: 'success',
        body: labourPrice
      })
      // res.render('quotebrlassy.njk', {title: 'Barrel assembly quote', serverHydroilId, serverServiceCode, labourPrice});  
    })
  }
})

//-----------------------------------------------------------------------
//Server listening

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});