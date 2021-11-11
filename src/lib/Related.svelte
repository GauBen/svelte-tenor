<script lang="ts">
  import type { SuggestionOptions } from './api'
  import { createEventDispatcher } from 'svelte'
  import { related } from './api'
  import Term from './Term.svelte'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'

  /** Tenor API key. */
  export let key: SuggestionOptions['key']
  /** Search term. */
  export let q: SuggestionOptions['q']
  /** Search locale. */
  export let locale: SuggestionOptions['locale'] = undefined
  /** Number of results. */
  export let limit: SuggestionOptions['limit'] = undefined

  /** Keeps the buttons on one line instead of wrapping. */
  export let scroll = false

  /**
   * Is the request in progress?
   *
   * @readonly
   */
  export let loading = true
  /**
   * Terms displayed.
   *
   * @readonly
   */
  export let terms: string[] | undefined = undefined

  /** Latest request performed. */
  let latestRequest: Promise<string[]> | undefined

  /** Fetches suggestions. */
  const update = async () => {
    loading = true
    let localRequest = related({ key, q, locale, limit })
    latestRequest = localRequest
    let results = await localRequest
    // If the current search is not the latest one
    // (the change term changed in between), ignore the result
    if (latestRequest !== localRequest) return
    terms = results
    loading = false
  }

  const dispatch = createEventDispatcher<{ click: string }>()

  $: {
    q
    update()
  }
</script>

{#if terms !== undefined}
  <div class="terms" class:scroll>
    {#each terms as term (term)}
      <span
        animate:flip={{ duration: 100 }}
        transition:fade={{ duration: 100 }}
      >
        <Term {term} on:click={() => dispatch('click', term)} />
      </span>
    {/each}
  </div>
{/if}

<style lang="scss">
  .terms {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;

    &.scroll {
      flex-wrap: nowrap;
      overflow: auto;
    }
  }
</style>
