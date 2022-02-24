<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { SuggestionOptions } from './api'
  import { related } from './api'
  import Terms from './Terms.svelte'

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

  /** Latest request performed. */
  let latestRequest: Promise<string[]> | undefined

  const dispatch = createEventDispatcher<{ error: Error }>()

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

  $: if (mounted || retry) {
    q
    retry = false
    update().catch((error: Error) => {
      // If the request fails, tell the parent component
      terms = undefined
      dispatch('error', error)
    })
  }

  let mounted = false
  onMount(() => {
    mounted = true
  })
</script>

{#if terms !== undefined && terms.length > 0}
  <Terms {terms} {scroll} on:click />
{/if}
