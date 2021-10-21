<script lang="ts">
  import type { GifObject } from './api'
  import { createEventDispatcher } from 'svelte'
  import { registerShare } from './api'
  import Autocomplete from './Autocomplete.svelte'
  import Search from './Search.svelte'
  import Trending from './Trending.svelte'

  export let key: string
  let value = ''
  let n = 1

  const dispatch = createEventDispatcher<{ click: GifObject }>()
</script>

<input type="search" bind:value />
<Autocomplete {key} q={value} on:click={(event) => (value = event.detail)} />
{#if value === ''}
  <Trending
    {key}
    bind:n
    on:click={async ({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id })
    }}
  />
{:else}
  <Search
    {key}
    q={value}
    bind:n
    on:click={async ({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id, q: value })
    }}
  />
{/if}
<button on:click={() => n++}>Load more</button>

<style>
  input {
    width: 100%;
  }
</style>
