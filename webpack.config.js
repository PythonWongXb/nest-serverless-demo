/*
 * @Author: your name
 * @Date: 2022-05-02 15:58:07
 * @LastEditTime: 2022-05-02 15:58:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nest-serverless-demo/webpack.config.js
 */
/*
 * @Author: your name
 * @Date: 2022-05-02 13:06:35
 * @LastEditTime: 2022-05-02 15:52:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /test-postgresql-sls/webpack.config.js
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
// fork-ts-checker-webpack-plugin需要单独安装
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: './src/main',
  target: 'node',
  // 置为空即可忽略webpack-node-externals插件
  externals: {
    // 'aws-sdk': 'aws-sdk',
    // 'mock-aws-s3': 'mock-aws-s3',
    // 'nock': 'nock',
    // 'fastify-swagger': 'fastify-swagger',
    // 'pg-native': 'pg-native',
    // 'class-transformer/storage': 'class-transformer/storage',

  },
  // exclude: 'node_modules',
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  // 打包后的文件名称以及位置
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  plugins: [
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};