import resolve from '@rollup/plugin-node-resolve'


export default {
    input: 'src/lib/store.js',
    output: {
        file: 'dist/store.js',
        format: 'es'
    },
    plugins: [resolve()]
}
