<script lang="ts">
  import type { Gif, SearchOptions } from './api'
  import { createEventDispatcher, onMount } from 'svelte'
  import { registerShare } from './api'
  import Search from './Search.svelte'

  /** Tenor API key. */
  export let key: SearchOptions['key']
  /** Search term. */
  export let q: SearchOptions['q'] = ''
  /** Search locale. */
  export let locale: SearchOptions['locale'] = undefined
  /** Video quality filter. */
  export let quality: SearchOptions['quality'] = undefined
  /** Safety filter. */
  export let safety: SearchOptions['safety'] = undefined
  /** Aspect ratio filter. */
  export let ratio: SearchOptions['ratio'] = undefined
  /** Number of results per page. */
  export let limit: SearchOptions['limit'] = undefined

  /** Number of pages to display. */
  export let page = 1

  /**
   * Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`.
   *
   * @default 140px
   */
  export let columnSize = 140
  /**
   * Gap between elements, in pixels.
   *
   * @default 4px
   */
  export let gap = 4
  /**
   * Should the input be focused when mounted?
   *
   * @default true
   */
  export let autofocus = true

  /**
   * Is the request in progress?
   *
   * @readonly
   */
  export let loading = true
  /**
   * GIFs displayed in the grid.
   *
   * @readonly
   */
  export let gifs: Array<Gif> | undefined = undefined

  const dispatch = createEventDispatcher<{ click: Gif; close: void }>()

  let input: HTMLInputElement | undefined
  onMount(() => {
    if (input && autofocus) input.focus()
  })
</script>

<div class="mobile-keyboard" style="--column: {columnSize}px; --gap: {gap}px">
  {#if gifs === undefined}
    <div class="loading">
      <div class="spinner" aria-label="Loading" />
    </div>
  {/if}
  <Search
    {key}
    {q}
    {locale}
    {quality}
    {safety}
    {ratio}
    {limit}
    {columnSize}
    {gap}
    inline={true}
    bind:page
    bind:loading
    bind:gifs
    on:click={async ({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id, q, locale })
    }}
  />
  <div class="row">
    <button
      type="button"
      on:click={() => {
        dispatch('close')
      }}>Close</button
    >
    <input
      type="search"
      placeholder="Search Tenor"
      bind:value={q}
      bind:this={input}
    />
  </div>
</div>

<style lang="scss">
  .mobile-keyboard {
    display: flex;
    flex-direction: column;
    gap: var(--gap, 4px);
    max-height: 100%;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--column, 140px);
  }

  .spinner {
    width: 2em;
    height: 2em;
    background-image: linear-gradient(to right, purple, tomato);
    animation: spin 2s infinite cubic-bezier(0.6, -0.5, 0.3, 1.8);
    border-radius: 0.5em;
  }

  .row {
    display: flex;
    gap: var(--gap, 4px);

    > input {
      flex: 1;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(720deg);
    }
  }
</style>
