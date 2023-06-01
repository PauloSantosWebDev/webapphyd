//General functions - Start

//Selector is used to indicate which conversion has to be performed. 1 = In to MM, 2 = MM to In.
function elementsConversion (elementYouAre, otherElement, selector) { 
    if (elementYouAre.value < 0 || elementYouAre.value === '') {
        emptyFields(elementYouAre, otherElement);
    }
    else {
        otherElement.value = conversion(elementYouAre.value, selector);
    }
}

//Used to convert a variety of numbers from one measurement unit to another
function conversion (origim, selector) {
    let resultDestiny = 0;
    switch (Number(selector)) {
        case 1:
            resultDestiny = origim * 254 / 10; //Conversion from inches to millimeters.
            break;
        case 2:
            resultDestiny = origim / 254 * 10; //Conversion from millimeters to inches.
            break;
        case 3:
            resultDestiny = origim / 1450377377 * 10000000; //Conversion from psi to MPa
            break;
        case 4:
            resultDestiny = origim / 1450377377 * 100000000; //Conversion from psi to Bar
            break;
        case 5:
            resultDestiny = origim * 1450377377 / 10000000; //Conversion from MPa to psi
            break;
        case 6:
            resultDestiny = origim * 10; //Conversion from MPa to bar
            break;
        case 7:
            resultDestiny = origim * 1450377377 / 100000000; //Conversion from bar to psi
            break;
        case 8:
            resultDestiny = origim / 10; //Conversion from bar to MPa
            break;
        case 9:
            resultDestiny = origim * 44482216153 / Math.pow(10,10); //Conversion from lbf to Newton
            break;
        case 10:
            resultDestiny = origim * 4535924 / Math.pow(10,10); //Conversion from lbf to ton-force
            break;
        case 11:
            resultDestiny = origim / 44482216153 * Math.pow(10,10); //Conversion from Newton to lbf
            break;
        case 12:
            resultDestiny = origim * 1019716 / Math.pow(10,10); //Conversion from Newton to ton-force
            break;
        case 13:
            resultDestiny = origim / 4535924 * Math.pow(10,10); //Conversion from ton-force to lbf
            break;
        case 14:
            resultDestiny = origim / 1019716 * Math.pow(10,10); //Conversion from ton-force to Newton
            break;
    }
    return resultDestiny.toFixed(2);
}

//Used to bring the fields back to showing placeholders' values
function emptyFields (first, second) {
    const fieldsToEmpty = [first, second];
    fieldsToEmpty.forEach((field) => field.value = '');
}

//Used to unable some input elements
function unabledWhenRadioOff (inElement, mmElement) {
    inElement.value = mmElement.value = '';
    inElement.classList.add("offStop");
    mmElement.classList.add("offStop");
}

//Used to enable some input elements
function enabledWhenRadioOn (inElement, mmElement) {
    inElement.classList.remove("offStop");
    mmElement.classList.remove("offStop");
}

//Used to find the difference between two numbers
function twoNumberSubtraction (minuend, subtrahend) {
    let difference = minuend.value - subtrahend.value;
    return Number(difference).toFixed(2);
}

