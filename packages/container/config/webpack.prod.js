const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // Чтобы HtmlWebpackPlugin подставил правильный путь к файлу main.js внутри тега scrtipt в index.html
    // (он лежит на AWS Bucket по пути /container/latest/)
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // когда в коде будет встречено import { ... } from 'marketing/..., то будет сделан запрос за файлом
        // .../marketing/latest/remoteEntry.js внутри AWS Cloudfront
        // marketing@... должна совпадать с { name: 'marketing', ... } в параметрах ModuleFederationPlugin в пакете marketing 
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies
    }),
  ]
}

module.exports = merge(commonConfig, prodConfig)