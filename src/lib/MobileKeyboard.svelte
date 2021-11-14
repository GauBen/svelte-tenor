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

  /** Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`. */
  export let columnSize: number | undefined = undefined
  /**
   * Gap between elements, in pixels.
   *
   * @default 4px
   */
  export let gap = 4

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

  let input: HTMLInputElement | undefined

  const dispatch = createEventDispatcher<{ click: Gif; close: void }>()

  onMount(() => {
    if (input) input.focus()
  })
</script>

<div class="mobile-keyboard" style="--gap: {gap}px">
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
  <form class="row" on:submit|preventDefault>
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
  </form>
</div>

<style lang="scss">
  .mobile-keyboard {
    display: flex;
    flex-direction: column;
    gap: var(--gap, 4px);
    max-height: 100%;
  }

  .row {
    display: flex;
    gap: var(--gap, 4px);

    > input {
      flex: 1;
    }
  }
</style>
