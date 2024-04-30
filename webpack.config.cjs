const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const microFrontendEntry = './src/index.tsx';

module.exports = {
    mode: 'production',
    entry: microFrontendEntry,
    output: {
        uniqueName: 'template-webpack-react',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist', 'module'),
        clean: true,
        environment: { module: true, dynamicImport: true },
    },
    optimization: {
        minimize: true,
    },
    performance: {
        hints: false,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules\/(?!vuetify|@ads).*/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name]_chunk.[contenthash].css',
        }),
        new NodePolyfillPlugin(),
        new ModuleFederationPlugin({
            name: 'template-webpack-react',
            library: { type: 'module' },
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/main.microfrontend.tsx',
                './Basic': './src/Basic.tsx',
            },
        }),
    ],
    experiments: {
        outputModule: true,
    },
};
