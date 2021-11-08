module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.svelte'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
  ],
  webpackFinal: async (config) => {
    // Update svelte-loader options to preprocess TypeScript and SCSS
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes('svelte-loader')
    )
    svelteLoader.options = (await import('../svelte.config.js')).default
    return config
  },
}
