const selectMenu = document.querySelectorAll("select"); /**All select tags */
let cuurentTime = document.getElementsByClassName("current-time");
let setAlarmBtn = document.querySelector("button");

const LOCAL_STORAGE_KEY = "Alarm";

const getAlarms = () => {
  let alarmTime = localStorage.getItem("Alarm");
  /**With the help of keyname we are getting the alarm time */

  if (alarmTime) {
    return JSON.parse(localStorage.getItem("Alarm"));
    /**localStorage.setItems("key", "value")
     * JSON.parse bcz Local Storage stores strings only
     * but we are working with integers
     */
  } else {
    return [];
  }
};

let alarmTime;
let localStorageAlarm = getAlarms();

alarmTime = localStorageAlarm[0];
if (localStorageAlarm[1] === undefined) {
  setAlarmBtn.innerText = "Set Alarm";
} else {
  setAlarmBtn.innerText = localStorageAlarm[1];
}
let isAlarmSet;
if (!isAlarmSet) {
  isAlarmSet = localStorageAlarm[2];
}
//Alarm is not set initally

console.log("LS " + alarmTime, setAlarmBtn.innerText, isAlarmSet);
//after page refresh it will take alarm from local storage

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
  const now = new Date();
  let Min = now.getMinutes();
  let sec = now.getSeconds();
  let Hourinput = selectMenu[0].value;
  let Minuteinput = parseInt(selectMenu[1].value);
  Minuteinput = Min > Minuteinput ? Minuteinput : Minuteinput+1 ;
  Minuteinput = Min < Minuteinput ? Minuteinput - 1 : Minuteinput;
  Minuteinput = Min == Minuteinput ? alert("Can't set alarm for now") : Minuteinput;
  let Secinput = selectMenu[2].value;

  let time = `${Hourinput}:${Minuteinput} ${Secinput}`;

  if (isAlarmSet) {
    console.log("input " + time, isAlarmSet);
    if (
      time.includes("Hour") ||
      time.includes("Minute") ||
      time.includes("AM/PM") ||
      setAlarmBtn.innerText.includes("Stop")
    ) {
      //if alarm is set
      alarmTime = "";
      //set alarm time to null
      ringtone.pause();
      //and pause the ringtone
      console.log("Alarm stoped");
      setAlarmBtn.innerText = "Set Alarm";
      //Change text again to set alarm

      //local storage will get cleared
      localStorage.clear();

      return (isAlarmSet = false);
    }
  }

  alarmTime = time;
  //values are taken
  isAlarmSet = true;
  //set alarm to true after getting time from user input

  //if nothing is selected and Set Alarm Button is clicked.Show alert
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select valid time");
  }

  setAlarmBtn.innerText = "Stop";
  //change text to Stop

  //setting item to local storage
  let LOCAL_STORAGE_ARRAY = [alarmTime, setAlarmBtn.innerText, isAlarmSet];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(LOCAL_STORAGE_ARRAY));

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
    console.log("Alarm ringing...", alarmTime);
    ringtone.play();
    //play the song
    ringtone.loop = true;
    //repeat until button is clicked
  }
}

setInterval(setDate, 500);
//calling this to update the current time
