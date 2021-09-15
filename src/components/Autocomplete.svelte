<script lang="ts">
  import { autocomplete } from '../api'

  export let key: string
  export let limit = 10
  export let q: string

  const color = (str: string) => {
    let hash = 0xc0ffee
    for (const char of str)
      hash = (hash * 884489 + char.charCodeAt(0) * 9629) & 0xffffff
    const red = ((hash & 0xff0000) >> 16) + 1
    const green = ((hash & 0x00ff00) >> 8) + 1
    const blue = (hash & 0x0000ff) + 1
    const l = 0.4 * red + 0.4 * green + 0.2 * blue
    const h = (n: number) =>
      Math.min(0xe0, Math.max(0xa0, Math.floor((n * 0xd0) / l)))
        .toString(16)
        .padStart(2, '0')
    return `#${h(red)}${h(green)}${h(blue)}`
  }
</script>

{#await autocomplete({ key, q, limit }) then { results }}
  <div class="results">
    {#each results as result}
      <button style="background-color: {color(result)}">
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
  }

  button {
    border: 0;
    border-radius: 1em;
    padding: 0.5em;
  }
</style>
