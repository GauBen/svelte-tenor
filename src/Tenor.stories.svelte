<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import Tenor from './Tenor.svelte'
</script>

<Meta title="Components/Tenor" component={Tenor} argTypes={{}} />

<Template let:args>
  <Tenor />
</Template>

<Story name="Primary" />
