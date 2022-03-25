import {
  Carousel,
  ConfigProvider,
  Button,
  Radio
} from 'ant-design-vue'

const ant = {
  install(Vue: any) {
    Vue.component(Carousel.name, Carousel)
    Vue.component(ConfigProvider.name, ConfigProvider)
    Vue.component(Button.name, Button)
    Vue.component(Radio.name, Radio)
  }
}

export default ant
