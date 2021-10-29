import rollup from './rollup.config.js';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default Object.assign({}, rollup, {
  plugins: [
    serve({
      open: 'true',
      openPage: '/demo.html'
    }),
    livereload({
      watch: ['src/*', 'demo.html']
    })
  ],
})
