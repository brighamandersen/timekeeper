<script>
  import { secondsToDisplayStr } from "./timeHelpers";
  import { MIN_TIME, ONE_SEC_IN_MS, MAX_TIME, FIVE_MIN } from "./constants";
  import { onMount } from "svelte";

  let timeInSec;
  let isPaused;
  reset();

  $: timeStr = secondsToDisplayStr(timeInSec);

  onMount(async () => {
    setInterval(() => {
      if (isPaused) return; // Don't do anything if paused
      if (timeInSec === MIN_TIME) {
        // If time runs out
        endCountdown();
        return;
      }
      // If there's time left
      timeInSec -= 1;
    }, ONE_SEC_IN_MS);
  });

  function endCountdown() {
    reset();
    alert("Time's Up!");
  }

  function togglePause() {
    isPaused = !isPaused;
  }

  $: pauseBtnText = isPaused ? "Count Down" : "Pause";

  function reset() {
    timeInSec = FIVE_MIN;
    isPaused = true;
  }
</script>

<svelte:head>
  <title>{timeStr}</title>
</svelte:head>
<div>
  <h1 class="time subtitle is-1">
    {timeStr}
  </h1>
</div>
<div class="buttons are-medium">
  <button class="pause-btn button is-primary" on:click={togglePause}>
    {pauseBtnText}
  </button>
  <button
    class="reset-btn button is-danger is-light is-outlined"
    on:click={reset}
  >
    Reset
  </button>
</div>

<div class="keypad">
  <div class="hours-entry" on>
    <h4>Hours</h4>
    <button onclick="onHoursChange(-1)">-1</button>
    <button onclick="onHoursChange(1)">+1</button>
  </div>
  <div class="minutes-entry">
    <h4>Minutes</h4>
    <button onclick="onMinutesChange(-10)">-10</button>
    <button onclick="onMinutesChange(-5)">-5</button>
    <button onclick="onMinutesChange(-1)">-1</button>
    <button onclick="onMinutesChange(1)">+1</button>
    <button onclick="onMinutesChange(5)">+5</button>
    <button onclick="onMinutesChange(10)">+10</button>
  </div>
  <div class="seconds-entry">
    <h4>Seconds</h4>
    <button onclick="onSecondsChange(-10)">-10</button>
    <button onclick="onSecondsChange(-5)">-5</button>
    <button onclick="onSecondsChange(-1)">-1</button>
    <button onclick="onSecondsChange(1)">+1</button>
    <button onclick="onSecondsChange(5)">+5</button>
    <button onclick="onSecondsChange(10)">+10</button>
  </div>
</div>
