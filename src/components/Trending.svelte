<script lang="ts">
  import type { GifObject } from '../api'
  import { onMount } from 'svelte'
  import { trending } from '../api'
  import Grid from './Grid.svelte'

  let pages: Array<{
    next: string
    results: GifObject[]
  }> = []

  $: gifs = pages.flatMap(({ results }) => results)

  onMount(async () => {
    const gifs = await trending()
    pages = [...pages, gifs]
  })
</script>

<Grid {gifs} />
