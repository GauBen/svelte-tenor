<script lang="ts">
  import type { Gif, SearchOptions } from './api'
  import { createEventDispatcher } from 'svelte'
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
  /** Number of results pe page. */
  export let limit: SearchOptions['limit'] = undefined

  /** Number of pages to display. */
  export let page = 1

  /** Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`. */
  export let columnSize: number | undefined = undefined
  /** Gap between GIFs, in pixels. */
  export let gap: number | undefined = undefined

  /**
   * Is the search in progress?
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

  const dispatch = createEventDispatcher<{ click: Gif }>()
</script>

<div class="keyboard">
  <input type="search" bind:value={q} placeholder="Search Tenor" />
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
    bind:page
    bind:loading
    bind:gifs
    on:click={async ({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id, q, locale })
    }}
  />
  <button on:click={() => page++}>Load more</button>
</div>

<style>
  input {
    width: 100%;
    margin-bottom: 8px;
  }
</style>
