/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodeSassGlobImporter = require('node-sass-glob-importer');

console.info('Webpack Started');

module.exports = {
    entry: {
        shared: {
            import: path.join(__dirname, 'ClientApp/Shared', 'Shared1.ts'),
        },
        main: {
            import: path.join(__dirname, 'ClientApp/Home', 'index.ts'),
            dependOn: 'shared',
            asyncChunks: true
        },
        //main2: {
        //    import: path.join(__dirname, 'ClientApp/Privacy', 'index.ts'),
        //    //dependOn: 'shared'
        //}
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        extensions: ['.ts', '.js', '.json']
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'wwwroot/dist'),
        clean: true,
        assetModuleFilename: 'images/[name][ext]',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            axios: 'axios',
            jQueryUI: 'jquery-ui'
        }),
        new MiniCssExtractPlugin({
            filename: '../dist/[name].min.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: NodeSassGlobImporter(),
                            },
                        }
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    stats: {
        errorDetails: true
    },

    optimization: {
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};