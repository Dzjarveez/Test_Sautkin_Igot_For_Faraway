const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
const fileExists = fs.existsSync(envPath);
const env = fileExists ? dotenv.config({ path: envPath }).parsed : {};

const finalEnvKeys = Object.keys(env).length > 0 ? env : process.env;

const envKeys = Object.keys(finalEnvKeys).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(finalEnvKeys[next]);
  return prev;
}, {});

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '20000',
);

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  performance: {
    hints: false,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(mp4|webm|ogg)$/,
        use: 'file-loader',
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules/'),
        options: {
          transpileOnly: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: [{
              loader: MiniCssExtractPlugin.loader
            }, {
              loader: "css-loader"
            }, {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            }],
            sideEffects: true,
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
            ],
            include: /\.module\.css$/,
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack', 'url-loader'],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: [/\.avif$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: imageInlineSizeLimit,
              mimetype: 'image/avif',
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(txt|csv|mmdb)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: "[path][name].[ext]",
                  emitFile: true,
                },
              },
            ],
          },
        ]
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
};