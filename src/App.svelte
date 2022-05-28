<script>
  import Countdown from "./Countdown.svelte";
  import Stopwatch from "./Stopwatch.svelte";

  const tabs = [
    { idx: 0, label: "Countdown", icon: "fa-hourglass-end" },
    { idx: 1, label: "Stopwatch", icon: "fa-stopwatch" },
  ];

  let currentTabIdx = 0;
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
      <Countdown />
    {:else if currentTabIdx === 1}
      <Stopwatch />
    {/if}
  </div>
</main>

<style>
</style>
