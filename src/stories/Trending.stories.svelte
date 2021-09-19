<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Trending from '../lib/Trending.svelte'

  let n = 1
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
  <Trending {...args} {n} on:click={({ detail }) => args.onClick(detail)} />
  <div class="more"><button on:click={() => n++}>Load more</button></div>
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
