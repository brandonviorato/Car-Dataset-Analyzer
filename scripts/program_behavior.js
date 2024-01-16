/*
    This is a script that calculates & outputs
    various information from a dataset about 
    cars to a website

    Author: Brandon Viorato
    Date: 2/27/2023
    File: program_behavior.js
*/
function display(index) { //shows the current record in the array of records at the position within the index variable
    const CAR = cars[index]; // assign record at current index to car

    // assign properties to variables
    const IDENTIFICATION = CAR.Identification;
    const ENGINE = CAR["Engine Information"];
    const FUEL = CAR["Fuel Information"];
    
    // display our data to the webpage
    document.getElementById("makeAndModel").innerHTML = IDENTIFICATION.ID;
    document.getElementById("engine").innerHTML = ENGINE["Engine Type"];
    document.getElementById("driveline").innerHTML = ENGINE.Driveline;
    document.getElementById("transmission").innerHTML = ENGINE.Transmission;
    document.getElementById("mpgCity").innerHTML = FUEL["City mpg"];
    document.getElementById("mpgHighway").innerHTML = FUEL["Highway mpg"];
    document.getElementById("fuelType").innerHTML = FUEL["Fuel Type"];
}

function calculateMPG() { // calculates the highest, lowest, and average combined MPG
    let totalMPG = 0;
    let highestMPG = 0;
    let lowestMPG = Number.MAX_VALUE;

    for (let i = 0; i < cars.length - 1; i++) {
        const CAR = cars[i];
        const FUEL = CAR["Fuel Information"];
        const COMBINED_MPG = (FUEL["City mpg"] + FUEL["Highway mpg"]) / 2;

        totalMPG += COMBINED_MPG;

        if (COMBINED_MPG > highestMPG) {
            highestMPG = COMBINED_MPG;
        }

        if (COMBINED_MPG < lowestMPG) {
            lowestMPG = COMBINED_MPG;
        }
    }

    const AVERAGE_MPG = totalMPG / cars.length;  // calculate total average combined mpg

    // display our rounded results to the webpage
    document.getElementById("combinedMPG").textContent = Math.round(AVERAGE_MPG);
    document.getElementById("highestMPG").textContent = Math.round(highestMPG);
    document.getElementById("lowestMPG").textContent = Math.round(lowestMPG);
}

function compileData() { // gathers makes, entries / make, and avg hp / make from dataset and puts it into an array
    let makes  = []; // starting array

    for (let i = 0; i < cars.length - 1; i++) { // loop over the dataset
        const CAR = cars[i];    
        const MAKE = CAR.Identification.Make;
        const HORSEPOWER = CAR["Engine Information"]["Engine Statistics"].Horsepower;
        
        if (!makes[MAKE]) { // create a new object for the make if it doesn't exist
            makes[MAKE] = { count: 1, totalHorsepower: HORSEPOWER };
        } 
        else { // update the existing object's total Horsepower and count properties
            makes[MAKE].totalHorsepower += HORSEPOWER;
            makes[MAKE].count++;
        }
    }
    return makes;
}

function mostPowerMake() { // displays the make that has the highest average horsepower
    let makes = compileData(); // get our data

    // find the make with the highest average horsepower
    let maxAvgHorsepower = 0;
    let mostPowerMake = "";
    for (const MAKE in makes) {
        const TOTAL_HORSEPOWER = makes[MAKE].totalHorsepower;
        const COUNT = makes[MAKE].count;
        const AVG_HORSEPOWER = TOTAL_HORSEPOWER / COUNT;
        
        if (AVG_HORSEPOWER > maxAvgHorsepower) {
            maxAvgHorsepower = AVG_HORSEPOWER;
            mostPowerMake = MAKE;
        }
    }

    // display our data to the webpage
    document.getElementById("mostPowerMake").textContent = mostPowerMake + "s";
    document.getElementById("mostPower").textContent = Math.round(maxAvgHorsepower);
}

function mostEntries() { // displays the make with the most entries in the dataset
    let makes = compileData();

    // Find the make with the most entries
    let highestCount = 0;
    let make = "";
    for (const MAKE in makes) {
        const COUNT = makes[MAKE].count;
        
        if (COUNT > highestCount) {
        highestCount = COUNT;
        make = MAKE;
        }
    }

    // display our data to the webpage
    document.getElementById("mostMake").textContent = make;
    document.getElementById("entries").textContent = highestCount;
}

function updateButtonState(index) { // updates the button state based on index value
    if (index == 0) { // disable previous button so that index is never less than zero
        previous.disabled = true;
    } 
    else if (index == cars.length - 1) { // disable next button so index is never greater than array.length - 1
        next.disabled = true;
    }
    else { // enable both buttons while index is between
        previous.disabled = false;
        next.disabled = false;
    }
}

//get access to our buttons
let previous = document.getElementById("previous");
let next = document.getElementById("next");

//responds to clicks of the "previous" button
previous.onclick = function(event) {
    index--;
    updateButtonState(index);
    display(index); // display record at the updated index
}

//responds to clicks of the "next" button
next.onclick = function(event) {
    index++;
    updateButtonState(index);
    display(index); // display record at the updated index
}

let index = 0; // displays information from first record upon loading page

document.getElementById("totalRecords").innerHTML = cars.length; // display the total number of records

//display the first record in dataset & disable the previous button
display(index);
updateButtonState(index);

//Interesting fact calculations
calculateMPG(); // displays average MPG Info
mostPowerMake(); // displays the make with the highest avg horsepower
mostEntries(); // displays the make with the most entries