<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { categories } from '../api'

  export let key: string

  const dispatch = createEventDispatcher<{ click: string }>()
</script>

{#await categories({ key }) then { tags }}
  <div class="tags">
    {#each tags as tag}
      <button
        style="background-image: linear-gradient(to bottom, #0003, #0004, #0008), url({tag.image})"
        class="tag"
        on:click={() => dispatch('click', tag.searchterm)}
      >
        {tag.searchterm}
      </button>
    {/each}
  </div>
{/await}

<style>
  .tags {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5em;
  }

  button {
    background-size: cover;
    border: 0;
    border-radius: 0.25em;
    padding: 3em 1em;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 0.25em #000;
  }
</style>
