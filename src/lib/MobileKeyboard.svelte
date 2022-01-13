<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { Gif, SearchOptions } from './api'
  import { registerShare } from './api'
  import Search from './Search.svelte'

  /** Tenor API key. */
  export let key: SearchOptions['key']
  /** Search term. */
  export let q: SearchOptions['q'] = ''
  /** Search locale. */
  export let locale: SearchOptions['locale'] = undefined
  /** Video quality filter. */
  export let quality: SearchOptions['quality'] = undefined
  /** Safety filter. */
  export let safety: SearchOptions['safety'] = undefined
  /** Aspect ratio filter. */
  export let ratio: SearchOptions['ratio'] = undefined
  /** Number of results per page. */
  export let limit: SearchOptions['limit'] = undefined

  /** Number of pages to display. */
  export let page = 1

  /**
   * Minimum size for each column, in pixels. The maximum size is `columnSize * 2 + gap`.
   *
   * @default 140px
   */
  export let columnSize = 140
  /**
   * Gap between elements, in pixels.
   *
   * @default 4px
   */
  export let gap = 4
  /**
   * Should the input be focused when mounted?
   *
   * @default true
   */
  export let autofocus = true
  /** Keyboard messages. */
  export let messages: {
    /** Text displayed in the search field when empty. */
    placeholder: string
    /** Text in the Close button. Set to `false` to hide the button. */
    close: string | false
    /**
     * What error should be displayed?
     *
     * - `false`: No error at all
     * - `true`: Original error message
     * - `string`: Custom error message
     */
    error: string | boolean
    /** Text in the Retry button. Set to `false` to hide the button. */
    retry: string | false
  } = {
    placeholder: 'Search Tenor',
    close: 'Close',
    error: 'Tenor is currently unavailable',
    retry: 'Retry',
  }

  /**
   * Is the request in progress?
   *
   * @readonly
   */
  export let loading = true
  /**
   * GIFs displayed in the grid.
   *
   * @readonly
   */
  export let gifs: Array<Gif> | undefined = undefined

  // Handle errors and retries
  let error: Error | undefined
  let retry = false

  const dispatch = createEventDispatcher<{ click: Gif; close: void }>()

  let input: HTMLInputElement | undefined
  onMount(() => {
    if (input && autofocus) input.focus()
  })
</script>

<div
  class="mobile-keyboard"
  style:--column="{columnSize}px"
  style:--gap="{gap}px"
>
  {#if gifs === undefined}
    {#if error !== undefined}
      <div class="placeholder">
        {#if messages.error === true}
          {error.message}
        {:else if messages.error !== false}
          {messages.error}
        {/if}
        {#if messages.retry !== false}
          <button
            type="button"
            on:click={() => {
              error = undefined
              retry = true
            }}
          >
            {messages.retry}
          </button>
        {/if}
      </div>
    {:else}
      <div class="placeholder">
        <div class="spinner" aria-label="Loading" />
      </div>
    {/if}
  {/if}
  <Search
    {key}
    {q}
    {locale}
    {quality}
    {safety}
    {ratio}
    {limit}
    {columnSize}
    {gap}
    inline={true}
    bind:page
    bind:loading
    bind:gifs
    bind:retry
    on:click={({ detail }) => {
      dispatch('click', detail)
      void registerShare({ key, id: detail.id, q, locale })
    }}
    on:error={({ detail }) => {
      error = detail
    }}
  />
  <div class="row">
    {#if messages.close !== false}
      <button
        type="button"
        on:click={() => {
          dispatch('close')
        }}
      >
        {messages.close}
      </button>
    {/if}
    <input
      type="search"
      placeholder={messages.placeholder}
      bind:value={q}
      bind:this={input}
    />
  </div>
</div>

<style lang="scss">
  .mobile-keyboard {
    display: flex;
    flex-direction: column;
    gap: var(--gap, 4px);
    max-height: 100%;
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
    height: var(--column, 140px);
  }

  .spinner {
    width: 2em;
    height: 2em;
    background-image: linear-gradient(to right, purple, tomato);
    border-radius: 0.5em;
    animation: spin 2s infinite cubic-bezier(0.6, -0.5, 0.3, 1.8);
  }

  .row {
    display: flex;
    gap: var(--gap, 4px);

    > input {
      flex: 1;
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(720deg);
    }
  }
</style>
