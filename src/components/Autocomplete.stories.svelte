<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Autocomplete from './Autocomplete.svelte'
</script>

<Meta
  title="Components/Autocomplete"
  component={Autocomplete}
  argTypes={{
    key: { control: { type: 'text' } },
    limit: { control: { type: 'range', min: 1, max: 50, step: 1 } },
    scroll: { control: { type: 'boolean' } },
  }}
/>

<Story
  name="Basic"
  args={{ key: 'LIVDSRZULELA', limit: 20, q: 'hello', scroll: false }}
  let:args
>
  <Autocomplete {...args} />
</Story>
