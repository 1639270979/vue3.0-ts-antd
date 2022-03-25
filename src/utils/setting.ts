// import Cookies from 'js-cookie'

const settingKey = 'SETTING'

export function getSetting(key: any = ''): any {
  let setting: string = localStorage.getItem(settingKey) || ''
  if (!key) {
    return setting
  }
  let value: string | null = null
  if (setting) {
    setting = JSON.parse(setting)
    value = setting[key]
  }
  return value
}

export function setSetting(key: string, value: string | number | boolean) {
  let setting: any = localStorage.getItem(settingKey) || '{}'
  if (setting) {
    setting = JSON.parse(setting)
  } else {
    setting = {}
  }
  setting[key] = value
  setting = JSON.stringify(setting)
  localStorage.setItem(settingKey, setting)
}

export function removeSetting() {
  return localStorage.removeItem(settingKey)
}
