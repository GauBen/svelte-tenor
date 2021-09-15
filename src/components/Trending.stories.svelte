<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import Trending from './Trending.svelte'
</script>

<Meta title="Components/Trending" component={Trending} argTypes={{}} />

<Template let:args>
  <Trending />
</Template>

<Story name="Primary" />
