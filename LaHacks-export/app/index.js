import * as document from "document";

let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");


// Add more funcions for new screens 
function showScreen1() {
  screen1.style.display = "inline";
  screen2.style.display = "none";
  screen3.style.display = "none";
}

function showScreen2() {
  screen1.style.display = "none";
  screen2.style.display = "inline";
  screen3.style.display = "none";  
}


button1.onclick = function() {
  showScreen2();
}



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



