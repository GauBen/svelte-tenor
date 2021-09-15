<script lang="ts">
  import Autocomplete from './components/Autocomplete.svelte'
  import Search from './components/Search.svelte'
  import Trending from './components/Trending.svelte'
  export let key
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
