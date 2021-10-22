import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import gzipPlugin from 'rollup-plugin-gzip'


export default {
    input: 'src/lib/index.js',
    output: {
        file: 'dist/lego.min.js',
        format: 'es'
    },
    plugins: [resolve(), terser(), gzipPlugin()]
}
