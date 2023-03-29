const selectMenu = document.querySelectorAll("select"); /**All select tags */
let cuurentTime = document.getElementsByClassName("current-time");
let setAlarmBtn = document.querySelector("button");


const LOCAL_STORAGE_KEY = "Alarm";

const getAlarms = () => {
  let alarmTime = localStorage.getItem("Alarm");
  /**With the help of keyname we are getting the alarm time */
  console.log(alarmTime);

  if (alarmTime) {
    return JSON.parse(localStorage.getItem("Alarm"));
    /**localStorage.setItems("key", "value")
     * JSON.parse bcz Local Storage stores strings only
     * but we are working with integers
     */
  } else {
    return 0;
  }
};

let alarmTime = getAlarms();           
//after page refresh it will take alarm from local storage
let isAlarmSet = false;                
//Alarm is not set initally 
let ringtone = new Audio("./alarm.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  /**It gives the numbers in select tag */
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

/**Setting Alarm on Click of Set Alarm Button */
setAlarmBtn.addEventListener("click", setAlarm);

function setAlarm() {
  if (isAlarmSet) {
    //if alarm is set
    alarmTime = "";      
    //set alarm time to null
    ringtone.pause();    
    //and pause the ringtone
    console.log("Alarm stoped ringing");
    setAlarmBtn.innerText = "Set Alarm";
    //Change text again to set alarm

    //local storage will get cleared
    localStorage.clear()
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  alarmTime = time; 
  //values are taken
  isAlarmSet = true; 
  //set alarm to true after getting time from user input

  //setting item to local storage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(alarmTime));

  console.log(time);
  //if nothing is selected and Set Alarm Button is clicked.Show alert
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM?PM")
  ) {
    return alert("Please select valid time");
  }

  setAlarmBtn.innerText = "Stop";
  //change text to Stop
  return alarmTime;
}

/**digital clock */
function setDate() {
  const now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  let label = hour >= 12 ? "PM" : "AM"; /**to give label */

  hour = hour > 12 ? `${hour - 12}` : hour; /**if it is 13-1 = 1 pm */

  hour = hour < 10 ? `0${hour}` : hour;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  /**if digit is one digited then attach 0 before the  number */

  let clock = document.getElementById("digit");
  clock.innerHTML = `${hour}:${min}:${sec} `;

  let ampm = document.getElementById("ampm");
  ampm.innerHTML = ` ${label}`;

  if (alarmTime == `${hour}:${min} ${label}`) {
    //if alam time and current time are same
    console.log("Alarm ringing...");
    ringtone.play(); 
    //play the song
    ringtone.loop = true; 
    //repeat until button is clicked
  }
}

setInterval(setDate, 500);
//calling this to update the current time