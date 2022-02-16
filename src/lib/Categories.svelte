<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { SearchOptions } from './api'
  import { categories as categoriesApi } from './api'

  /** Tenor API key. */
  export let key: SearchOptions['key']
  /**
   * Category.
   *
   * @default `featured`
   */
  export let type: 'featured' | 'trending' | undefined = undefined
  /** Search locale. */
  export let locale: SearchOptions['locale'] = undefined
  /** Safety filter. */
  export let safety: SearchOptions['safety'] = undefined

  /**
   * Minimum column size, in pixels.
   *
   * @default 140
   */
  export let columnSize = 140
  /**
   * Gap between GIFs, in pixels.
   *
   * @default 8px
   */
  export let gap = 8

  /** Set `retry` to true to retry the last request. */
  export let retry = false
  /**
   * Is the request in progress?
   *
   * @readonly
   */
  export let loading = true
  /** @readonly */
  export let categories: Array<{ term: string; gif: string }> | undefined =
    undefined

  const dispatch = createEventDispatcher<{ click: string; error: Error }>()

  const update = async () => {
    categories = await categoriesApi({ key, type, locale, safety })
    loading = false
  }

  $: if (mounted || retry) {
    retry = false
    update().catch((error: Error) => {
      // If the request fails, tell the parent component
      categories = undefined
      dispatch('error', error)
    })
  }

  let mounted = false
  onMount(async () => {
    mounted = true
  })
</script>

{#if categories !== undefined}
  <div class="categories" style:--column="{columnSize}px" style:--gap="{gap}px">
    {#each categories as { term, gif }}
      <button
        style:background-image="linear-gradient(to bottom, #0003, #0004, #0008),
        url({gif})"
        on:click={() => dispatch('click', term)}
      >
        {term}
      </button>
    {/each}
  </div>
{/if}

<style>
  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--column, 200px), 1fr));
    gap: var(--gap, 8px);
  }

  button {
    padding: 3em 1em;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 0.25em #000;
    background-color: #8888;
    background-position: center;
    background-size: cover;
    border: 0;
    border-radius: 0.25em;
  }
</style>
