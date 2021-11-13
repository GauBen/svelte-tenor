<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Search from '../lib/Search.svelte'

  let q = 'hello'
  let page = 1
  let loading = false
</script>

<Meta
  title="Components/Search"
  component={Search}
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
    inline: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    onClick: { action: {} },
  }}
/>

<Story id="search" name="Search" let:args>
  <p class="form"><input type="text" bind:value={q} /></p>
  <Search
    {...args}
    {q}
    {page}
    bind:loading
    on:click={({ detail }) => args.onClick(detail)}
  />
  <p class="more">
    <button on:click={() => page++} disabled={loading}>Load more</button>
  </p>
</Story>

<style>
  .form {
    display: flex;
  }
  .form > input {
    flex: 1;
    padding: 0.25em;
  }
  .more {
    text-align: center;
  }
  .more > button {
    padding: 1em;
  }
</style>
