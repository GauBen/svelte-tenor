<script lang="ts">
  import { onMount } from 'svelte'
  import type { Gif, ResultPage, SearchOptions } from './api'
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
  /** Number of results per page. */
  export let limit: SearchOptions['limit'] = undefined

  /** Number of pages to display. */
  export let page = 1

  /** Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`. */
  export let columnSize: number | undefined = undefined
  /** Gap between GIFs, in pixels. */
  export let gap: number | undefined = undefined
  /** In-line, horizontal scrolling grid. */
  export let inline: boolean | undefined = undefined

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
  $: if (mounted) {
    page
    update()
  }

  let mounted = false
  onMount(() => {
    mounted = true
  })
</script>

{#if gifs !== undefined}
  <Grid {gifs} {columnSize} {gap} {inline} on:click />
{/if}
