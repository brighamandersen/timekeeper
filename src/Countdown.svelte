<script>
  import {
    secondsToDisplayStr,
    hoursToSeconds,
    minutesToSeconds,
  } from "./timeHelpers";
  import { MIN_TIME, ONE_SEC_IN_MS, FIVE_MIN } from "./constants";
  import { onMount } from "svelte";

  const MIN_SEC_INCREMENTS = [-10, -5, -1, 1, 5, 10];

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

  function adjustHours(amount) {
    timeInSec += hoursToSeconds(amount);
    if (timeInSec < MIN_TIME) timeInSec = MIN_TIME;
  }

  function adjustMinutes(amount) {
    timeInSec += minutesToSeconds(amount);
    if (timeInSec < MIN_TIME) timeInSec = MIN_TIME;
  }

  function adjustSeconds(amount) {
    timeInSec += amount;
    if (timeInSec < MIN_TIME) timeInSec = MIN_TIME;
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
  <div class="hours-entry my-4">
    <h4>Hours</h4>
    <button
      class="button is-danger is-outlined m-1"
      on:click={() => adjustHours(-1)}>-1</button
    >
    <button
      class="button is-success is-outlined m-1"
      on:click={() => adjustHours(1)}>+1</button
    >
  </div>
  <div class="minutes-entry my-4">
    <h4>Minutes</h4>
    {#each MIN_SEC_INCREMENTS as inc}
      <button
        class="button is-outlined {inc > 0 ? 'is-success' : 'is-danger'} m-1"
        on:click={() => adjustMinutes(inc)}
      >
        {inc > 0 ? "+" : ""}
        {inc}
      </button>
    {/each}
  </div>
  <div class="seconds-entry my-4">
    <h4>Seconds</h4>
    {#each MIN_SEC_INCREMENTS as inc}
      <button
        class="button is-outlined {inc > 0 ? 'is-success' : 'is-danger'} m-1"
        on:click={() => adjustSeconds(inc)}
      >
        {inc > 0 ? "+" : ""}
        {inc}
      </button>
    {/each}
  </div>
</div>
