<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Categories from '../lib/Categories.svelte'
</script>

<Meta
  title="Components/Categories"
  component={Categories}
  argTypes={{
    key: { control: { type: 'text' } },
    onClick: { action: {} },
  }}
/>

<Story name="Basic" args={{ key: 'LIVDSRZULELA' }} let:args>
  <Categories {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