//Used to calculate the net stroke. Difference btw gross stroke and stop tube length.
function netStrokeCalc () {
    let gsElementIn = document.getElementById('js-gs-in');
    let stElementIn = document.getElementById('js-st-in');
    let gsElementMM = document.getElementById('js-gs-mm');
    let stElementMM = document.getElementById('js-st-mm');
    if (gsElementIn.value == '' && stElementIn.value == '') {
        emptyFields(document.getElementById('js-ns-in'), document.getElementById('js-ns-mm'));
    }
    else
    {
        let result = document.getElementById('js-ns-in');
        result.value = twoNumberSubtraction(gsElementIn, stElementIn);
        result = document.getElementById('js-ns-mm');
        result.value = twoNumberSubtraction(gsElementMM, stElementMM);
    }
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//General - Changing values from inches to millimeters
document.querySelectorAll(".js-in-to-mm").forEach((e, index) => {
    let other = document.querySelectorAll(".js-mm-to-in")[index];
    e.addEventListener('keyup', () => {
        elementsConversion(e, other, 1);
    });
    e.addEventListener('change', () => {
        elementsConversion(e, other, 1);
    });
});

//General - Changing values from millimeters to inches
document.querySelectorAll(".js-mm-to-in").forEach((e, index) => {
    let other = document.querySelectorAll(".js-in-to-mm")[index];
    e.addEventListener('keyup', () => {
        elementsConversion(e, other, 2);
    });
    e.addEventListener('change', () => {
        elementsConversion(e, other, 2);
    });
});

//Unable fields with class js-off-through-radio-.. when js-radio-off class radio buttons are selected.
document.querySelectorAll(".js-radio-off").forEach((e, index) => {
    e.addEventListener('change', () => {
        let inElement = document.querySelectorAll(".js-off-through-radio-in")[index];
        let mmElement = document.querySelectorAll(".js-off-through-radio-mm")[index];
        unabledWhenRadioOff(inElement, mmElement);
    });
});

//Enable fields with class js-off-through-radio-.. when js-radio-off class radio buttons are selected.
document.querySelectorAll(".js-radio-on").forEach((e, index) => {
    e.addEventListener('change', () => {
        let inElement = document.querySelectorAll(".js-off-through-radio-in")[index];
        let mmElement = document.querySelectorAll(".js-off-through-radio-mm")[index];
        enabledWhenRadioOn(inElement, mmElement);
    });
});

//General - It changes values from psi to mpa and bar
document.querySelectorAll(".js-psi").forEach((e, index) => {
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    let barElement = document.querySelectorAll(".js-bar")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, mpaElement, 3);
        elementsConversion(e, barElement, 4);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, mpaElement, 3);
        elementsConversion(e, barElement, 4);
    });
});

//General - It changes values from mpa to psi and bar
document.querySelectorAll(".js-mpa").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let barElement = document.querySelectorAll(".js-bar")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, psiElement, 5);
        elementsConversion(e, barElement, 6);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, psiElement, 5);
        elementsConversion(e, barElement, 6);
    });
});

//General - It changes values from bar to psi and mpa
document.querySelectorAll(".js-bar").forEach((e, index) => {
    let psiElement = document.querySelectorAll(".js-psi")[index];
    let mpaElement = document.querySelectorAll(".js-mpa")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, psiElement, 7);
        elementsConversion(e, mpaElement, 8);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, psiElement, 7);
        elementsConversion(e, mpaElement, 8);
    });
});

//General - It changes values from lbf to Newtons and ton-force
document.querySelectorAll(".js-lbf").forEach((e, index) => {
    let newtonElement = document.querySelectorAll(".js-newton")[index];
    let tonElement = document.querySelectorAll(".js-ton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, newtonElement, 9);
        elementsConversion(e, tonElement, 10);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, newtonElement, 9);
        elementsConversion(e, tonElement, 10);
    });
});

//General - It changes values from Newtons to lbf and ton-force
document.querySelectorAll(".js-newton").forEach((e, index) => {
    let lbfElement = document.querySelectorAll(".js-lbf")[index];
    let tonElement = document.querySelectorAll(".js-ton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, lbfElement, 11);
        elementsConversion(e, tonElement, 12);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, lbfElement, 11);
        elementsConversion(e, tonElement, 12);
    });
});

//General - It changes values from ton-force to lbf and Newtons
document.querySelectorAll(".js-ton").forEach((e, index) => {
    let lbfElement = document.querySelectorAll(".js-lbf")[index];
    let newtonElement = document.querySelectorAll(".js-newton")[index];
    e.addEventListener('change', () => {
        elementsConversion(e, lbfElement, 13);
        elementsConversion(e, newtonElement, 14);
    });
    e.addEventListener('keyup', () => {
        elementsConversion(e, lbfElement, 13);
        elementsConversion(e, newtonElement, 14);
    });
});

//Used to calculate the net stroke. Triggered when changing Gross Stroke
document.getElementById('js-gs-in').addEventListener('focusout', () => netStrokeCalc());

//Used to calculate the net stroke. Triggered when changing Gross Stroke
document.getElementById('js-gs-mm').addEventListener('focusout', () => netStrokeCalc());

//Used to calculate the net stroke. Triggered when changing Stop tube
document.getElementById('js-st-in').addEventListener('focusout', () => netStrokeCalc());

