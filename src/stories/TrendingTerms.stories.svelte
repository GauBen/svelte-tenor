<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import TrendingTerms from '../lib/TrendingTerms.svelte'
</script>

<Meta
  title="Components/TrendingTerms"
  component={TrendingTerms}
  argTypes={{
    key: { control: { type: 'text' }, defaultValue: 'LIVDSRZULELA' },
    locale: { control: { type: 'text' }, defaultValue: 'en_US' },
    limit: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
      defaultValue: 10,
    },
    scroll: { control: { type: 'boolean' }, defaultValue: false },
    onClick: { action: {} },
  }}
/>

<Story id="trendingterms" name="TrendingTerms" let:args>
  <TrendingTerms {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
