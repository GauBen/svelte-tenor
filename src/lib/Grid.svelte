<script lang="ts">
  import type { Gif } from './api'
  import { createEventDispatcher } from 'svelte'
  import GifComponent from './Gif.svelte'

  /**
   * Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`.
   *
   * @default 160px
   */
  export let columnSize = 160

  const defaultRowSize = 8
  /**
   * Size of each row. A GIF spans over multiple grid rows.
   *
   * @default 8px
   */
  let rowSize = defaultRowSize

  /**
   * Gap between GIFs, in pixels.
   *
   * @default 8px
   */
  export let gap = 8

  /**
   * In-line, horizontal scrolling grid.
   *
   * @default false
   */
  export let inline = false

  /** Array of GIFs to display. */
  export let gifs: Gif[] = []

  const dispatch = createEventDispatcher<{ click: Gif }>()

  /** Preserves the aspect ratio of the GIFs. */
  const watch = (el: HTMLElement) => {
    // To avoid a bug, we keep the last two widths
    let widths = [-1, -1]
    const observer = new ResizeObserver(() => {
      // If we are oscillating between two widths, abort
      if (el.offsetWidth === widths[0]) return
      widths = [widths[1], el.offsetWidth]
      const columns = window
        .getComputedStyle(el)
        .getPropertyValue('grid-template-columns')
        .split(' ').length
      const available = el.offsetWidth - (columns - 1) * gap
      // Compute the row size to keep the aspect ratio
      rowSize =
        ((available / columns) * (defaultRowSize + gap)) / columnSize - gap
    })
    observer.observe(el)

    return {
      destroy() {
        observer.unobserve(el)
      },
    }
  }
</script>

<div
  class="grid"
  class:inline
  use:watch
  style={`
    --column: ${columnSize}px;
    --row: ${rowSize}px;
    --gap: ${gap}px;
  `}
>
  {#each gifs as gif (gif.id)}
    <button
      style={`grid-row-end: span ${Math.ceil(
        (columnSize * gif.height) / gif.width / (defaultRowSize + gap)
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
    grid-auto-rows: var(--row, 8px);
    grid-template-columns: repeat(auto-fill, minmax(var(--column, 160px), 1fr));
    gap: var(--gap, 8px);
    align-items: stretch;
    border-radius: 4px;

    &.inline {
      display: flex;
      height: var(--column, 160px);
      overflow: auto;
    }
  }

  button {
    position: relative;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: none;
    border: 0;
    border-radius: 4px;

    &::before {
      position: absolute;
      transition: 0.2s box-shadow;
      content: "";
      inset: 0;
    }

    &:focus,
    &:active {
      outline: 0;

      &::before {
        box-shadow: 0 0 1em blue inset, 0 0 1em white inset;
      }
    }

    > :global(.gif) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
