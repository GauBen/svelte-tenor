<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'
  import type { SuggestionOptions } from './api'
  import { trendingTerms } from './api'
  import Term from './Term.svelte'

  /** Tenor API key. */
  export let key: SuggestionOptions['key']
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

  trendingTerms({ key, locale, limit }).then((response) => {
    terms = response
    loading = false
  })

  const dispatch = createEventDispatcher<{ click: string }>()
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
