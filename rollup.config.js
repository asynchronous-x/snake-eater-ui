import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import url from 'postcss-url';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'stories/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.lib.json',
        declaration: true,
        declarationDir: './dist',
        exclude: ['**/*.stories.tsx', '**/*.stories.ts', '**/Page*.tsx'],
        outputToFilesystem: true,
        compilerOptions: {
          declarationMap: false,
        },
      }),
      postcss({
        extract: 'snake-eater-ui.css',
        minimize: true,
        modules: false,
        plugins: [
          postcssImport(), // Process @import statements first
          url({
            url: 'inline',
            maxSize: 200, // KB - inline fonts up to 200KB
            fallback: 'copy',
          }),
        ],
      }),
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
          passes: 2,
          dead_code: true,
          unused: true,
        },
        mangle: {
          safari10: true,
          properties: false,
        },
        format: {
          comments: false,
        },
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },
];
