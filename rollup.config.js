import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/js/react-kana-provider.js',
      format: 'esm',
    },
  ],
  plugins: [
    typescript(),
  ]
}