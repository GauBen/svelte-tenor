<script lang="ts">
  import type { GifObject } from 'src/api'
  import { createEventDispatcher } from 'svelte'
  import Gif from './Gif.svelte'

  export let gifs: GifObject[] = []

  const dispatch = createEventDispatcher<{ click: GifObject }>()
</script>

<div class="grid">
  {#each gifs as result}
    <button
      style={`grid-row-end: span ${Math.ceil(
        (260 * result.media[0].webm.dims[1]) / result.media[0].webm.dims[0] / 16
      )}`}
      on:click={() => dispatch('click', result)}
    >
      <Gif medium={result.media[0]} />
    </button>
  {/each}
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-auto-rows: 8px;
    align-items: stretch;
    gap: 8px;
  }

  button {
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    transition: 0.2s box-shadow;

    &:focus,
    &:active {
      box-shadow: 0 0 0.5em blue;
    }
  }
</style>
