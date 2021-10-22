<script lang="ts">
  import type { GifObject } from './api'
  import { createEventDispatcher } from 'svelte'
  import { registerShare } from './api'
  import Autocomplete from './Autocomplete.svelte'
  import Search from './Search.svelte'
  import Trending from './Trending.svelte'

  export let key: string
  export let showAutocomplete = false
  export let value = ''
  let n = 1

  const dispatch = createEventDispatcher<{ click: GifObject }>()
</script>

<div class="keyboard">
  <input type="search" bind:value />
  {#if showAutocomplete}
    <Autocomplete
      {key}
      q={value}
      on:click={(event) => (value = event.detail)}
      scroll={true}
    />
  {/if}
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
</div>

<style>
  input {
    width: 100%;
    margin-bottom: 8px;
  }
</style>
