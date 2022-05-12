const currentPgH1 = document.querySelector('.current-pg-text')
const timeH1 = document.querySelector('.time')

let secondsElapsed = 0;

function goToCountdown() {
  document.title = "Countdown"
  currentPgH1.textContent = "Countdown"
}

function goToStopwatch() {
  document.title = "Stopwatch"
  currentPgH1.textContent = "Stopwatch"
}

function startStopwatch() {
  setInterval(() => {
    secondsElapsed += 1
    const timeStr = secondsNumToHmsStr(secondsElapsed);
    timeH1.textContent = timeStr;
    document.title = timeStr + ' (Stopwatch)';
  }, 1000)
}

// Ex: Converts 5 (seconds) into '00:00:05'
function secondsNumToHmsStr() {
  return new Date(secondsElapsed * 1000).toISOString().substring(11, 19);
}