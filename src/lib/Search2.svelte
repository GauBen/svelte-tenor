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

  /**
   * Is the search in progress?
   *
   * @readonly
   */
  export let loading = false
  /** Number of pages to display. */
  export let page = 1

  /** Latest search performed. */
  let currentSearch: Promise<SearchResult> | undefined

  /** Pages loaded and cached. */
  let pages: Array<SearchResult> = []
  let gifs: Array<Gif> | undefined

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
      currentSearch = localSearch
      let page = await localSearch
      if (currentSearch !== localSearch) return
      pages = [...pages, page]
    }
    gifs = pages.slice(0, page).flatMap(({ results }) => results)
    loading = false
  }

  $: {
    q
    page = 1
    pages = []
  }

  $: {
    q
    page
    update()
  }
</script>

{#if gifs !== undefined}
  <Grid {gifs} on:click />
{/if}
