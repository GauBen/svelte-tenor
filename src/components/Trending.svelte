<script lang="ts">
  import type { GifObject } from '../api'
  import { trending } from '../api'
  import Grid from './Grid.svelte'

  export let key: string
  export let limit = 20

  /** Number of pages to load. */
  export let n = 1

  let pages: Array<{
    next: string
    results: GifObject[]
  }> = []

  // eslint-disable-next-line no-empty-pattern
  const loadPage = async ({}) => {
    while (n > pages.length) {
      const page = await trending({
        key,
        limit,
        ...(pages.length > 0 ? { pos: pages[pages.length - 1].next } : {}),
      })
      pages = [...pages, page]
    }
  }

  $: loadPage({ n })
  $: gifs = pages.slice(0, n).flatMap(({ results }) => results)
</script>

<Grid {gifs} />
