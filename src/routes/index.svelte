<script lang="ts">
  import type { Gif as GifObject } from '$lib/api'
  import { Tenor, Gif } from '$lib'
  import { tick } from 'svelte'

  let messages: Array<
    { gif: true; body: GifObject } | { gif: false; body: string }
  > = [{ gif: false, body: 'Hello World!' }]
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
</script>

<svelte:head><title>svelte-tenor</title></svelte:head>

<main>
  <h1>svelte-tenor</h1>

  <div class="phone">
    <div class="messages" bind:this={div}>
      {#each messages as message}
        <div class="message" class:text={!message.gif}>
          {#if message.gif}
            <Gif gif={message.body} />
          {:else}
            {message.body}
          {/if}
        </div>
      {/each}
    </div>
    {#if gifKeyboard}
      <div class="keyboard">
        <Tenor
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
        <button>▶</button>
      </form>
    {/if}
  </div>
  <footer>
    <p><a href="./storybook/" rel="external">Check out the storybook</a></p>
  </footer>
</main>

<style lang="scss">
  main {
    font-family: system-ui, sans-serif;
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
    max-width: 360px;
    height: 640px;
    margin: 2em auto;
    padding: 1em;
    border-radius: 1em;
    box-shadow: 0 0 2em #ccc8;
  }

  .messages {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5em;
    flex: 1;
    overflow: auto;
  }

  .message:first-child {
    margin-top: auto;
  }

  .message {
    max-width: 80%;
    max-height: 12em;
  }

  .message.text {
    background-color: #ccc;
    padding: 0.5em 0.75em;
    border-radius: 1em;
  }

  .message :global(.gif-video) {
    border-radius: 1em;
  }

  .keyboard {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  .form {
    display: flex;
    gap: 0.5em;
  }

  .text-input {
    flex: 1;
  }
</style>
