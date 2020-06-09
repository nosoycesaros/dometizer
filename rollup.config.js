import { terser } from 'rollup-plugin-terser'

export default [{
    input: 'src/main.js',
    plugins: [terser()],
    external: ['scalpel'],
    output: {
        file: 'umd/dometizer.js',
        format: 'umd',
        name: 'dometizer',
        esModule: false,
        globals: {
            'scalpel': 'scalpel'
        }
    }
},
{
    input: {
        index: 'src/main.js',
        create: 'src/create.js',
        extend: 'src/extend.js',
        createFromSelector: 'src/createFromSelector.js',
        append: 'src/append.js'
    },
    external: ['scalpel'],
    output: [
        {
            dir: 'esm',
            format: 'esm'
        }, {
            dir: 'cjs',
            format: 'cjs'
        }
    ]
}]