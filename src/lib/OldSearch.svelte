<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Gif, ResultPage, SearchOptions } from "./api";
  import { search } from "./api";
  import Grid from "./Grid.svelte";

  /** Tenor API key. */
  export let key: SearchOptions["key"];
  /** Search term. */
  export let q: SearchOptions["q"];
  /** Search locale. */
  export let locale: SearchOptions["locale"] = undefined;
  /** Video quality filter. */
  export let quality: SearchOptions["quality"] = undefined;
  /** Safety filter. */
  export let safety: SearchOptions["safety"] = undefined;
  /** Aspect ratio filter. */
  export let ratio: SearchOptions["ratio"] = undefined;
  /** Number of results per page. */
  export let limit: SearchOptions["limit"] = undefined;

  /** Number of pages to display. */
  export let page = 1;

  /** Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`. */
  export let columnSize: number | undefined = undefined;
  /** Gap between GIFs, in pixels. */
  export let gap: number | undefined = undefined;
  /** In-line, horizontal scrolling grid. */
  export let inline: boolean | undefined = undefined;

  /** Set `retry` to true to retry the last request. */
  export let retry = false;
  /**
   * Is the request in progress?
   *
   * @readonly
   */
  export let loading = true;
  /**
   * GIFs displayed in the grid.
   *
   * @readonly
   */
  export let gifs: Array<Gif> | undefined = undefined;

  /** Latest request performed. */
  let latestRequest: Promise<ResultPage> | undefined;

  /** Pages loaded and cached. */
  let pages: Array<ResultPage> = [];

  const dispatch = createEventDispatcher<{ error: Error }>();

  /** Performs a search when the search term or the number of pages changes. */
  const update = async () => {
    while (pages.length < page) {
      loading = true;
      let localRequest = search({
        key,
        q,
        locale,
        quality,
        safety,
        ratio,
        limit,
        page: pages[pages.length - 1]?.next,
      });
      latestRequest = localRequest;
      // Wait for the search to finish
      let page = await localRequest;
      // If the current search is not the latest one
      // (the change term changed in between), ignore the result
      if (latestRequest !== localRequest) return;
      // Otherwise, add the page at the end of the cache
      pages = [...pages, page];
    }
    // Update the grid
    gifs = pages.slice(0, page).flatMap(({ results }) => results);
    loading = false;
  };

  // Reset the number of pages and the cache when the search term changes
  let resetPosition = false;
  $: {
    q;
    resetPosition = true;
    page = 1;
    pages = [];
  }

  // Perform a search when the search term or the number of pages changes
  $: if (mounted || retry) {
    q;
    page;
    retry = false;
    update().catch((error: Error) => {
      // If the request fails, tell the parent component
      gifs = undefined;
      dispatch("error", error);
    });
  }

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

{#if gifs !== undefined && gifs.length > 0}
  <Grid {gifs} {columnSize} {gap} {inline} bind:resetPosition on:click />
{/if}
