const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|ttf|woff)$/,
        use: 'url-loader',
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.png'],
    mainFiles: ['index'],
    alias: {
      '@': path.join(__dirname, './src'),
      component: path.resolve(__dirname, './src/component/'),
      images: path.resolve(__dirname, './src/asset/images/'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      showErrors: true,
      template: './src/index.html',
      filename: 'index.html',
    }),

    // 编译时(compile time)插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // webpack-dev-server 强化插件
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:5].css',
      // chunkFilename: "assets/css/[name].[hash:5].css",
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            normalizeUnicode: false,
          },
        ],
      },
      canPrint: true,
    }),
  ],
  optimization: {
    minimize: true,
  },
}
