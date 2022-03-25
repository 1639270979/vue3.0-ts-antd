import router from './router'
// import { RouteRecordRaw } from 'vue-router'
// import userStore from '@/store/user'
import permissionStore from '@/store/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'
setToken('admin')

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/codeControl']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      permissionStore.setSidebarRouters([])
      // if (!userStore.getState().sUserId) {
      //   userStore.getUserInfo().then(() => {
      //     const promiseArr = [
      //       permissionStore.createRouters(),
      //       userStore.getHospitalData(),
      //       userStore.getMenuPermission()
      //     ]
      //     return Promise.all(promiseArr)
      //   }).then((resList) => { // 动态添加的路由
      //     (resList[0] as RouteRecordRaw[]).forEach((item) => {
      //       router.addRoute(item)
      //     })
      //     next({
      //       ...to,
      //       replace: true
      //     })
      //   }).catch(() => {
      //     userStore.fedLogOut()
      //     next({ path: '/' })
      //   })
      // } else {
      //   next()
      // }
      next()
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})
