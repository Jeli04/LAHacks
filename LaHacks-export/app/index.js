import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let screen3 = document.getElementById("screen3");
let screen4 = document.getElementById("screen4");
let screen5 = document.getElementById("screen5");


let switchScreen1 = document.getElementById("switchScreen1");
let timer = document.getElementById("timer")


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



/* SCREEN 1 */
switchScreen1.onclick = function() {
  showScreen3();
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
//const timer = document.getElementById("timer");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  timer.text = `${hours}:${mins}`;
}



/* SCREEN 2 */
const current_activity = "";
//let list = document.getElementById("myList");
let items = list.getElementsByClassName("list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) { 
    console.log(`touched: ${index}`);
    console.log(`Actvity:` + items[index].id); // Change the id of the compnents to the activity names 
    current_activity = items[index].id;
    showScreen3();
  };
});
let list = document.getElementById("myList");

// Get the selected index
let currentIndex = list.value;

// Set the selected index
list.value = 3; // Scroll to the 4th item


/* SCREEN 3 */
clock.granularity = "minutes"; // seconds, minutes, or hours

let workDuration = 1
let restDuration = 1

const restRemaining = document.getElementById("rest-remaining");
const workRemaining = document.getElementById("work-remaining");

let initialTime = new Date();
let targetTime = new Date(initialTime.getTime()+workDuration*60000);
let targetRestTime = new Date(initialTime.getTime()+(workDuration*60000)+restDuration*60000)
// let current = new Date();
// const diff = (targetTime - current)/60/1000;

//workRemaining.text = Math.floor((targetTime - evt.date)/60/1000)
clock.addEventListener("tick", (evt) => {
  let workLeft = Math.floor((targetTime - evt.date)/60/1000)
  let workHrs = Math.floor(workLeft/60)
  let workMins = workLeft % 60
  let restLeft = Math.floor((targetRestTime - evt.date)/60/1000)
  let restHrs = Math.floor(restLeft/60)
  let restMins = restLeft % 60
  if (workHrs < 10){
    workHrs = '0'+workHrs
  };
  if (workMins < 10){
    workMins = '0'+workMins
  }
  workRemaining.text = workHrs + ':' + workMins
  //transition from work to rest paradigm
  if ((Math.floor((targetTime - evt.date)/60/1000)) == 0){
    showScreen4();}
  if (restHrs < 10){
    restHrs = '0'+restHrs
  };
  if (restMins < 10){
    restMins = '0'+restMins
  }
    restRemaining.text = restHrs + ':' + restMins
  if (restLeft == 0){
    showScreen3();
  initialTime = new Date();
  targetTime = new Date(initialTime.getTime()+workDuration*60000);
  targetRestTime = new Date(initialTime.getTime()+(workDuration*60000)+restDuration*60000); //turn this into a loop and reinitialize the variables
  }
});
// clock.addEventListener('tick', (evt) => {
//   workRemaining.text = evt.date.toTimeString().slice(0, -7);
// });
// initialTime.setMinutes(initialTime.getMinutes()+1);
//restRemaining.text = evt.date.toTimeString().slice(0, -7);
//Math.floor((targetRestTime - evt.date)/60/1000)


/* SCREEN 4 */


/* SCREEN 5 */