//Used to calculate the net stroke. Triggered when changing Stop tube
document.getElementById('js-st-mm').addEventListener('focusout', () => netStrokeCalc());


//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
//HTML Generating Functions


//Generating rod end mountings
let hshMountings = ['Female Clevis', 'Male Clevis', 'Spherical Bearing', 'Front Flange', 'Rear Flange', 'Tapped Mount', 'Lug Mount', 'Front Trunnion', 'Rear Trunnion', 'Double Ended Cylinder'];
let hbMountings = ['1 - MX3 - Extended Tie Rod Head End', '1A - MX2 - Extended Tie Rod Cap End', '1B - MX1 - Extended Tie Rod Both Ends', '2 - MF1 - Head Rectangular Flange', '3 - MF2 - Cap Rectangular Flange', '4 - MF5 - Head Square Flange',
                    '5 - MF6 - Cap Square Flange', '6 - MS2 - Side Lugs', '7 - MS3 - Centre Line Lugs', '8 - MS4 - Side Tapped', '9 - End Angles', '10 - MS7 - End Lugs', '11 - MT1 - Head Trunnion', '12 - MT2 - Cap Trunnion', '13 - MT4 - Intermediate Trunnion',
                    '14 - MP1 - Cap Fixed Eye', '14B - MU3 - Cap Spherical Bearing'];
let hhmiMountings = ['Cap Fixed Eye', 'Cap Spherical Bearing', 'Head Circular Flange', 'Cap Circular Flange', 'Intermediate Trunnion', 'Non-standard']; //Same mountings for hsmi

//Load hsh cylinder mountings when hsh radio button is clicked
document.getElementById('js-hsh').addEventListener('click', () => {
    let controler = document.getElementById('js-cyl-mount');
    let accumulator = '';
    for (i=0; i<hshMountings.length; i++) {
        accumulator += `<option>${hshMountings[i]}</option>`
    }
    controler.innerHTML = accumulator;
});

//Load hb cylinder mountings when hb radio button is clicked
document.getElementById('js-hb').addEventListener('click', () => {
    let controler = document.getElementById('js-cyl-mount');
    let accumulator = '';
    for (i=0; i<hbMountings.length; i++) {
        accumulator += `<option>${hbMountings[i]}</option>`
    }
    controler.innerHTML = accumulator;
});

//Load hhmi cylinder mountings when hhmi radio button is clicked
document.getElementById('js-hhmi').addEventListener('click', () => {
    let controler = document.getElementById('js-cyl-mount');
    let accumulator = '';
    for (i=0; i<hhmiMountings.length; i++) {
        accumulator += `<option>${hhmiMountings[i]}</option>`
    }
    controler.innerHTML = accumulator;
});

//Load hsmi cylinder mountings when hsmi radio button is clicked
document.getElementById('js-hsmi').addEventListener('click', () => {
    let controler = document.getElementById('js-cyl-mount');
    let accumulator = '';
    for (i=0; i<hhmiMountings.length; i++) {
        accumulator += `<option>${hhmiMountings[i]}</option>`
    }
    controler.innerHTML = accumulator;
});

//Load hsh cylinder mountings when the page is loaded
window.addEventListener('load', () => {
    let controler = document.getElementById('js-cyl-mount');
    let accumulator = '';
    for (i=0; i<hshMountings.length; i++) {
        accumulator += `<option>${hshMountings[i]}</option>`
    }
    controler.innerHTML = accumulator;
});


//Functions to autogenerate summary

