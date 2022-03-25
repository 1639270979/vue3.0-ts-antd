import { Store } from './index'
import '@/assets/styles/variables.less'
// import variablesElement from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'
import {
  setSetting,
  getSetting
} from '@/utils/setting'

export interface SettingType extends Object {
  theme?: string
  sideTheme: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
  menuDrag: boolean
  menuWidth?: number
}

// vue3.0获取css变量的方法
// getComputedStyle(document.documentElement).getPropertyValue('--theme')
// 设置css变量的方法
// document.documentElement.style.setProperty('--theme', value)
setSetting('theme', getComputedStyle(document.documentElement).getPropertyValue('--theme'))
const settings = getSetting()
if (!settings) {
  setSetting('theme', getComputedStyle(document.documentElement).getPropertyValue('--theme'))
  setSetting('sideTheme', defaultSettings.sideTheme)
  setSetting('showSettings', defaultSettings.showSettings)
  setSetting('tagsView', defaultSettings.tagsView)
  setSetting('fixedHeader', defaultSettings.fixedHeader)
  setSetting('sidebarLogo', defaultSettings.sidebarLogo)
  setSetting('menuDrag', defaultSettings.menuDrag)
  // setSetting('menuWidth', variables.sideBarWidthNumber)
}

const state: SettingType = {
  theme: getSetting('theme'), // 颜色主题
  sideTheme: getSetting('sideTheme'), // 侧边栏主题
  showSettings: getSetting('showSettings'), // 是否展示设置弹窗
  tagsView: getSetting('tagsView'), // 是否展示标签
  fixedHeader: getSetting('fixedHeader'), // 固定头部
  sidebarLogo: getSetting('sidebarLogo'), // sidebarLogo
  menuDrag: getSetting('menuDrag'), //
  menuWidth: getSetting('menuWidth')// 侧边栏宽度
}

class SettingsStore extends Store<SettingType> {
  public changeSetting(key: string, value: string | number | boolean): void {
    if (Object.prototype.hasOwnProperty.call(this.state, key)) {
      this.state[key] = value
      setSetting(key, value)
    }
  }

  protected data(): SettingType {
    return state
  }
}

export default new SettingsStore()
