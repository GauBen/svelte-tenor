<script lang="ts">
  import type { GifObject } from '../api'
  import { trending } from '../api'
  import Grid from './Grid.svelte'

  /** Number of pages to load. */
  export let n = 1

  let pages: Array<{
    next: string
    results: GifObject[]
  }> = []

  const loadPage = async (n: number) => {
    while (n > pages.length) {
      const page = await trending({
        key: 'LIVDSRZULELA',
        limit: 4,
        ...(pages.length > 0 ? { pos: pages.at(-1).next } : {}),
      })
      pages = [...pages, page]
    }
  }

  $: loadPage(n)
  $: gifs = pages.slice(0, n).flatMap(({ results }) => results)
</script>

<Grid {gifs} />
