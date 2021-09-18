import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import config from './svelte.config'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase())

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    { file: pkg.main, format: 'umd', name, sourcemap: true },
    {
      file: pkg.main.replace('.js', '.min.js'),
      format: 'iife',
      name,
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [svelte(config), resolve(), typescript()],
}
