<div align="center">

# svelte-tenor

A GIF keyboard, developed with Svelte.

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

[![image](https://user-images.githubusercontent.com/48261497/142633427-4388ef75-1eb8-4c7a-a390-2563b8fb28ee.png)<br>Open this example in your browser](https://svelte.dev/repl/1d2b32821c494e2dae9c8921ea2e2e77?version=3.44.2)

## Component list

If you want to build your own GIF keyboard, svelte-tenor contains a lot of components.

**Autocomplete:** offers to finish your sentence
[![Autocomplete example](https://user-images.githubusercontent.com/48261497/142628446-c03486db-929a-497c-ae20-455ec740d37b.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-autocomplete--autocomplete)

**Categories:** Tenor GIF categories
[![GIF categories: dance, annoyed, omg...](https://user-images.githubusercontent.com/48261497/142627729-c4be0b16-a594-4547-b62e-4e54490cdd79.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-categories--categories)

**Search:** asks Tenor for matching GIFs
[![Searching cat GIFs](https://user-images.githubusercontent.com/48261497/142628878-c526ea76-af42-4832-a7fe-e4f32f8082ad.png)](https://gauben.github.io/svelte-tenor/storybook/?path=/story/components-search--search)

**And more!** Try all available components: https://gauben.github.io/svelte-tenor/storybook/

## Typed API

All the components above use [Tenor API](https://tenor.com/gifapi/documentation). The API client implementation is written in TypeScript and fully typed. You can use it as follows:

```ts
import { search } from 'svelte-tenor/api'

console.log(await search({ key: 'LIVDSRZULELA', q: 'hello' }))
```

[Open this example in your browser](https://svelte.dev/repl/359c66c0d2ed473a965b5b6bb886cab0?version=3.44.2)

The API runs smoothly in the browser, but requires some changes to work in other environments:

- Node: use [node-fetch](https://www.npmjs.com/package/node-fetch) and write `import fetch from 'node-fetch; globalThis.fetch = fetch;`
- Deno: broken at the moment, depends on either [TypeScript#27481](https://github.com/Microsoft/TypeScript/issues/27481) or [Deno#2506](https://github.com/denoland/deno/issues/2506)

Please note that the API implemented does not completely follow Tenor's documentation. If you want a faithful API implementation, use `svelte-tenor/raw-api` instead. This one supports Deno.

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
