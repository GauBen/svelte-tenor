<script lang="ts">
  import type { Gif, SearchResult } from './api'
  import { search } from './api'
  import Grid from './Grid2.svelte'

  export let key: string
  export let q: string

  export let pageLoading = false
  export let n = 1

  let currentSearch: Promise<SearchResult> | undefined
  let pages: Array<SearchResult> = []
  let gifs: Array<Gif> | undefined

  let update = async () => {
    pageLoading = pages.length >= 1
    while (pages.length < n) {
      let pos = pages.length === 0 ? {} : { pos: pages[pages.length - 1].next }
      let localSearch = search({ key, q, ...pos })
      currentSearch = localSearch
      let page = await localSearch
      if (currentSearch !== localSearch) return
      pages = [...pages, page]
    }
    gifs = pages.flatMap(({ results }) => results)
    pageLoading = false
  }

  $: {
    q
    n = 1
    pages = []
  }

  $: {
    q
    n
    update()
  }
</script>

{#if gifs !== undefined}
  <Grid {gifs} on:click />
{/if}