document.body.addEventListener('click', (event) => {
    // This if is used to gurantee that the summary is created only when the summary button is clicked.
    // The if is necessary as the dynamically created button would not have any listener attached to it.
    if (event.target.id == 'js-btn-summary') {
        
        //Variable/arrays creationg section
        let controller = document.querySelector('.js-summary'); //Used to control the div tag's content.
        let cylType = ''; //Used to identify which cylinder type was selected
        let testPressure = []; //Used to show the test pressure as 1.5x the maximum working pressure
        let forcesPushPull = []; //The first elements are for push and last ones for pull. 0, 1, and 2 = push. 3, 4, and 5 = pull.
        const boreArea = Number(Math.PI * Math.pow(document.getElementById("js-bore-in").value, 2) / 4); //It is the area of the barrel's bore. This area is reused many times.
        const rodArea = Number(Math.PI / 4 * Math.pow(document.getElementById("js-rod-in").value, 2)); //It is the area of the rod. Used to calcualte pull force.
        let matrixSpecs = []; //Used to autogenerate the cylinder specs for the summary table. It is an array of arrays.
        let arrayPressuresRows = ['PUSH', 'PULL']; //Used to generate the row identifiers for cylinder pressures
        let accHTMLPressures = ''; //Used to accumulate the generated HTML for pressures
        let accHTMLForcesReq = ''; //Used to accumulate the generated HTML for required forces
        let arrayForcesReqRow = ['REQUIRED - PUSH', 'REQUIRED - PULL']; //Used to generate the row identifiers for forces required
        let arraySpecsRows = ['BORE', 'BARREL OD', 'ROD', 'ROD ID', 'CLOSED CENTERS', 'GROSS STROKE', 'STOP TUBE', 'NET STROKE']; //Used to autogenerate the rows for cylinder specifications in the summary table.
        let accHTMLSpecs = ''; //Used to accumulate the generated HTML elements for cylinder specs.

        //Finding values functions/methods/ways section
        
        //Finding cylinder type
        document.querySelectorAll(".js-cyl-type").forEach((e, index) => {
            if (e.checked) {
                cylType = e.value;
            }
        });

        //Finding test pressures
        testPressure[0] = Math.round((Math.max(Number(document.getElementById('js-push-psi').value), Number(document.getElementById('js-pull-psi').value)) * 1.5));
        testPressure[1] = (Math.max(Number(document.getElementById('js-push-mpa').value), Number(document.getElementById('js-pull-mpa').value)) * 1.5).toFixed(2);
        testPressure[2] = (Math.max(Number(document.getElementById('js-push-bar').value), Number(document.getElementById('js-pull-bar').value)) * 1.5).toFixed(2);
        
        //Finding theoretical forces
        forcesPushPull[0] = Number(document.getElementById("js-push-psi").value * boreArea).toFixed(2); //Used to find push force in lbf
        forcesPushPull[1] = conversion(forcesPushPull[0], 9); //push force in Newtons
        forcesPushPull[2] = conversion(forcesPushPull[0], 10); //push force in ton-force
        
        forcesPushPull[3] = Number(document.getElementById("js-pull-psi").value * (boreArea - rodArea)).toFixed(2); //Used to find pull force in lbf
        forcesPushPull[4] = conversion(forcesPushPull[3], 9); //push force in Newtons
        forcesPushPull[5] = conversion(forcesPushPull[3], 10); //push force in ton-force


        //Autogenerate cylinder pressures
        for (i = 0; i < document.querySelectorAll(".js-psi").length; i++) {
            let arrayPressures = [];
            arrayPressures [0] = document.querySelectorAll(".js-psi")[i].value;
            arrayPressures [1] = document.querySelectorAll(".js-mpa")[i].value;
            arrayPressures [2] = document.querySelectorAll(".js-bar")[i].value;
            accHTMLPressures += `<tr>
                                    <th colspan="3">${arrayPressuresRows[i]}</th>
                                    <td colspan="3">${arrayPressures[0]}</td>
                                    <td colspan="3">${arrayPressures[1]}</td>
                                    <td colspan="3">${arrayPressures[2]}</td>
                                </tr>`
        }

        //Autogenerate forces required
        for (i = 0; i < document.querySelectorAll(".js-lbf").length; i++) {
            let arrayForces = [];
            arrayForces[0] = Number(document.querySelectorAll(".js-lbf")[i].value).toFixed(2);
            arrayForces[1] = Number(document.querySelectorAll(".js-newton")[i].value).toFixed(2);
            arrayForces[2] = Number(document.querySelectorAll(".js-ton")[i].value).toFixed(2);
            accHTMLForcesReq += `<tr>
                                    <th colspan="3">${arrayForcesReqRow[i]}</th>
                                    <td colspan="3">${arrayForces[0]}</td>
                                    <td colspan="3">${arrayForces[1]}</td>
                                    <td colspan="3">${arrayForces[2]}</td>
                                </tr>`
        }

        //Autogenerate cylinder specifications
        for (i = 0; i < document.querySelectorAll(".js-in-to-mm").length; i++) {
            let arraySpecs = [];
            arraySpecs[0] = Number(document.querySelectorAll(".js-in-to-mm")[i].value).toFixed(2);
            arraySpecs[1] = Number(document.querySelectorAll(".js-mm-to-in")[i].value).toFixed(2);
            matrixSpecs[i] = arraySpecs;
            accHTMLSpecs += `<tr>
                                <th colspan="6">${arraySpecsRows[i]}</th>
                                <td colspan="3">${matrixSpecs[i][0]}</th>
                                <td colspan="3">${matrixSpecs[i][1]}</th>
                            </tr>`;
        }

        //Give the summary table its content
        controller.innerHTML = `
            <button id="js-btn-summary">Summary</button>
            <table>
                <tr>
                    <th colspan="12">SUMMARY TABLE</th>
                </tr>
                <tr>
                    <th colspan="12">CYLINDER TYPE</th>
                </tr>
                <tr>
                    <td colspan="12">${cylType}</td>
                </tr>
                <tr>
                    <th colspan="12">PRESSURES</th>
                </tr>
                <tr>
                    <th colspan="3"></th>
                    <th colspan="3">PSI</th>
                    <th colspan="3">MPA</th>
                    <th colspan="3">BAR</th>
                </tr>
                ${accHTMLPressures}
                <tr>
                    <th colspan="3">TEST</th>
                    <td colspan="3">${testPressure[0]}</td>
                    <td colspan="3">${testPressure[1]}</td>
                    <td colspan="3">${testPressure[2]}</td>
                </tr>
                <tr>
                    <th colspan="12">FORCES</th>
                </tr>
                <tr>
                    <th colspan="3"></th>
                    <th colspan="3">LBF</th>
                    <th colspan="3">NEWTON</th>
                    <th colspan="3">TON-FORCE</th>
                </tr>
                <tr>
                    <th colspan="3">THEORETICAL - PUSH</th>
                    <td colspan="3">${forcesPushPull[0]}</td>
                    <td colspan="3">${forcesPushPull[1]}</td>
                    <td colspan="3">${forcesPushPull[2]}</td>
                </tr>
                <tr>
                    <th colspan="3">THEORETICAL - PULL</th>
                    <td colspan="3">${forcesPushPull[3]}</td>
                    <td colspan="3">${forcesPushPull[4]}</td>
                    <td colspan="3">${forcesPushPull[5]}</td>
                </tr>
                ${accHTMLForcesReq}
                <tr>
                    <th colspan="12">CYLINDER SPECIFICATIONS</th>
                </tr>
                <tr>
                    <th colspan="4"></th>
                    <th colspan="4">Inches</th>
                    <th colspan="4">Millimeters</th>
                </tr>
                ${accHTMLSpecs}
        `;
    }
});









