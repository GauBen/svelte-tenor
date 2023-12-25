<script lang="ts">
  import { featured } from "$lib/raw-api.js";
  import Gif from "./Gif.svelte";

  const { ...params } = $props<Parameters<typeof featured>[0]>();
</script>

{#await featured(params) then { results }}
  <div>
    {#each results as result}
      {@const best =
        result.media_formats.tinywebp_transparent ??
        result.media_formats.tinygif!}
      <Gif
        url={best.url}
        dims={best.dims}
        description={result.content_description}
      />
    {/each}
  </div>
{:catch error}
  {@debug error}
{/await}

<style lang="scss">
  div {
    display: flex;
    flex-wrap: wrap;
  }
</style>
