<div align="center">

# svelte-tenor

Tenor GIF components, implemented in Svelte.

[![package version](https://img.shields.io/npm/v/svelte-tenor?style=flat-square&label=version) ![downloads per week](https://img.shields.io/npm/dm/svelte-tenor?style=flat-square)](https://www.npmjs.com/package/svelte-tenor) [![npm bundle size](https://img.shields.io/bundlephobia/min/svelte-tenor?style=flat-square)](https://bundlephobia.com/package/svelte-tenor)

[![A lot of cat GIFs](https://user-images.githubusercontent.com/48261497/140711042-28ce86cb-d0ef-4d15-a6b4-210d9c90b20b.png)](https://gauben.github.io/svelte-tenor/)

</div>

## Try svelte-tenor

[Try svelte-tenor here!](https://gauben.github.io/svelte-tenor/)

## The all-in-one GIF keyboard

Install `svelte-tenor` with your favorite package manager:

```bash
npm install svelte-tenor
# or
yarn add svelte-tenor
```

Use the `MobileKeyboard` component:

```svelte
<script>
  import { MobileKeyboard, Gif } from 'svelte-tenor'

  let gif
</script>

<MobileKeyboard
  key="Get a key for free here: https://tenor.com/developer/keyregistration"
  on:click={({ detail }) => {
    gif = detail
  }}
/>

{#if gif !== undefined}
  <p><Gif {gif} /></p>
  <pre>{JSON.stringify(gif, null, 2)}</pre>
{/if}
```

[![image](https://user-images.githubusercontent.com/48261497/142633427-4388ef75-1eb8-4c7a-a390-2563b8fb28ee.png)<br>Open this example in your browser](https://svelte.dev/repl/1d2b32821c494e2dae9c8921ea2e2e77?version=3)

## Component list

If you want to build your own GIF keyboard, svelte-tenor contains a lot of components.

[**Autocomplete:**](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-autocomplete--autocomplete) offers to finish your sentence<br>
[![Autocomplete example](https://user-images.githubusercontent.com/48261497/142628446-c03486db-929a-497c-ae20-455ec740d37b.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-autocomplete--autocomplete)

[**Categories:**](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-categories--categories) Tenor GIF categories<br>
[![GIF categories: dance, annoyed, omg...](https://user-images.githubusercontent.com/48261497/142627729-c4be0b16-a594-4547-b62e-4e54490cdd79.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-categories--categories)

[**Search:**](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-search--search) asks Tenor for matching GIFs<br>
[![Searching cat GIFs](https://user-images.githubusercontent.com/48261497/142628878-c526ea76-af42-4832-a7fe-e4f32f8082ad.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-search--search)

**And more!** Try all available components: https://gauben.github.io/svelte-tenor/storybook/

## Build your own keyboard

While [MobileKeyboard](https://gauben.github.io/svelte-tenor/storybook/?path=/story/keyboards-mobilekeyboard--mobilekeyboard) might be enough for prototyping, you probably want to create a GIF keyboard with more features and a better design. To help you do so, svelte-tenor contains [a handful of composable components](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-autocomplete--autocomplete).

If you don't know how or where to begin, you may read [the source code of MobileKeyboard](https://github.com/GauBen/svelte-tenor/blob/main/src/lib/MobileKeyboard.svelte).

## Typed API

All the components above use [Tenor API](https://tenor.com/gifapi/documentation). The API client implementation is written in TypeScript and fully typed. You can use it as follows:

```ts
import { search } from 'svelte-tenor/api'

console.log(await search({ key: 'LIVDSRZULELA', q: 'hello' }))
```

[Open this example in your browser](https://svelte.dev/repl/359c66c0d2ed473a965b5b6bb886cab0?version=3)

The API runs smoothly in the browser and deno, but **requires a workaround in node**:

```ts
// https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch'
Object.defineProperties(globalThis, {
  fetch: { enumerable: true, configurable: true, value: fetch },
})
```

Please note that the API implemented does not completely follow [Tenor's documentation](https://tenor.com/gifapi/documentation). If you want a faithful API implementation, use `svelte-tenor/raw-api` instead.

## How to contribute?

Install Node and Yarn with [Volta](https://volta.sh/). Once you've cloned the project and installed dependencies with `yarn install`, start a development server:

```bash
# Start Storybook
yarn storybook

# Format code with prettier
yarn format

# Run code quality checks
yarn check

# Commit your changes!
git commit -a
```

If everything works, please open a pull request with your changes and a short description. Thanks for considering contributing!

## License

[MIT](https://github.com/GauBen/svelte-tenor/blob/main/LICENSE)
