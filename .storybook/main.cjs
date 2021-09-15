// const path = require('path')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.svelte'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes('svelte-loader')
    )
    svelteLoader.options = (await import('../svelte.config.js')).default

    // config.resolve.plugins = [
    //   new TsconfigPathsPlugin({
    //     configFile: path.resolve(__dirname, '../tsconfig.json'),
    //   }),
    // ]

    // Return the altered config
    return config
  },
}
