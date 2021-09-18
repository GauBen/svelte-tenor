<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import TrendingTerms from './TrendingTerms.svelte'
</script>

<Meta
  title="Components/TrendingTerms"
  component={TrendingTerms}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    scroll: { control: { type: 'boolean' } },
    onClick: { action: {} },
  }}
/>

<Story
  name="Basic"
  args={{ key: 'LIVDSRZULELA', limit: 20, scroll: false }}
  let:args
>
  <TrendingTerms {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
