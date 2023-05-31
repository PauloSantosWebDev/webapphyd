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









function generateSummary () {
    let pushForcelbf = 0,
        pushForceNewton = 0,
        pushForceTonForce = 0,
        pullForcelbf = 0,
        pullForceNewton = 0,
        pullForceTonForce = 0,
        testPressurePSI = 0
        testPressureMPa = 0
        testPressureBar = 0;

    let boreIn = document.querySelector(".js-bore-in"),
        boreMM = document.querySelector(".js-bore-mm"),
        rodIn = document.querySelector(".js-rod-in"),
        rodMM = document.querySelector(".js-rod-mm"),
        ccIn = document.querySelector(".js-closed-centers-in"),
        ccMM = document.querySelector(".js-closed-centers-mm"),
        netIn = document.querySelector(".js-net-stroke-in"),
        netMM = document.querySelector(".js-net-stroke-mm"),
        stopIn = document.querySelector(".js-stop-tube-in"),
        stopMM = document.querySelector(".js-stop-tube-mm"),
        grossIn = document.querySelector(".js-gross-stroke-in"),
        grossMM = document.querySelector(".js-gross-stroke-mm"),
        pushPSI = document.querySelector(".js-push-pressure-psi"),
        pushMPa = document.querySelector(".js-push-pressure-mpa"),
        pushBar = document.querySelector(".js-push-pressure-bar"),
        pullPSI = document.querySelector(".js-pull-pressure-psi"),
        pullMPa = document.querySelector(".js-pull-pressure-mpa"),
        pullBar = document.querySelector(".js-pull-pressure-bar");

    let controler = document.querySelector(".js-summary");
    
    // Calculating push force
    pushForcelbf = (Math.pow(Number(boreIn.value),2) * Math.PI/4) * Number(pushPSI.value);
    pushForceNewton = pushForcelbf * 4.4482216153;
    pushForceTonForce = pushForceNewton/9.80665/1000;


    pushForcelbf = pushForcelbf.toFixed(2);
    pushForceNewton = pushForceNewton.toFixed(2);
    pushForceTonForce = pushForceTonForce.toFixed(2);

    //Calcualting pull force
    pullForcelbf = ((Math.pow(Number(boreIn.value),2)-Math.pow(Number(rodIn.value),2)) * Math.PI/4) * Number(pullPSI.value);
    pullForceNewton = pullForcelbf * 4.4482216153;
    pullForceTonForce = pullForceNewton/9.80665/1000;


    pullForcelbf = pullForcelbf.toFixed(2);
    pullForceNewton = pullForceNewton.toFixed(2);
    pullForceTonForce = pullForceTonForce.toFixed(2);
    
    testPressurePSI = 1.5 * Math.max(pullPSI.value, pushPSI.value);
    testPressureMPa = 1.5 * Math.max(pullMPa.value, pushMPa.value);
    testPressureBar = testPressureMPa*10;

    function cylinderTypeToTable () {
        let cylinderType = 'Initial type';
        if(document.getElementById('HSH').checked) {
            cylinderType = document.getElementById('HSH').value;                    
            return cylinderType;
        }
        else if (document.getElementById('HB').checked) {
            cylinderType = document.getElementById('HB').value;                    
            return cylinderType;
        }
        else if (document.getElementById('HHMI').checked) {
            cylinderType = document.getElementById('HHMI').value;
            return cylinderType;
        }
        else {
            cylinderType = document.getElementById('HSMI').value;
            return cylinderType;
        }
    }
                
    
    controler.innerHTML = 
        `
            <button onclick="generateSummary()">Generate Summary</button>
            <table>
                <tr>
                    <th>Cylinder type</th>
                    <td>${cylinderTypeToTable()}</td>
                </tr>
                <tr><th></th></tr>
                <tr>
                    <th></th>
                    <th>lbf</th>
                    <th>Newton</th>
                    <th>Ton-force</th>
                </tr>
                <tr>
                    <th>Theoretical Push</th>
                    <td>${pushForcelbf}</td>
                    <td>${pushForceNewton}</td>
                    <td>${pushForceTonForce}</td>
                </tr>
                <tr>
                    <th>Theoretical Pull</th>
                    <td>${pullForcelbf}</td>
                    <td>${pullForceNewton}</td>
                    <td>${pullForceTonForce}</td>
                </tr>
                <tr><th></th></tr>
                <tr>
                    <th></th>
                    <th>PSI</th>
                    <th>MPa</th>
                    <th>Bar</th>
                </tr>
                <tr>
                    <th>Push pressure</th>
                    <td>${pushPSI.value}</td>
                    <td>${pushMPa.value}</td>
                    <td>${pushBar.value}</td>
                </tr>
                <tr>
                    <th>Pull pressure</th>
                    <td>${pullPSI.value}</td>
                    <td>${pullMPa.value}</td>
                    <td>${pullBar.value}</td>
                </tr>                                                
                <tr>
                    <th>Test pressure</th>
                    <td>${testPressurePSI}</td>
                    <td>${testPressureMPa}</td>
                    <td>${testPressureBar}</td>
                </tr>
                <tr><th></th></tr>
                <tr>
                    <th></th>
                    <th>IN</th>
                    <th>MM</th>
                </tr>
                <tr>
                    <th>Bore</th>
                    <td>${boreIn.value}</td>
                    <td>${boreMM.value}</td>
                </tr>
                <tr>
                    <th>Rod</th>
                    <td>${rodIn.value}</td>
                    <td>${rodMM.value}</td>
                </tr>
                <tr>
                    <th>Closed Centers</th>
                    <td>${ccIn.value}</td>
                    <td>${ccMM.value}</td>
                </tr>
                <tr>
                    <th>Gross Stroke</th>
                    <td>${grossIn.value}</td>
                    <td>${grossMM.value}</td>
                </tr>
                <tr>
                    <th>Stop Tube</th>
                    <td>${stopIn.value}</td>
                    <td>${stopMM.value}</td>
                </tr>
                <tr>
                    <th>Net Stroke</th>
                    <td>${netIn.value}</td>
                    <td>${netMM.value}</td>
                </tr>

            </table>                
        `
}



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


