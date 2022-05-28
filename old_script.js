// Constants
const IS_ACTIVE = 'is-active';
const IS_OUTLINED = 'is-outlined';
const IS_LIGHT = 'is-light';
const HAS_GRAY_TEXT = 'has-text-grey-lighter';
const ONE_SEC_IN_MS = 1000;
const MAX_TIME = 86399; // One second under 24 hours
const MIN_TIME = 0; // 0 seconds

// Elements
const countdownTab = document.querySelector('.countdown-tab');
const stopwatchTab = document.querySelector('.stopwatch-tab');
const timeH1 = document.querySelector('.time');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');
const secondsInput = document.querySelector('#seconds');

// Global vars
let timeInSec = MIN_TIME;
let isPaused = true;
let countingDown = true;

resetStopwatch();
pauseBtn.disabled = true;
resetBtn.disabled = true;

// Ongoing process in background that will increment seconds when enabled
setInterval(() => {
  if (!isPaused) {
    if (countingDown && timeInSec > MIN_TIME) {
      setTimeAndDisplay(timeInSec - 1);
    } 
    if (!countingDown && timeInSec < MAX_TIME) {
      setTimeAndDisplay(timeInSec + 1);
    }
  }
}, ONE_SEC_IN_MS)

function goToCountdown() {
  document.title = "Countdown";
  resetStopwatch();
  countingDown = true;
  stopwatchTab.classList.remove(IS_ACTIVE);
  countdownTab.classList.add(IS_ACTIVE);
  timeH1.classList.add(HAS_GRAY_TEXT);
}

function goToStopwatch() {
  document.title = "Stopwatch";
  resetStopwatch();
  countingDown = false;
  countdownTab.classList.remove(IS_ACTIVE);
  stopwatchTab.classList.add(IS_ACTIVE);
  timeH1.classList.remove(HAS_GRAY_TEXT);
}

function togglePause() {
  isPaused = !isPaused;

  if (isPaused) {
    pauseBtn.textContent = "Resume";
    darkenPauseBtn();
  } else {
    pauseBtn.textContent = "Pause";
    lightenPauseBtn();
  }
}

function resetStopwatch() {
  isPaused = true;
  pauseBtn.textContent = "Start";
  darkenPauseBtn();
  setTimeAndDisplay(MIN_TIME);

  if (countingDown) {
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  } else {
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
  }
}

// Ex: Converts 5 (seconds) into '00:00:05'
function secondsNumToHmsStr() {
  const fullDateStr = new Date(timeInSec * 1000).toISOString();
  const hourStr = fullDateStr.substring(11,13);
  const minStr = fullDateStr.substring(14,16);
  const secStr = fullDateStr.substring(17,19);
  return `${hourStr}h ${minStr}m ${secStr}s`
  // return new Date(timeInSec * 1000).toISOString()//.substring(11, 19);
}

function renderTimeDisplay() {
  const timeStr = secondsNumToHmsStr(timeInSec);
  timeH1.textContent = timeStr;
  document.title = timeStr;
}

function setTimeAndDisplay(seconds) {
  timeInSec = seconds;
  if (timeInSec === 0 && countingDown) {
    pauseBtn.disabled = true;
  } else {
    pauseBtn.disabled = false;
  }
  renderTimeDisplay();
}

function lightenPauseBtn() {
  pauseBtn.classList.add(IS_OUTLINED, IS_LIGHT);
}

function darkenPauseBtn() {
  pauseBtn.classList.remove(IS_OUTLINED, IS_LIGHT);
}

function onHoursChange(hoursVal) {
  const seconds = hoursToSeconds(hoursVal);
  setTimeAndDisplay(timeInSec + seconds);
}

function onMinutesChange(minutesVal) {
  const seconds = minutesToSeconds(minutesVal);
  setTimeAndDisplay(timeInSec + seconds);
}

function onSecondsChange(secondsVal) {
  setTimeAndDisplay(timeInSec + secondsVal);
}

function hoursToSeconds(hours) {
  return hours * 3600;
}

function minutesToSeconds(minutes) {
  return minutes * 60;
}