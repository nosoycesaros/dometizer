import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' with { type: 'json' }
import typescript from '@rollup/plugin-typescript'
import path from 'path'

const plugins = [
  alias({
    entries: [
      { find: '@', replacement: path.resolve(process.cwd(), 'src') },
      { find: '@functions', replacement: path.resolve(process.cwd(), 'src/functions') },
      { find: '@tests', replacement: path.resolve(process.cwd(), 'src/tests') },
    ],
  }),
  typescript(),
  terser(),
]

export default [
  {
    input: 'src/main.ts',
    plugins,
    external: ['scalpel'],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'dometizer',
      esModule: false,
      globals: {
        scalpel: 'scalpel',
      },
    },
  },
  {
    input: 'src/main.ts',
    plugins,
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    output: [
      {
        file: pkg.module,
        format: 'es',
      },
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
  },
]
