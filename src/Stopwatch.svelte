<script>
  import { secondsToDisplayStr } from "./timeHelpers";
  import { MIN_TIME, ONE_SEC_IN_MS, MAX_TIME } from "./constants";
  import { onMount } from "svelte";

  let timeInSec = MIN_TIME;
  let isPaused = true;

  $: timeStr = secondsToDisplayStr(timeInSec);

  onMount(async () => {
    setInterval(() => {
      if (!isPaused && timeInSec < MAX_TIME) {
        timeInSec += 1;
      }
    }, ONE_SEC_IN_MS);
  });

  function togglePause() {
    isPaused = !isPaused;
  }

  $: pauseBtnText = !isPaused ? "Pause" : timeInSec === 0 ? "Start" : "Resume";

  function reset() {
    timeInSec = 0;
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
