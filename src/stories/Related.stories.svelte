<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import Related from '../lib/Related.svelte'

  let q = ''
</script>

<Meta
  title="Components/Related"
  component={Related}
  argTypes={{
    key: { control: { type: 'text' }, defaultValue: 'LIVDSRZULELA' },
    locale: { control: { type: 'text' }, defaultValue: 'en_US' },
    limit: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
      defaultValue: 10,
    },
    scroll: { control: { type: 'boolean' }, defaultValue: false },
    onClick: { action: {} },
    onError: { action: {} },
  }}
/>

<Story id="related" name="Related" let:args>
  <div class="row">
    <input type="text" bind:value={q} />
    <Related
      {...args}
      {q}
      on:click={({ detail }) => {
        args.onClick(detail)
        q = detail
      }}
      on:error={({ detail }) => args.onError(detail)}
    />
  </div>
</Story>

<style>
  .row {
    display: flex;
    align-items: flex-start;
    gap: 0.5em;
  }

  input {
    padding: 0.25em;
  }
</style>
