import path from 'path';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    app: path.resolve(__dirname, '../content/bundles/app.js')
  },
  output: {
    path: path.resolve(__dirname, '../content'),
    publicPath: '/content',
    filename: 'js/dist/[name].js'
  },
  module: {
    rules: [
      {
        test: /.\.js(x)/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        }
      },
      {
        test: /.\.json/i,
        exclude: /node_modules/,
        use: {
          loader: 'json-loader',
        }
      },
      {
        test: /.\.sass/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {

              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000,
              publicPath: '/content/images/',
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 5
              },
              mozjpeg: {
                interlaced: true,
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/app.css',
      chunkFilename: 'css/[name].css'
    })
  ]
};
