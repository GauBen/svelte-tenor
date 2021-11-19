<script lang="ts">
  import { Gif, MobileKeyboard } from '$lib'
  import type { Gif as GifObject } from '$lib/api'
  import { onMount, tick } from 'svelte'

  /** Show desktop interface */
  let fullscreen = true

  let messages: Array<
    { gif: true; body: GifObject } | { gif: false; body: string }
  > = []
  let gifKeyboard = false
  let value = ''

  let div: HTMLElement

  // Whenever messages or gifKeyboard is updated, scroll to bottom
  $: {
    messages
    gifKeyboard
    tick().then(() => {
      div?.scrollTo({ top: div.scrollHeight })
    })
  }

  onMount(() => {
    fullscreen = window.matchMedia('(max-width: 600px)').matches
  })
</script>

<svelte:head><title>svelte-tenor</title></svelte:head>

<main class:desktop={!fullscreen}>
  {#if !fullscreen}
    <h1>svelte-tenor</h1>
  {/if}

  <div class="phone">
    <div class="center">
      <label for="fullscreen">
        <input id="fullscreen" type="checkbox" bind:checked={fullscreen} />
        Fullscreen view
      </label>
    </div>
    <div class="messages" bind:this={div}>
      <div class="message text">
        <a href="https://github.com/gauben/svelte-tenor" rel="external">
          Back to GitHub
        </a>
      </div>
      <div class="message text">
        <a
          href="https://gauben.github.io/svelte-tenor/storybook/"
          rel="external"
        >
          Check out the storybook!
        </a>
      </div>
      {#each messages as message}
        {#if message.gif}
          <div class="message"><Gif gif={message.body} /></div>
        {:else}
          <div class="message text">{message.body.replaceAll('  ', '  ')}</div>
        {/if}
      {/each}
    </div>
    {#if gifKeyboard}
      <div class="keyboard">
        <MobileKeyboard
          key="OY94CH1Q77WO"
          bind:q={value}
          on:click={({ detail }) => {
            messages = [...messages, { gif: true, body: detail }]
            gifKeyboard = false
            value = ''
          }}
          on:close={() => {
            gifKeyboard = false
          }}
        />
      </div>
    {:else}
      <form
        on:submit|preventDefault={() => {
          if (!value) return
          messages = [...messages, { gif: false, body: value }]
          value = ''
        }}
        class="form"
      >
        <button
          type="button"
          on:click={() => {
            gifKeyboard = true
          }}>GIF</button
        >
        <input type="text" class="text-input" bind:value />
        <button class="icon">▶</button>
      </form>
    {/if}
  </div>
  {#if !fullscreen}
    <footer>
      <p>
        Made with 🧡 and Svelte by <a href="https://gautier.dev">Gautier</a>
      </p>
    </footer>
  {/if}
</main>

<style lang="scss">
  :global {
    *,
    ::before,
    ::after {
      box-sizing: inherit;
    }

    body {
      box-sizing: border-box;
      margin: 0;
      font-family: system-ui, sans-serif;
    }
  }

  h1,
  footer {
    text-align: center;
  }

  a {
    color: #000;
  }

  .phone {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100vh;
    padding: 1em;
    overflow: hidden;
  }

  .desktop > .phone {
    max-width: 360px;
    height: 640px;
    margin: 1em auto;
    padding: 1em;
    border-radius: 1em;
    box-shadow: 0 0 2em #ccc8;
  }

  .center {
    text-align: center;
  }

  .messages {
    display: flex;
    flex-basis: 0%;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5em;
    align-items: flex-end;
    overflow: auto;
  }

  .message {
    display: flex;
    justify-content: end;
    max-width: 80%;
    max-height: 12em;

    &:first-child {
      margin-top: auto;
    }

    &.text {
      padding: 0.5em 0.75em;
      background-color: #ccc;
      border-radius: 1em;
    }

    > :global(*) {
      border-radius: 1em;
    }
  }

  .keyboard {
    max-height: 50%;
  }

  .form {
    display: flex;
    gap: 0.25em;
  }

  .text-input {
    flex: 1;
  }

  .icon {
    font-size: 0.75em;
  }
</style>
