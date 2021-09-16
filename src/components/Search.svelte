<script lang="ts">
  import type { GifObject } from '../api'
  import { search } from '../api'
  import Grid from './Grid.svelte'

  export let key: string
  export let limit = 20
  export let q: string

  /** Number of pages to load. */
  export let n = 1

  let pages: Array<{
    next: string
    results: GifObject[]
  }> = []

  // eslint-disable-next-line no-empty-pattern
  const loadPage = async ({}) => {
    while (n > pages.length) {
      const page = await search({
        q,
        key,
        limit,
        ...(pages.length > 0 ? { pos: pages[pages.length - 1].next } : {}),
      })
      pages = [...pages, page]
    }
  }

  $: {
    q
    n = 1
    pages = []
  }
  $: loadPage({ n, q })
  $: gifs = pages.slice(0, n).flatMap(({ results }) => results)
</script>

<Grid {gifs} on:click />
