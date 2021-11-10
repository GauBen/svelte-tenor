<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Tenor from '../lib/Tenor.svelte'
</script>

<Meta
  title="Components/Tenor"
  component={Tenor}
  argTypes={{
    key: { control: { type: 'text' } },
    onClick: { action: {} },
  }}
/>

<Story name="Primary" args={{ key: 'LIVDSRZULELA' }} let:args>
  <Tenor {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
