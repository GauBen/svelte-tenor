<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { SuggestionOptions } from './api'
  import { trendingTerms } from './api'
  import Terms from './Terms.svelte'

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
  <Terms {terms} {scroll} on:click />
{/if}
