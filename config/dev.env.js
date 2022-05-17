'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 如何请求不同端口
  BASE_API: '"http://localhost:8202"',
})
