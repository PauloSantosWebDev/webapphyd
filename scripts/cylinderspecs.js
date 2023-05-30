//General functions - Start

//Selector is used to indicate which conversion has to be performed. 1 = In to MM, 2 = MM to In.
function elementsConversionInAndMM (elementYouAre, otherElement, selector) { 
    if (elementYouAre.value < 0 || elementYouAre.value === '') {
        emptyFields(elementYouAre, otherElement);
    }
    else {
        otherElement.value = conversion(elementYouAre.value, selector);
    }
}

function conversion (origim, selector) {
    let resultDestiny = 0;
    if (Number(selector) === 1) {
        resultDestiny = origim * 254 / 10; //Conversion from inches to millimeters.
        return resultDestiny.toFixed(2);
    } else if (Number(selector) === 2) {
        resultDestiny = origim / 254 * 10; //Conversion from millimeters to inches.
    } 
    else {
        alert("Conversion function with undefined selector.")
    }
    return resultDestiny.toFixed(2);
}

function emptyFields (first, second, third = 0) {
    const fieldsToEmpty = [first, second, third];
    fieldsToEmpty.forEach((field) => {
        if (field.value === 0) {
            return;
        }
        else {
            field.value = '';
        }
    });
}

function unabledWhenRadioOff (inElement, mmElement) {
    inElement.value = mmElement.value = '';
    inElement.classList.add("offStop");
    mmElement.classList.add("offStop");
}

function enabledWhenRadioOn (inElement, mmElement) {
    inElement.classList.remove("offStop");
    mmElement.classList.remove("offStop");
}

//General functions - End

//--------------------------------------------------------------------------------------------------------------------------
//Event listeners setction - Start

//General - Changing values from inches to millimeters
document.querySelectorAll(".js-in-to-mm").forEach((e, index) => {
    let other = document.querySelectorAll(".js-mm-to-in")[index];
    e.addEventListener('keyup', () => {
        elementsConversionInAndMM(e, other, 1);
    });
    e.addEventListener('change', () => {
        elementsConversionInAndMM(e, other, 1);
    });
});

//General - Changing values from millimeters to inches
document.querySelectorAll(".js-mm-to-in").forEach((e, index) => {
    let other = document.querySelectorAll(".js-in-to-mm")[index];
    e.addEventListener('keyup', () => {
        elementsConversionInAndMM(e, other, 2);
    });
    e.addEventListener('change', () => {
        elementsConversionInAndMM(e, other, 2);
    });
});

document.querySelectorAll(".js-radio-off").forEach((e, index) => {
    e.addEventListener('change', () => {
        let inElement = document.querySelectorAll(".js-off-through-radio-in")[index];
        let mmElement = document.querySelectorAll(".js-off-through-radio-mm")[index];
        unabledWhenRadioOff(inElement, mmElement);
    });
});

document.querySelectorAll(".js-radio-on").forEach((e, index) => {
    e.addEventListener('change', () => {
        let inElement = document.querySelectorAll(".js-off-through-radio-in")[index];
        let mmElement = document.querySelectorAll(".js-off-through-radio-mm")[index];
        enabledWhenRadioOn(inElement, mmElement);
    });
});



//Event listeners setction - End
//--------------------------------------------------------------------------------------------------------------------------









// function checkTubeODIn () {
//     let conversionNumber = Number(document.querySelector(".js-tube-od-in").value)*25.4;
//     if (conversionNumber<=Number(document.querySelector(".js-bore-mm").value)) {
//         alert("Tube OD can not be less than or equal to bore.");
//         offTubeODLength();
//         document.getElementById('tubeODNo').checked = true;
//         document.querySelector('.js-bore-in').focus();
//     }
// }

// function checkTubeODMM () {
//     let conversionNumber = Number(document.querySelector(".js-tube-od-mm").value)/25.4;
//     if (conversionNumber<=Number(document.querySelector(".js-bore-in").value)) {
//         alert("Tube OD can not be less than or equal to bore.");
//         offTubeODLength();
//         document.getElementById('tubeODNo').checked = true;
//         document.querySelector('.js-bore-in').focus();
//     }
// }





// function checkRodHollowIn () {
//     let conversionNumber = Number(document.querySelector(".js-rod-hollow-in").value)*25.4;
//     if (conversionNumber>=Number(document.querySelector(".js-rod-mm").value)) {
//         alert("Inside diameter can not be greather than or equal to outside diameter");
//         offRodHollowLength();
//         document.getElementById('rodHollowNo').checked = true;
//         document.querySelector('.js-rod-in').focus();
//     }
// }

// function checkRodHollowMM () {
//     let conversionNumber = Number(document.querySelector(".js-rod-hollow-mm").value)/25.4;
//     if (conversionNumber>=Number(document.querySelector(".js-rod-in").value)) {
//         alert("Inside diameter can not be greather than or equal to outside diameter");
//         offRodHollowLength();
//         document.getElementById('rodHollowNo').checked = true;
//         document.querySelector('.js-rod-in').focus();
//     }        
// }


//STOP TUBE FUNCTIONS


// GROSS STROKE FUNCTIONS

// function grossStrokeAddition () {
//     let net = document.querySelector(".js-net-stroke-in");
//     let stop = document.querySelector(".js-stop-tube-in");
//     let gross = document.querySelector(".js-gross-stroke-in");
//     let sum = (Number(net.value) + Number(stop.value)).toFixed(2);

