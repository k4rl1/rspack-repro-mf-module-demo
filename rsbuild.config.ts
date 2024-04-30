import { defineConfig } from "@rsbuild/core";
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default defineConfig({
  output: {
    filename: {
      js: '[name]_script.[contenthash:8].js',
    },
    distPath: {
      root: 'dist',
      html: '/',
      js: 'module/js',
      jsAsync: 'module/js/async',
      css: 'module/css',
      cssAsync: 'module/css/async',
      svg: 'module/svg',
      font: 'module/font',
      image: 'module/image',
      server: 'server',
      worker: 'worker',
    },
    sourceMap: {
      js: 'source-map',
    },
  },
  source: {
    tsconfigPath: './tsconfig.json',
  },
  moduleFederation: {
    options: {
      name: 'template-rspack-react',
      library: { type: 'module' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.microfrontend.tsx',
        './Basic': './src/Basic.tsx',
      },
    },
  },
  plugins: [
    pluginReact(),
    pluginTypeCheck({
      enable: false,
    }),
    pluginNodePolyfill(),
  ],
});