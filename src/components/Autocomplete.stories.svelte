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
  }}
/>

<Story
  name="Basic"
  args={{ key: 'LIVDSRZULELA', limit: 10, q: 'hello' }}
  let:args
>
  <Autocomplete {...args} />
</Story>
