import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

export default {
  entry: "build/main.js",
  format: "umd",
  moduleName: "MicroState",
  dest: "dist/bundle.js",
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    filesize()
  ]
};
