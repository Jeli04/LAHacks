import * as document from "document";

let list = document.getElementById("myList");
let items = list.getElementsByClassName("list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) {
    console.log(`touched: ${index}`);
  };
});
let list = document.getElementById("my-list");

// Get the selected index
let currentIndex = list.value;

// Set the selected index
list.value = 3; // Scroll to the 4th item
