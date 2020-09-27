const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        // include:  path.resolve(__dirname, './src/assets/svg'),
        use: [
          {
            loader: 'svg-sprite-loader',
            // options: {
            //     symbolId: 'icon-[name]',
            // }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      // {
      //   test: /\.(le|c)ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         hmr: process.env.NODE_ENV === 'development',
      //       },
      //     },
      //     'css-loader',
      //     'less-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         plugins: [
      //           require('autoprefixer')({
      //             overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']//版本兼容
      //           }),
      //         ]
      //       }
      //     }
      //   ],
      // },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                  require('postcss-import')(),
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 5 version', '>1%', 'ios 7']//版本兼容
                    // browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 9-11"]
                  })
                ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.less'
    ],
    mainFiles: ['index'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.join(__dirname, './src'),
      'component':path.resolve(__dirname, './src/component/')
    }
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    inline: true,
    overlay: true,
    historyApiFallback: true,
    proxy: {
      '/czzinterfaces': {
        target: 'http://classzz.com/',
        // target: 'http://18.191.52.63:8080/',
        changeOrigin: false,
        pathRewrite: {
          '^/czzinterfaces': '/czzinterfaces'
        }
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'ClassZZ',
      showErrors: true,
      appMountId: 'app',
      template:'./src/index.html',
      favicon:'./src/assets/fav.png',
      minify:{
        removeAttributeQuotes:true,
        minifyCSS: true, // HTML 中的 css 
        minifyJS: true, // HTML 中 js
        collapseWhitespace: true // 标签之间的空白格
      },
      filename: 'index.html'
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
      // cssProcessorOptions: cssnanoOptions,
      cssProcessorPluginOptions: {
      preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeUnicode: false
        }]
      },
      canPrint: true
    })
    // new MiniCssExtractPlugin({
    //   filename: devMode ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    // })
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',//块的范围，有三个可选值：initial/async动态异步加载/all全部块(推荐)，默认为async;
      minSize: 30000,//代码分割的最小值，默认30k；
      maxSize: 0,
      minChunks: 1,//模块被引用次数多少时才会进行代码分割，默认为1；
      maxAsyncRequests: 5,//最大的按需(异步)加载次数，默认为5
      maxInitialRequests: 3,//最大的初始化加载次数，默认为3；
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
      cacheGroups: {//缓存组
        vendors: {//key 为entry中定义的 入口名称
          test: /[\\/]node_modules[\\/]/,
          priority: -10//优先级
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true//复用之前的打包模块
        }
      }
    },
    //minimizing: true,
  }
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }

  return config;
};