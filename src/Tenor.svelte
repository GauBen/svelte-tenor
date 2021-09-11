<script lang="ts">
  import { trending, search } from './api'

  let value = ''
</script>

<input type="text" bind:value />
{#if value === ''}
  {#await trending()}
    Chargement...
  {:then { results }}
    <div class="gifs">
      {#each results as result}
        <video
          autoplay
          loop
          muted
          playsinline
          width={result.media[0].webm.dims[0]}
          height={result.media[0].webm.dims[1]}
          poster={result.media[0].webm.preview}
          style={`grid-row-end: span ${Math.ceil(
            (260 * result.media[0].webm.dims[1]) /
              result.media[0].webm.dims[0] /
              16
          )}`}
        >
          <source src={result.media[0].webm.url} type="video/webm" />
          <source src={result.media[0].mp4.url} type="video/mp4" />
        </video>
      {/each}
    </div>
  {/await}
{:else}
  {#await search(value)}
    Chargement...
  {:then { results }}
    <div class="gifs">
      {#each results as result}
        <video
          autoplay
          loop
          muted
          playsinline
          width={result.media[0].webm.dims[0]}
          height={result.media[0].webm.dims[1]}
          poster={result.media[0].webm.preview}
          style={`grid-row-end: span ${Math.ceil(
            (260 * result.media[0].webm.dims[1]) /
              result.media[0].webm.dims[0] /
              16
          )}`}
        >
          <source src={result.media[0].webm.url} type="video/webm" />
          <source src={result.media[0].mp4.url} type="video/mp4" />
        </video>
      {/each}
    </div>
  {/await}
{/if}

<style lang="scss">
  video {
    background: linear-gradient(to right, purple, tomato);
    max-width: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .gifs {
    display: grid;
    grid-template-columns: repeat(auto-fill, 260px);
    grid-auto-rows: 8px;
    align-items: stretch;
    gap: 8px;
  }
</style>
