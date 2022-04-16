import * as document from "document";

let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let screen3 = document.getElementById("screen3");
let screen4 = document.getElementById("screen4");
let screen5 = document.getElementById("screen5");


let switchScreen1 = document.getElementById("switchScreen1");


// Add more funcions for new screens 
function showScreen1() {
  screen1.style.display = "inline";
  screen2.style.display = "none";
  screen3.style.display = "none";
  screen4.style.display = "none";
  screen5.style.display = "none";
}

function showScreen2() {
  screen1.style.display = "none";
  screen2.style.display = "inline";
  screen3.style.display = "none"; 
  screen4.style.display = "none";
  screen5.style.display = "none";
}

function showScreen3() {
  screen1.style.display = "none";
  screen2.style.display = "none";
  screen3.style.display = "inline";
  screen4.style.display = "none";
  screen5.style.display = "none";
}

function showScreen4() {
  screen1.style.display = "none";
  screen2.style.display = "none";
  screen3.style.display = "none";  
  screen4.style.display = "inline";
  screen5.style.display = "none";
}

function showScreen5() {
  screen1.style.display = "none";
  screen2.style.display = "none";
  screen3.style.display = "none";
  screen4.style.display = "none";
  screen5.style.display = "inline";
}



/* Screen 1 */
switchScreen1.onclick = function() {
  showScreen2();
}



/* Screen 2 */
let list = document.getElementById("myList");
let items = list.getElementsByClassName("list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) {
    console.log(`touched: ${index}`);
  };
});
let list = document.getElementById("myList");

// Get the selected index
let currentIndex = list.value;

// Set the selected index
list.value = 3; // Scroll to the 4th item


/* Screen 3 */


/* Screen 4 */


/* Scrren 5 */

