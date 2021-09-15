<script lang="ts">
  import { trending, search } from './api'
  import Gif from './components/Gif.svelte'

  let value = ''
</script>

<input type="text" bind:value />
{#if value === ''}
  {#await trending({ key: 'LIVDSRZULELA' })}
    Chargement...
  {:then { results }}
    <div class="gifs">
      {#each results as result (result.id)}
        <Gif medium={result.media[0]} formats={['webm', 'mp4']} />
      {/each}
    </div>
  {/await}
{:else}
  {#await search(value)}
    Chargement...
  {:then { results }}
    <div class="gifs">
      {#each results as result (result.id)}
        <Gif medium={result.media[0]} formats={['webm', 'mp4']} />
      {/each}
    </div>
  {/await}
{/if}

<style lang="scss">
  .gifs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-auto-rows: 8px;
    align-items: stretch;
    gap: 8px;
  }
</style>
