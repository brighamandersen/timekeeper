const currentPgH1 = document.querySelector('.current-pg-text');
const timeH1 = document.querySelector('.time');
const togglePauseBtn = document.querySelector('.toggle-pause-btn');

let secondsElapsed = 0;
let isPaused = true;

function goToCountdown() {
  document.title = "Countdown";
  currentPgH1.textContent = "Countdown";
  resetStopwatch();
}

function goToStopwatch() {
  document.title = "Stopwatch";
  currentPgH1.textContent = "Stopwatch";
  resetStopwatch();
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

  isPaused ? 
    togglePauseBtn.textContent = "Resume" 
    : togglePauseBtn.textContent = "Pause";
}

function resetStopwatch() {
  isPaused = true;
  togglePauseBtn.textContent = "Start";
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
  document.title = timeStr + ' (Stopwatch)';
}