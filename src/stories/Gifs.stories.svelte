<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Gifs from '../lib/Gifs.svelte'

  let n = 1
  let q = 'david goodenough'
</script>

<Meta
  title="Components/Gifs"
  component={Gifs}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    onClick: { action: {} },
  }}
/>

<Story
  name="Basic"
  args={{
    key: 'LIVDSRZULELA',
    limit: 20,
    ids: ['5114770', '10605207', '9383966', '16113705'],
  }}
  let:args
>
  <Gifs {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>
