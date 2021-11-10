<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Random from '../lib/Random.svelte'

  let page = 1
  let q = 'david goodenough'
</script>

<Meta
  title="Components/Random"
  component={Random}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    onClick: { action: {} },
  }}
/>

<Story
  name="Basic"
  args={{ key: 'LIVDSRZULELA', limit: 20, q: 'david goodenough' }}
  let:args
>
  <Random {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>

<Story
  name="Load more"
  args={{ key: 'LIVDSRZULELA', limit: 4, q: 'david goodenough' }}
  let:args
>
  <Random {...args} {page} on:click={({ detail }) => args.onClick(detail)} />
  <div class="more"><button on:click={() => page++}>Load more</button></div>
</Story>

<Story name="Reactivity" args={{ key: 'LIVDSRZULELA', limit: 4 }} let:args>
  <input type="search" bind:value={q} />
  <Random
    {...args}
    {q}
    bind:page
    on:click={({ detail }) => args.onClick(detail)}
  />
  <div class="more"><button on:click={() => page++}>Load more</button></div>
</Story>

<style>
  .more {
    margin: 1em 0;
    text-align: center;
  }
  .more > button {
    padding: 1em;
  }
  [type='search'] {
    margin: 1em 0;
    width: 100%;
    max-width: 100%;
  }
</style>
