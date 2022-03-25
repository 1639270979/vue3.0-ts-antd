import { createApp } from 'vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import '@/plugins/less'

import App from './App.vue'
import router from './router'
// import store from './store'
// 权限控制
import './permission'
import './assets/styles/index.less'

// 全局引入icon
import '@/assets/icons'
// 全局组件引入
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)
// 全局组件祖册
app.component(
  'SvgIcon',
  // 如果这个组件选项是通过 `export default` 导出的，那么就会优先使用 `.default`，否则回退到使用模块的根
  SvgIcon.default || SvgIcon
)

app.use(antd).use(router).mount('#app')
