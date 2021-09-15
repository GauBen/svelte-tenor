<script lang="ts">
  import type { GifObject } from 'src/api'
  import Gif from './Gif.svelte'

  export let gifs: GifObject[] = []
  $: group = gifs[0]?.id
</script>

<div class="grid">
  {#each gifs as result}
    <label
      style={`grid-row-end: span ${Math.ceil(
        (260 * result.media[0].webm.dims[1]) / result.media[0].webm.dims[0] / 16
      )}`}
    >
      <input type="radio" value={result.id} bind:group name="gif" />
      <Gif medium={result.media[0]} />
    </label>
  {/each}
</div>

<style lang="scss">
  [type='radio'] {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  label {
    position: relative;
  }

  label:focus-within {
    box-shadow: 0 0 8px lime;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-auto-rows: 8px;
    align-items: stretch;
    gap: 8px;
  }
</style>
