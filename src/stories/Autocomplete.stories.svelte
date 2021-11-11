<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Autocomplete from '../lib/Autocomplete.svelte'

  let q = ''
</script>

<Meta
  title="Components/Autocomplete"
  component={Autocomplete}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    scroll: { control: { type: 'boolean' } },
    onClick: { action: {} },
  }}
/>

<Story
  name="Basic"
  args={{ key: 'LIVDSRZULELA', q: 'hello', scroll: false }}
  let:args
>
  <Autocomplete {...args} on:click={({ detail }) => args.onClick(detail)} />
</Story>

<Story
  name="Reactivity"
  args={{ key: 'LIVDSRZULELA', limit: 20, q: 'hello', scroll: false }}
  let:args
>
  <p><input type="text" bind:value={q} /></p>
  <Autocomplete
    {...args}
    {q}
    on:click={({ detail }) => {
      q = detail
      args.onClick(detail)
    }}
  />
</Story>
