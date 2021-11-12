<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'

  export let terms: string[]
  export let scroll = false

  const dispatch = createEventDispatcher<{ click: string }>()

  const color = (str: string) => {
    let hash = 0xc0ffee
    for (const char of str) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0
    const red = ((hash & 0xff0000) >> 16) + 1
    const green = ((hash & 0x00ff00) >> 8) + 1
    const blue = (hash & 0x0000ff) + 1
    const l = 0.4 * red + 0.4 * green + 0.2 * blue
    const h = (n: number) =>
      Math.min(0xd0, Math.max(0x60, Math.floor((n * 0xd0) / l)))
        .toString(16)
        .padStart(2, '0')
    return `#${h(red)}${h(green)}${h(blue)}`
  }
</script>

<div class="terms" class:scroll>
  {#each terms as term (term)}
    <button
      style="background-color: {color(term)}"
      on:click={() => {
        dispatch('click', term)
      }}
      animate:flip={{ duration: 100 }}
      transition:fade={{ duration: 100 }}
    >
      {term}
    </button>
  {/each}
</div>

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

  button {
    border: 0;
    border-radius: 0.25em;
    padding: 0.5em;
    color: white;
    font-weight: bold;
    text-shadow: 0 0 0.25em #0008;
    box-shadow: 0 0 0.25em #8884;
    flex-shrink: 0;
  }
</style>
