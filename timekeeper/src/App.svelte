<script>
  import { secondsToDisplayStr } from "./timeHelpers";
  import { onMount } from "svelte";
  import Stopwatch from "./Stopwatch.svelte";

  const ONE_SEC_IN_MS = 1000;
  const MAX_TIME = 86399; // One second under 24 hours
  const MIN_TIME = 0; // 0 seconds

  let currentTabIdx = 0;
  let timeInSec = 0;
  let isPaused = true;
  let pauseBtnText = "Start";
  let countingDown = true;

  const tabs = [
    { idx: 0, label: "Countdown", icon: "fa-hourglass-end" },
    { idx: 1, label: "Stopwatch", icon: "fa-stopwatch" },
  ];

  onMount(async () => {
    setInterval(() => {
      console.log("ran", "ip", isPaused, "cd", countingDown, "ts", timeInSec);
      if (!isPaused) {
        if (countingDown && timeInSec > MIN_TIME) {
          console.log("hit this");
          timeInSec -= 1;
        }
        if (!countingDown && timeInSec < MAX_TIME) {
          timeInSec += 1;
        }
      }
    }, ONE_SEC_IN_MS);
  });

  function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
      pauseBtnText = "Resume";
    } else {
      pauseBtnText = "Pause";
    }
  }
</script>

<main>
  <h1 class="title is-1 p-4">TimeKeeper</h1>
  <div class="tabs is-centered">
    <ul>
      {#each tabs as tab}
        <li class={tab.idx === currentTabIdx && "is-active"}>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a on:click={() => (currentTabIdx = tab.idx)}>
            <span class="icon is-small">
              <i class="fas {tab.icon}" />
            </span>
            <span>{tab.label}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div
    class="content is-flex is-flex-direction-column is-align-items-center m-5"
  >
    {#if currentTabIdx === 0}
      <h1>Countdown</h1>
    {/if}
    {#if currentTabIdx === 1}
      <Stopwatch />
    {/if}
    <!-- <div class="display">
        <h1 class="time subtitle is-1 has-text-grey-lighter">{secondsToDisplayStr(timeInSec)}</h1>
      </div>
      <div class="control-btns buttons are-medium">
        <button class="pause-btn button is-primary" on:click={togglePause}>
          {pauseBtnText}
        </button>
        <button
          class="reset-btn button is-danger is-light is-outlined"
          onclick="resetStopwatch()"
        >
          Reset
        </button>
      </div> -->
    <!-- {timeInSec} -->
    <!-- <div class="keypad">
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
        <input
          type="number"
          id="hours"
          name="hours"
          min="0"
          max="23"
          step="1"
          value="0"
        />
        <span>h</span>
        <input
          type="number"
          id="minutes"
          name="minutes"
          min="0"
          max="59"
          step="1"
          value="5"
        />
        <span>m</span>
        <input
          type="number"
          id="seconds"
          name="seconds"
          min="0"
          max="59"
          step="1"
          value="0"
        />
        <span>s</span>
      </div>
    </div> -->
  </div>
</main>

<style>
</style>
