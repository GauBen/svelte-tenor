import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = { preprocess: preprocess(), emitCss: false }

export default config
