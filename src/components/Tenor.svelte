<script lang="ts">
  import Autocomplete from './Autocomplete.svelte'
  import Search from './Search.svelte'
  import Trending from './Trending.svelte'
  export let key: string
  let value = ''
</script>

<input type="search" bind:value />
<Autocomplete {key} q={value} on:click={(event) => (value = event.detail)} />
{#if value === ''}
  <Trending {key} />
{:else}
  <Search {key} q={value} />
{/if}

<style>
  input {
    width: 100%;
  }
</style>
