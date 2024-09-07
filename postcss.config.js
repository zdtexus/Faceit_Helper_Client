import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    purgecss({
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      safelist: [],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'output.css',
  },
};
