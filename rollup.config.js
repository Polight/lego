import resolve from '@rollup/plugin-node-resolve'


export default {
    input: 'src/lib/index.js',
    output: {
        file: 'dist/lego.js',
        format: 'es'
    },
    plugins: [resolve()]
}
