<div align="center">
  
# svelte-tenor

A GIF keyboard, developed with Svelte.

![image](https://user-images.githubusercontent.com/48261497/140711042-28ce86cb-d0ef-4d15-a6b4-210d9c90b20b.png)

</div>

## How to use?

```svelte
<script lang="ts">
  import Tenor from 'svelte-tenor/Tenor.svelte'
</script>

<Tenor
  key="Get a key for free here: https://tenor.com/developer/keyregistration"
  on:click={({ detail }) => {
    console.log(detail)
  }}
/>
```

* Try all available components: https://gauben.github.io/svelte-tenor/
* See usage examples: https://github.com/GauBen/svelte-tenor/tree/main/src/stories

## How to contribute?

Once you've cloned the project and installed dependencies with `yarn install`, start a development server:

```bash
yarn storybook
```

Then, open a pull request with your changes.

## License

[See ./LICENSE](https://github.com/GauBen/svelte-tenor/blob/main/LICENSE)
