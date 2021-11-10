<script lang="ts">
  import type { Gif, SearchOptions, ResultPage } from './api'
  import { trending } from './api'
  import Grid from './Grid.svelte'

  /** Tenor API key. */
  export let key: SearchOptions['key']
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

  /** Latest request performed. */
  let latestRequest: Promise<ResultPage> | undefined

  /** Pages loaded and cached. */
  let pages: Array<ResultPage> = []

  /** Performs a search when the search term or the number of pages changes. */
  let update = async () => {
    while (pages.length < page) {
      loading = true
      let localRequest = trending({
        key,
        locale,
        quality,
        safety,
        ratio,
        limit,
        page: pages[pages.length - 1]?.next,
      })
      latestRequest = localRequest
      // Wait for the search to finish
      let page = await localRequest
      // If the current search is not the latest one
      // (the change term changed in between), ignore the result
      if (latestRequest !== localRequest) return
      // Otherwise, add the page at the end of the cache
      pages = [...pages, page]
    }
    // Update the grid
    gifs = pages.slice(0, page).flatMap(({ results }) => results)
    loading = false
  }

  // Perform a search when the search term or the number of pages changes
  $: {
    page
    update()
  }
</script>

{#if gifs !== undefined}
  <Grid {gifs} on:click />
{/if}
