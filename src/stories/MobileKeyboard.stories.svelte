<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import MobileKeyboard from '../lib/MobileKeyboard.svelte'
</script>

<Meta
  title="Keyboards/MobileKeyboard"
  component={MobileKeyboard}
  argTypes={{
    key: { control: { type: 'text' }, defaultValue: 'LIVDSRZULELA' },
    locale: { control: { type: 'text' }, defaultValue: 'en_US' },
    quality: {
      options: ['low', 'medium', 'high'],
      control: { type: 'inline-radio' },
      defaultValue: 'medium',
    },
    safety: {
      options: ['off', 'low', 'medium', 'high'],
      control: { type: 'inline-radio' },
      defaultValue: 'off',
    },
    ratio: {
      options: ['all', 'wide', 'standard'],
      control: { type: 'inline-radio' },
      defaultValue: 'all',
    },
    limit: {
      control: { type: 'range', min: 1, max: 50, step: 1 },
      defaultValue: 20,
    },
    columnSize: {
      control: { type: 'range', min: 10, max: 360, step: 1 },
      defaultValue: 140,
    },
    gap: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      defaultValue: 4,
    },
    autofocus: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    messages: {
      control: { type: 'object' },
      defaultValue: {
        placeholder: 'Search Tenor',
        close: 'Close',
        error: 'Tenor is currently unavailable',
        retry: 'Retry',
        empty: 'No GIFs match your search... Try something else!',
      },
    },
    onClick: { action: {} },
    onClose: { action: {} },
  }}
/>

<Story id="mobilekeyboard" name="MobileKeyboard" let:args>
  <MobileKeyboard
    {...args}
    on:click={({ detail }) => args.onClick(detail)}
    on:close={() => args.onClose()}
  />
</Story>
