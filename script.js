const countdownTab = document.querySelector('.countdown-tab');
const stopwatchTab = document.querySelector('.stopwatch-tab');
const timeH1 = document.querySelector('.time');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');

let secondsElapsed = 0;
let isPaused = true;

function goToCountdown() {
  document.title = "Countdown";
  resetStopwatch();
  stopwatchTab.classList.remove('is-active');
  countdownTab.classList.add('is-active');
}

function goToStopwatch() {
  document.title = "Stopwatch";
  resetStopwatch();
  countdownTab.classList.remove('is-active');
  stopwatchTab.classList.add('is-active');
}

// Ongoing process in background that will increment seconds when enabled
setInterval(() => {
  if (!isPaused) {
    secondsElapsed += 1;
    renderTimeDisplay();
  }
}, 1000)

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
  secondsElapsed = 0;
  renderTimeDisplay();
}

// Ex: Converts 5 (seconds) into '00:00:05'
function secondsNumToHmsStr() {
  return new Date(secondsElapsed * 1000).toISOString().substring(11, 19);
}

function renderTimeDisplay() {
  const timeStr = secondsNumToHmsStr(secondsElapsed);
  timeH1.textContent = timeStr;
  document.title = timeStr;
}

function lightenPauseBtn() {
  pauseBtn.classList.add('is-outlined', 'is-light');
}

function darkenPauseBtn() {
  pauseBtn.classList.remove('is-outlined', 'is-light');
}