<script lang="ts">
  import { search } from "$lib/raw-api.js";
  import Grid from "./Grid.svelte";

  const { ...params } = $props<Parameters<typeof search>[0]>();

  let grid = $state<Grid>();
  $effect(() => {
    grid?.scrollToStart();
  });
</script>

{#await search(params) then { results }}
  <Grid
    bind:this={grid}
    gifs={results.map(({media_formats, content_description}) => {
      const best = media_formats.tinywebp_transparent ?? media_formats.tinygif!;
      return {
        src: best.url,
        alt: content_description,
        width: best.dims[0],
        height: best.dims[1],
      };
    })}
    onclick={(gif) => console.log(gif)}
  />
{:catch error}
  {@debug error}
{/await}
