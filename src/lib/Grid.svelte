<script lang="ts">
  import type { GifObject } from './api'
  import { createEventDispatcher } from 'svelte'
  import Gif from './Gif.svelte'

  /** Minimum size of each column, in pixels. */
  export let columnSize = 260

  /** Gap between gifs, pixels. */
  export let gap = 8

  /** Array of gifs to display. */
  export let gifs: GifObject[] = []

  const dispatch = createEventDispatcher<{ click: GifObject }>()

  /** Preserves the aspect ratio of the gifs. */
  const watch = (el: HTMLElement) => {
    const observer = new ResizeObserver(() => {
      const columns = window
        .getComputedStyle(el)
        .getPropertyValue('grid-template-columns')
        .split(' ').length
      const available = el.offsetWidth - (columns - 1) * gap
      const rowSize = ((available / columns) * gap * 2) / columnSize - gap
      el.style.setProperty('--row', `${rowSize}px`)
    })
    observer.observe(el)

    return {
      destroy() {
        observer.disconnect()
      },
    }
  }
</script>

<div class="grid" use:watch style="--column: {columnSize}px; --gap: {gap}px">
  {#each gifs as result}
    <button
      style={`grid-row-end: span ${Math.ceil(
        (columnSize * result.media[0].webm.dims[1]) /
          result.media[0].webm.dims[0] /
          (2 * gap) +
          0.5
      )}`}
      type="button"
      on:click={() => dispatch('click', result)}
    >
      <Gif medium={result.media[0]} />
    </button>
  {/each}
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--column, 260px), 1fr));
    grid-auto-rows: var(--row, var(--gap, 8px));
    align-items: stretch;
    gap: var(--gap, 8px);
  }

  button {
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
    transition: 0.2s box-shadow;
    border-radius: 4px;
    overflow: hidden;

    &:focus,
    &:active {
      box-shadow: 0 0 0.5em blue;
    }
  }
</style>
