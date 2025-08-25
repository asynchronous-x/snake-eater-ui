import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default [
  {
    input: 'stories/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.lib.json',
        declaration: true,
        declarationDir: './dist',
        exclude: ['**/*.stories.tsx', '**/*.stories.ts', '**/Page*.tsx'],
      }),
      postcss({
        extract: 'snake-eater-ui.css',
        minimize: true,
        modules: false,
        use: ['sass'],
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'stories/index.ts',
    output: {
      file: 'dist/snake-eater-ui.umd.js',
      format: 'umd',
      name: 'SnakeEaterUI',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.lib.json',
        declaration: false,
        exclude: ['**/*.stories.tsx', '**/*.stories.ts', '**/Page*.tsx'],
      }),
      postcss({
        minimize: true,
        modules: false,
        inject: true,
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
];