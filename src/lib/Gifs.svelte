<script lang="ts">
  import type { GifObject } from './raw-api'
  import { gifs } from './raw-api'
  import Grid from './Grid.svelte'

  export let key: string
  export let limit = 20
  export let ids: string[]

  /** Number of pages to load. */
  export let n = 1

  let pages: Array<{
    next: string
    results: GifObject[]
  }> = []

  // eslint-disable-next-line no-empty-pattern
  const loadPage = async ({}) => {
    while (n > pages.length) {
      const page = await gifs({
        ids: ids.join(','),
        key,
        limit,
        ...(pages.length > 0 ? { pos: pages[pages.length - 1].next } : {}),
      })
      pages = [...pages, page]
    }
  }

  $: {
    ids
    n = 1
    pages = []
  }
  $: loadPage({ n, ids })
</script>

<Grid gifs={pages.slice(0, n).flatMap(({ results }) => results)} on:click />
