import { Store } from './index'
// import Cookies from 'js-cookie'
export interface AppType extends Object {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  device: string
  size: string
}

const state: AppType = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: localStorage.getItem('size') || 'medium'
}

class AppStore extends Store<AppType> {
  public toggleSidebar(): void {
    const opened = this.state.sidebar.opened
    this.state.sidebar = {
      opened: !opened,
      withoutAnimation: false
    }
  }

  public closeSideBar(withoutAnimation: boolean): void {
    this.state.sidebar = {
      opened: false,
      withoutAnimation
    }
  }

  public toggleDevice(device: string): void {
    this.state.device = device
  }

  public setSize(size: string): void {
    this.state.size = size
    localStorage.setItem('size', size)
  }

  protected data(): AppType {
    return state
  }
}

export default new AppStore()
