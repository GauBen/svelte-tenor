<script lang="ts">
  import { trending } from './api'
</script>

{#await trending()}
  Chargement...
{:then { results }}
  {#each results as result}
    <video
      autoplay
      loop
      muted
      playsinline
      width={result.media[0].webm.dims[0]}
      height={result.media[0].webm.dims[1]}
      poster={result.media[0].webm.preview}
    >
      <source src={result.media[0].webm.url} type="video/webm" />
      <source src={result.media[0].mp4.url} type="video/mp4" />
    </video><br />
  {/each}
{/await}

<style lang="scss">
  video {
    background: linear-gradient(to right, purple, tomato);
  }
</style>
