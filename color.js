const path = require('path')

const { generateTheme } = require('antd-theme-generator')
// const options = {}
generateTheme({
  antDir: path.join(__dirname, './node_modules/ant-design-vue'), // node_modules中antd的路径
  stylesDir: path.join(__dirname, './src/assets/styles'), // styles对应的目录路径
  varFile: path.join(__dirname, './src/assets/styles/variables.less'), // less变量的入口文件
  mainLessFile: path.join(__dirname, './src/assets/styles/index.less'), // 对应具体位置
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ], // 您要动态更改的变量列表
  outputFilePath: path.join(__dirname, './public/color.less'), // 生成的color.less文件的位置
  customColorRegexArray: [/^color\(.*\)$/]
})
  .then(() => {
    // console.log('配置主题成功')
  })
  .catch(() => {
    // console.log('配置主题失败')
  })
  // const path = require('path')
  // const { generateTheme } = require('antd-theme-generator')
  // // ant-design-vue/dist/antd.less
  // try {
  //   const options = {
  //     antDir: path.join(__dirname, './node_modules/ant-design-vue'), // 对应具体位置
  //     stylesDir: path.join(__dirname, './src/assets/styles'), // 对应具体位置
  //     varFile: path.join(__dirname, './src/assets/styles/variables.less'), // 对应具体位置
  //     mainLessFile: path.join(__dirname, './src/assets/styles/index.less'), // 对应具体位置
  //     themeVariables: [
  //       '@primary-color',
  //       '@secondary-color',
  //       '@text-color',
  //       '@text-color-secondary',
  //       '@heading-color',
  //       '@layout-body-background',
  //       '@btn-primary-bg',
  //       '@layout-header-background'
  //     ],
  //     indexFileName: 'index.html',
  //     outputFilePath: path.join(__dirname, './public/color.less')
  //   }
  //   generateTheme(options).then(() => {
  //     console.log('Theme generated successfully')
  //   })
  //     .catch(error => {
  //       console.log('Error', error)
  //     })
  // } catch (error) {
  //   console.log(error)
  // }
