import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel';

const plugins = [
    typescript(),
    babel(),
    terser()
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
                'scalpel': 'scalpel'
            }
        }
    },
    {
        input: 'src/main.ts',
        plugins,
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        output: [
            {
                file: pkg.module,
                format: 'es'
            },
            {
                file: pkg.main,
                format: 'cjs'
            }
        ]
    }]