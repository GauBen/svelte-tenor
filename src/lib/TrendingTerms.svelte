<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
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

  /** Set `retry` to true to retry the last request. */
  export let retry = false
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

  const dispatch = createEventDispatcher<{ click: string; error: Error }>()

  const update = async () => {
    terms = await trendingTerms({ key, locale, limit })
    loading = false
  }

  $: if (mounted || retry) {
    retry = false
    update().catch((error: Error) => {
      // If the request fails, tell the parent component
      terms = undefined
      dispatch('error', error)
    })
  }

  let mounted = false
  onMount(async () => {
    mounted = true
  })
</script>

{#if terms !== undefined}
  <Terms {terms} {scroll} on:click />
{/if}
