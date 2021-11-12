<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Autocomplete from '../lib/Autocomplete.svelte'

  let q = ''
</script>

<Meta
  title="Components/Autocomplete"
  component={Autocomplete}
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

<Story id="autocomplete" name="Autocomplete" let:args>
  <div class="row">
    <input type="text" bind:value={q} />
    <Autocomplete
      {...args}
      {q}
      on:click={({ detail }) => {
        args.onClick(detail)
        q = detail
      }}
    />
  </div>
</Story>

<style>
  .row {
    display: flex;
    gap: 0.5em;
    align-items: flex-start;
  }

  input {
    padding: 0.25em;
  }
</style>
