<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Categories from '../lib/Categories.svelte'
</script>

<Meta
  title="Components/Categories"
  component={Categories}
  argTypes={{
    key: { control: { type: 'text' }, defaultValue: 'LIVDSRZULELA' },
    type: {
      options: ['featured', 'trending'],
      control: { type: 'inline-radio' },
      defaultValue: 'featured',
    },
    locale: { control: { type: 'text' }, defaultValue: 'en_US' },
    safety: {
      options: ['off', 'low', 'medium', 'high'],
      control: { type: 'inline-radio' },
      defaultValue: 'off',
    },
    columnSize: {
      control: { type: 'range', min: 10, max: 360, step: 1 },
      defaultValue: 140,
    },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      defaultValue: 8,
    },
    onClick: { action: {} },
  }}
/>

<Story id="categories" name="Categories" let:args>
  <Categories {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
