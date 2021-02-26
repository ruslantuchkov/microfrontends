const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // Чтобы ModuleFederationPlugin создавал правильные пути к файлам внутри remoteEntry.js 
    // (он сореждит url'ы до других файлов из exposes)
    publicPath: '/auth/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
  ]
}

module.exports = merge(commonConfig, prodConfig)