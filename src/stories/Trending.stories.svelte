<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Trending from '../lib/Trending.svelte'

  let page = 1
  let loading = false
</script>

<Meta
  title="Components/Trending"
  component={Trending}
  argTypes={{
    key: { control: { type: 'text' }, defaultValue: 'LIVDSRZULELA' },
    locale: { control: { type: 'text' }, defaultValue: 'en_US' },
    quality: {
      options: ['low', 'medium', 'high'],
      control: { type: 'inline-radio' },
      defaultValue: 'medium',
    },
    safety: {
      options: ['off', 'low', 'medium', 'high'],
      control: { type: 'inline-radio' },
      defaultValue: 'off',
    },
    ratio: {
      options: ['all', 'wide', 'standard'],
      control: { type: 'inline-radio' },
      defaultValue: 'all',
    },
    limit: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
      defaultValue: 20,
    },
    columnSize: {
      control: { type: 'range', min: 10, max: 360, step: 1 },
      defaultValue: 160,
    },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      defaultValue: 8,
    },
    onClick: { action: {} },
  }}
/>

<Story id="trending" name="Trending" args={{ limit: 4 }} let:args>
  <Trending
    {...args}
    {page}
    bind:loading
    on:click={({ detail }) => args.onClick(detail)}
  />
  <p class="more">
    <button on:click={() => page++} disabled={loading}>Load more</button>
  </p>
</Story>

<style>
  .more {
    text-align: center;
  }
  .more > button {
    padding: 1em;
  }
</style>
