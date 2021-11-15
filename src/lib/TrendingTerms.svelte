<script lang="ts">
  import { onMount } from 'svelte'
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

  onMount(async () => {
    terms = await trendingTerms({ key, locale, limit })
    loading = false
  })
</script>

{#if terms !== undefined}
  <Terms {terms} {scroll} on:click />
{/if}
