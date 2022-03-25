'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false, // 生成环境取消 eslint 验证
  productionSourceMap: false,
  // transpileDependencies: true,

  devServer: {
    hot: true,
    // hotOnly: false,//弃用
    open: true, // 自动打开浏览器
    port: '8080', // 端口
    https: false, // 启用https
    // host: '0.0.0.0',
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:7002/mock',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
    // after: require("./mock/mock-server.js"),
  },
  configureWebpack: {
    // devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production', // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      less: {
        lessOptions: {
          // 配置主题
          modifyVars: {
            'primary-color': '#1890FF', // UI框架的主要颜色
            'border-radius-base': '4px'
          },
          javascriptEnabled: true

        }
      }
    }
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      // 删除预加载
      config.plugins.delete('preload')
      // 开启代码压缩
      config.optimization.minimize(true)
      // 分割代码 相同代码放一块
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 全局变量
    config.plugin('define').tap((args) => {
      args[0].ISPROD = process.env.NODE_ENV === 'production'
      return args
    })
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()

    // set svg-sprite-loader

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // config.module.rule('vue').use('vue-loader').loader('vue-loader').end()
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      // config
      //   .plugin('ScriptExtHtmlWebpackPlugin')
      //   .after('html')
      //   .use('script-ext-html-webpack-plugin', [
      //     {
      //       // `runtime` must same as runtimeChunk name. default is `runtime`
      //       inline: /runtime\..*\.js$/
      //     }
      //   ])
      //   .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-antdDesignVue', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single', {
        from: path.resolve(__dirname, './public/robots.txt'), // 防爬虫文件
        to: './' // 到根目录下
      })
    })
  }
}
