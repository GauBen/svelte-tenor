<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import Trending from './Trending.svelte'

  let n = 1
</script>

<Meta title="Components/Trending" component={Trending} argTypes={{}} />

<Template let:args>
  <Trending {n} />
  <button on:click={() => n++}>n++</button>
  {n}
  <button on:click={() => n--}>n--</button>
</Template>

<Story name="Primary" />
