import preprocess from 'svelte-preprocess'

/** @type {import('rollup-plugin-svelte').Options} */
const config = { preprocess: preprocess(), emitCss: false }

export default config
