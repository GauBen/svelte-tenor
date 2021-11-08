<script lang="ts">
  // import type { CommonResults } from './api'
  import { search } from './api'
  import Grid from './Grid2.svelte'

  export let key: string
  export let q: string
</script>

{#await search({ key, q }) then { results }}
  <Grid gifs={results} on:click />
{/await}
