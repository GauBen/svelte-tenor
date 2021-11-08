<script lang="ts">
  import type { Gif } from './api'
  import { createEventDispatcher } from 'svelte'
  import GifComponent from './Gif2.svelte'

  /** Minimum size of each column, in pixels. */
  export let columnSize = 160

  /** Gap between gifs, pixels. */
  export let gap = 8

  /** Array of gifs to display. */
  export let gifs: Gif[] = []

  const dispatch = createEventDispatcher<{ click: Gif }>()

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
  {#each gifs as gif (gif.id)}
    <button
      style={`grid-row-end: span ${Math.ceil(
        (columnSize * gif.height) / gif.width / (2 * gap) + 0.5
      )}`}
      type="button"
      on:click={() => dispatch('click', gif)}
    >
      <GifComponent {gif} />
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