//     if (sum == '' || sum == 0) {
//         gross.value = '';
//     }
//     else {
//         gross.value = (Number(net.value) + Number(stop.value)).toFixed(2);
//     }

//     net = document.querySelector(".js-net-stroke-mm");
//     stop = document.querySelector(".js-stop-tube-mm");
//     gross = document.querySelector(".js-gross-stroke-mm");
//     sum = gross.value = (Number(net.value) + Number(stop.value)).toFixed(2);

//     if (sum = '' || sum == 0) {
//         gross.value = '';
//     }
//     else {
//         gross.value = (Number(net.value) + Number(stop.value)).toFixed(2);
//     }
// }

// PUSH PRESSURE FUNCTIONS

function pushPressureConversionFromPSI () {
    let conversionNumber = Number(document.querySelector(".js-push-pressure-psi").value)/145.0377377;
    document.querySelector(".js-push-pressure-mpa").value = conversionNumber.toFixed(2);
    conversionNumber = conversionNumber*10;
    document.querySelector(".js-push-pressure-bar").value = conversionNumber.toFixed(2);            
}

function pushPressureConversionFromMPa () {
    let conversionNumber = Number(document.querySelector(".js-push-pressure-mpa").value)*145.0377377;
    document.querySelector(".js-push-pressure-psi").value = conversionNumber.toFixed(2);
    conversionNumber = Number(document.querySelector(".js-push-pressure-mpa").value)*10;
    document.querySelector(".js-push-pressure-bar").value = conversionNumber.toFixed(2);
}

function pushPressureConversionFromBar () {
    let conversionNumber = Number(document.querySelector(".js-push-pressure-bar").value)/10;
    document.querySelector(".js-push-pressure-mpa").value = conversionNumber.toFixed(2);
    conversionNumber = conversionNumber*145.0377377;
    document.querySelector(".js-push-pressure-psi").value = conversionNumber.toFixed(2);            
}

function pullPressureConversionFromPSI () {
    let conversionNumber = Number(document.querySelector(".js-pull-pressure-psi").value)/145.0377377;
    document.querySelector(".js-pull-pressure-mpa").value = conversionNumber.toFixed(2);
    conversionNumber = conversionNumber*10;
    document.querySelector(".js-pull-pressure-bar").value = conversionNumber.toFixed(2);
}

function pullPressureConversionFromMPa () {
    let conversionNumber = Number(document.querySelector(".js-pull-pressure-mpa").value)*145.0377377;
    document.querySelector(".js-pull-pressure-psi").value = conversionNumber.toFixed(2);
    conversionNumber = Number(document.querySelector(".js-pull-pressure-mpa").value)*10;
    document.querySelector(".js-pull-pressure-bar").value = conversionNumber.toFixed(2);
}

function pullPressureConversionFromBar () {
    let conversionNumber = Number(document.querySelector(".js-pull-pressure-bar").value)/10;
    document.querySelector(".js-pull-pressure-mpa").value = conversionNumber.toFixed(2);
    conversionNumber = conversionNumber*145.0377377;
    document.querySelector(".js-pull-pressure-psi").value = conversionNumber.toFixed(2);
}

function pushForceConversionFromLBF () {
    let conversionNumber = Number(document.querySelector(".js-push-force-lbf").value)*4.4482216153;
    document.querySelector(".js-push-force-newton").value = conversionNumber.toFixed(2);
    conversionNumber = conversionNumber/9.80665/1000;
    document.querySelector(".js-push-force-ton-force").value = conversionNumber.toFixed(2);          
}

function pushForceConversionFromNewton () {

    let conversionNumber = Number(document.querySelector(".js-push-force-newton").value)/4.4482216153;
    document.querySelector(".js-push-force-lbf").value = conversionNumber.toFixed(2);

    conversionNumber = Number(document.querySelector(".js-push-force-newton").value)/9.80665/1000;
    document.querySelector(".js-push-force-ton-force").value = conversionNumber.toFixed(2);

}

function pushForceConversionFromTonForce () {

    let conversionNumber = Number(document.querySelector(".js-push-force-ton-force").value)*9.80665*1000;
    document.querySelector(".js-push-force-newton").value = conversionNumber.toFixed(2);

    conversionNumber = conversionNumber/4.4482216153;
    document.querySelector(".js-push-force-lbf").value = conversionNumber.toFixed(2);

}

function pullForceConversionFromLBF () {

    let conversionNumber = Number(document.querySelector(".js-pull-force-lbf").value)*4.4482216153;
    document.querySelector(".js-pull-force-newton").value = conversionNumber.toFixed(2);

    conversionNumber = conversionNumber/9.80665/1000;
    document.querySelector(".js-pull-force-ton-force").value = conversionNumber.toFixed(2);


}

function pullForceConversionFromNewton () {

    let conversionNumber = Number(document.querySelector(".js-pull-force-newton").value)/4.4482216153;
    document.querySelector(".js-pull-force-lbf").value = conversionNumber.toFixed(2);

    conversionNumber = Number(document.querySelector(".js-pull-force-newton").value)/9.80665/1000;
    document.querySelector(".js-pull-force-ton-force").value = conversionNumber.toFixed(2);

}

function pullForceConversionFromTonForce () {

    let conversionNumber = Number(document.querySelector(".js-pull-force-ton-force").value)*9.80665*1000;
    document.querySelector(".js-pull-force-newton").value = conversionNumber.toFixed(2);

    conversionNumber = conversionNumber/4.4482216153;
    document.querySelector(".js-pull-force-lbf").value = conversionNumber.toFixed(2);

}

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


