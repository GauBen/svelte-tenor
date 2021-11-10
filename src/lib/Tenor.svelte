<script lang="ts">
  import type { Gif } from './api'
  import { createEventDispatcher } from 'svelte'
  import { registerShare } from './raw-api'
  import Autocomplete from './Autocomplete.svelte'
  import Search from './Search.svelte'

  export let key: string
  export let showAutocomplete = false
  export let q = ''
  let page = 1

  const dispatch = createEventDispatcher<{ click: Gif }>()
</script>

<div class="keyboard">
  <input type="search" bind:value={q} />
  {#if showAutocomplete}
    <Autocomplete
      {key}
      {q}
      on:click={(event) => (q = event.detail)}
      scroll={true}
    />
  {/if}
  <Search
    {key}
    {q}
    bind:page
    on:click={async ({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id, q: q })
    }}
  />
  <button on:click={() => page++}>Load more</button>
</div>

<style>
  input {
    width: 100%;
    margin-bottom: 8px;
  }
</style>
