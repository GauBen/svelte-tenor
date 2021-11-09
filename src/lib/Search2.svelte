<script lang="ts">
  import type { Gif, SearchOptions, SearchResult } from './api'
  import { search } from './api'
  import Grid from './Grid2.svelte'

  /** Tenor API key. */
  export let key: SearchOptions['key']
  /** Search term. */
  export let q: SearchOptions['q']
  /** Search locale. */
  export let locale: SearchOptions['locale']
  /** Safety filter. */
  export let safe: SearchOptions['safe']
  /** Aspect ratio filter. */
  export let ratio: SearchOptions['ratio']
  /** Number of results pe page. */
  export let limit: SearchOptions['limit']

  /** Number of pages to display. */
  export let page = 1

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
  export let gifs: Array<Gif> | undefined

  /** Latest search performed. */
  let latestSearch: Promise<SearchResult> | undefined

  /** Pages loaded and cached. */
  let pages: Array<SearchResult> = []

  /** Performs a search when the search term or the number of pages changes. */
  let update = async () => {
    while (pages.length < page) {
      loading = true
      let localSearch = search({
        key,
        q,
        locale,
        safe,
        ratio,
        limit,
        page: pages[pages.length - 1]?.next,
      })
      latestSearch = localSearch
      // Wait for the search to finish
      let page = await localSearch
      // If the current search is not the latest one
      // (the change term changed in between), ignore the result
      if (latestSearch !== localSearch) return
      // Otherwise, add the page at the end of the cache
      pages = [...pages, page]
    }
    // Update the grid
    gifs = pages.slice(0, page).flatMap(({ results }) => results)
    loading = false
  }

  // Reset the number of pages and the cache when the search term changes
  $: {
    q
    page = 1
    pages = []
  }

  // Perform a search when the search term or the number of pages changes
  $: {
    q
    page
    update()
  }
</script>

{#if gifs !== undefined}
  <Grid {gifs} on:click />
{/if}
