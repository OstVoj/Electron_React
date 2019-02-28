/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies } from '../package.json';
require('dotenv').config({ path: require('find-config')('.env') });

const today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}
let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = today.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let sec = today.getSeconds();
if (sec < 10) {
  sec = `0${sec}`;
}

const version = `${yyyy}${mm}${dd}${hour}${min}${sec}`;

export default {
  externals: [...Object.keys(dependencies || {})],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      VERSION: version,
      API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
      INTERVAL: JSON.stringify(process.env.INTERVAL),
      DB_PATH: JSON.stringify(process.env.DB_PATH),
      DB_NAME: JSON.stringify(process.env.DB_NAME)
    }),

    new webpack.NamedModulesPlugin(),
  ]
};
