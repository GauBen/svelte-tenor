<script lang="ts">
  import Gif from "./Gif.svelte";
  import type { GifObject } from "./api.js";

  const {
    columnSize = 160,
    gap = 8,
    inline = false,
    gifs = [],
    onclick = () => {},
  } = $props<{
    /**
     * Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`.
     *
     * @default 160px
     */
    columnSize?: number;
    /**
     * Gap between GIFs, in pixels.
     *
     * @default 8px
     */
    gap?: number;
    /**
     * In-line, horizontal scrolling grid.
     *
     * @default false
     */
    inline?: boolean;
    /** Set `resetPosition` to true to scroll to the top-left corner. */
    resetPosition?: boolean;
    /** Array of GIFs to display. */
    gifs?: GifObject[];
    /** Click handler. */
    onclick?: (gif: GifObject) => void;
  }>();

  let grid = $state<HTMLDivElement>();
  export function scrollToStart() {
    grid?.scrollTo({ top: 0, left: 0 });
  }

  /** Size of each row. */
  const rowSize = 8;
</script>

<div
  class:inline
  style:--column="{columnSize}px"
  style:--row="{rowSize}px"
  style:--gap="{gap}px"
  bind:this={grid}
>
  {#each gifs as gif}
    <button
      style:grid-row-end="span {Math.ceil(
        (columnSize * gif.height) / gif.width / (rowSize + gap),
      )}"
      type="button"
      onclick={() => onclick(gif)}
    >
      <Gif {...gif} />
    </button>
  {/each}
</div>

<style lang="scss">
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--column), 1fr));
    grid-auto-rows: var(--row);
    gap: var(--gap);
    align-items: stretch;
    border-radius: 0.25rem;

    &.inline {
      display: flex;
      height: var(--column);
      overflow: auto;
    }
  }

  button {
    position: relative;
    flex-shrink: 0;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background: none;
    border: 0;
    border-radius: 0.25rem;

    > :global(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
