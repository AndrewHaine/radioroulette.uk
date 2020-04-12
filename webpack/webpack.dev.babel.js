import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

export default merge.smartStrategy({'module.rules.use': 'prepend'})(
  common,
  {
    mode: 'development',
    module: {
      rules: [
        {
          test: /.\.sass/i,
          use: ['css-hot-loader']
        }
      ]
    },
    devServer: {
      hot: true,
      port: 3000,
      proxy: {
        "/": {
          host: '0.0.0.0',
          target: 'https://localhost:8081',
          secure: false
        }
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
);
