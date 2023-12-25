<script lang="ts">
  import { PUBLIC_TENOR_KEY } from "$env/static/public";
  import Featured from "$lib/Featured.svelte";
  import Search from "$lib/Search.svelte";

  let q = $state("cat");
</script>

<input type="text" bind:value={q} />

{#if q}
  <Search
    {q}
    key={PUBLIC_TENOR_KEY}
    media_filter="tinywebp_transparent,tinygif"
  />
{:else}
  <Featured
    key={PUBLIC_TENOR_KEY}
    media_filter="tinywebp_transparent,tinygif"
  />
{/if}
