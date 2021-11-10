<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Trending from '../lib/Trending2.svelte'

  let page = 1
</script>

<Meta
  title="Components/Trending"
  component={Trending}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    onClick: { action: {} },
  }}
/>

<Story name="Basic" args={{ key: 'LIVDSRZULELA', limit: 20 }} let:args>
  <Trending {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>

<Story name="Load more" args={{ key: 'LIVDSRZULELA', limit: 4 }} let:args>
  <Trending {...args} {page} on:click={({ detail }) => args.onClick(detail)} />
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
</style>