function nextToCalcBuckling () {

    let customer = {
        customerName: document.querySelector(".customerName").value,
        contactName: document.querySelector(".contactName").value,
        phoneNumber: document.querySelector(".phoneNumber").value,
        email: document.querySelector(".email").value

    };

    localStorage.setItem("customer", customer);
    
    location.href="cylinderspecs.html"
    // console.log(customer.customerName);

    // localStorage.clear("customer");

    // let customerName = localStorage.getItem("customerName");            
    // let contactName = localStorage.getItem("contactName");
    // let phoneNumber = localStorage.getItem("phoneNumber");
    
    // localStorage.setItem("customerName", document.querySelector('.customerName').value);
    // let customerName = localStorage.getItem("customerName");
    
    // localStorage.setItem("contactName", document.querySelector('.contactName').value);
    // let contactName = localStorage.getItem("contactName");
    
    // localStorage.setItem("phoneNumber", document.querySelector('.phoneNumber').value);
    // let phoneNumber = localStorage.getItem("phoneNumber");

    // localStorage.setItem("email", document.querySelector('.email').value);
    // let email = localStorage.getItem("email");

    // console.log(customerName);
    // console.log(contactName);
    // console.log(phoneNumber);
    // console.log(email);
    
    
    
    // localStorage.clear("customerName");
    // localStorage.clear("contactName");
    // localStorage.clear("phoneNumber");
    // localStorage.clear("email");



    



}


