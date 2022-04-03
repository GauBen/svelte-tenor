import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    prerender: { default: true },
    paths: { base: dev ? '' : '/svelte-tenor' },
  },
}

export default config
