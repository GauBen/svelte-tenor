<script lang="ts">
  import { registerShare } from './api'
  import Autocomplete from './Autocomplete.svelte'
  import Search from './Search.svelte'
  import Trending from './Trending.svelte'

  export let key: string
  let value = ''
</script>

<input type="search" bind:value />
<Autocomplete {key} q={value} on:click={(event) => (value = event.detail)} />
{#if value === ''}
  <Trending
    {key}
    on:click={async ({ detail }) => {
      console.log(await registerShare({ key, id: detail.id }))
    }}
  />
{:else}
  <Search
    {key}
    q={value}
    on:click={async ({ detail }) => {
      console.log(await registerShare({ key, id: detail.id, q: value }))
    }}
  />
{/if}

<style>
  input {
    width: 100%;
  }
</style>
