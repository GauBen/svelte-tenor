<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { autocomplete } from './api'

  export let key: string
  export let limit = 10
  export let q: string

  export let scroll = false

  const color = (str: string) => {
    let hash = 0xc0ffee
    for (const char of str)
      hash = (hash * 884489 + char.charCodeAt(0) * 9629) & 0xffffff
    const red = ((hash & 0xff0000) >> 16) + 1
    const green = ((hash & 0x00ff00) >> 8) + 1
    const blue = (hash & 0x0000ff) + 1
    const l = 0.4 * red + 0.4 * green + 0.2 * blue
    const h = (n: number) =>
      Math.min(0xd0, Math.max(0x60, Math.floor((n * 0xd0) / l)))
        .toString(16)
        .padStart(2, '0')
    return `#${h(red)}${h(green)}${h(blue)}`
  }

  const dispatch = createEventDispatcher<{ click: string }>()
</script>

{#await autocomplete({ key, q, limit }) then { results }}
  <div class="results" class:scroll>
    {#each results as result}
      <button
        style="background-color: {color(result)}"
        on:click={() => dispatch('click', result)}
      >
        {result}
      </button>
    {/each}
  </div>
{/await}

<style lang="scss">
  .results {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    &.scroll {
      flex-wrap: nowrap;
      overflow: auto;
    }
  }

  button {
    border: 0;
    border-radius: 0.25em;
    padding: 0.5em;
    color: white;
    font-weight: bold;
    text-shadow: 0 0 0.25em #0008;
    box-shadow: 0 0 0.25em #0004;
    flex-shrink: 0;
  }
</style>
