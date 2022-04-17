import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from "power";
import { display } from "display";


let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");
let screen3 = document.getElementById("screen3");
let screen4 = document.getElementById("screen4");
let screen5 = document.getElementById("screen5");


let switchScreen1 = document.getElementById("switchScreen1"); // Button that goes form Screen1 to Screen2 
let timer = document.getElementById("timer")  // Screen1 timer 
let activity = document.getElementById("activity")  // Screen1 activity display 
let Screen3ToScreen1 = document.getElementById("Screen3ToScreen1")  // Button that does from Screen3 to Screen1
let Screen4ToScreen1 = document.getElementById("Screen4ToScreen1") 

/* Timer add and decrease */
let decrease1 = document.getElementById("left1")
let add1 = document.getElementById("right1")

/* Alarm */
let drop = document.getElementById("custom-textarea");
let stopAlarm = document.getElementById("stop");
let tran = document.getElementById("translate");

let workEnded = false;

const restRemaining = document.getElementById("rest-remaining");
const workRemaining = document.getElementById("work-remaining");


/* Timer Function */
function timer_function(){
  clock.granularity = "minutes"; // seconds, minutes, or hours

  let workDuration = 1
  let restDuration = 1


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
    if (workHrs < 10 || workHrs > 0){
      workHrs = '0'+Math.abs(workHrs)
    }else {
      workHrs = "00:00"
    };
    if (workMins < 10 || workMins >0){
      workMins = '0'+ Math.abs(workMins)
    } else {
      workRemaining.text = workHrs + ':' + workMins
    }
    decrease1.onclick = function() {
      console.log("test")
      if(workMins > 0){
        workMins--;
      }
    }
    add1.onclick = function() {
      console.log("test")
      workMins ++;
    }

    //transition from work to rest paradigm
    if ((Math.floor((targetTime - evt.date)/60/1000)) == 0){
      workEnded = true;
      showScreen5();}
    if (restHrs < 10 || restHrs > 0){
      restHrs = '0'+Math.abs(restHrs)
    };
    if (restMins < 10 || restMins > 0 ){
      restMins = '0'+ Math.abs(restMins)
    }
      restRemaining.text = restHrs + ':' + restMins
    if ((Math.floor((targetRestTime - evt.date)/60/1000)) == 0){
      workEnded = false;
      showScreen5();
        initialTime = new Date();
        targetTime = new Date(initialTime.getTime()+workDuration*60000);
        targetRestTime = new Date(initialTime.getTime()+(workDuration*60000)+restDuration*60000);
    }
  });
}




/* Functions that switch between screens */
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
  timer_function();
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
  showScreen2();
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timer = document.getElementById("timer");

let endTime = "";
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
  endTime = `${hours}:${mins}`;
}

// Battery Icon 




/* SCREEN 2 */
const current_activity = "";
let list = document.getElementById("myList");
let items = list.getElementsByClassName("list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) { 
    console.log(`touched: ${index}`);
    console.log(`Actvity:` + items[index].id); // Change the id of the compnents to the activity names 
    current_activity = items[index].id;
    activity.text = current_activity;
    showScreen3();

  };
});
let list = document.getElementById("myList");

// Get the selected index
let currentIndex = list.value;

// Set the selected index
list.value = 3; // Scroll to the 4th item



/* SCREEN 3 */
Screen3ToScreen1.onclick = function() {
  showScreen1();
  timer.text = workRemaining.text
}




/* SCREEN 4 */
Screen4ToScreen1.onclick = function() {
  showScreen1();
  timer.text = restRemaining.text

}

/* SCREEN 5 */
stopAlarm.onclick = function() {
  if(workEnded == true){
    showScreen4();
  }
  
  if(workEnded == false){
    timer.text = endTime;
    showScreen1();
  }
}
