const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules[\\/](?!axios)/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false, // url([object Module]) 오류 해결용
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @use "sass:color";
                @use "sass:list";
                @use "sass:map";
                @use "sass:math";
                @use "sass:meta";
                @use "sass:selector";
                @use "sass:string";
                @import "~/styles/mixins/_ellipsis";
                @import "~/styles/mixins/_position";
                @import "~/styles/mixins/_flexbox";
                @import "~/styles/mixins/_font";
                @import "~/styles/mixins/_responsive";
                @import "~/styles/layout/_grid";
                @import "~/styles/_variables";
                @import "~/styles/_reset";
              `,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'true',
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}
