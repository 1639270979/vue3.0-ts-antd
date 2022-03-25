import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      title: 'about',
      hidden: true
    }
  },
  {
    path: '/',
    component: layout,
    redirect: 'name',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/name',
        name: 'name',
        component: () => import(/* webpackChunkName: "name" */ '../views/HomeView.vue'),
        meta: {
          title: '首页',
          hidden: false
        }
      }
    ]

  },
  {
    path: '/test',
    component: layout,
    redirect: 'test1',
    meta: {
      title: 'test',
      hidden: false
    },
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import(/* webpackChunkName: "about" */ '../views/test1/index.vue'),
        redirect: 'test1-1',
        meta: {
          title: 'test1',
          hidden: false
        },
        children: [
          {
            path: '/test1-1',
            name: 'test1-1',
            component: () => import(/* webpackChunkName: "about" */ '../views/test1/test1-1/index.vue'),
            meta: {
              title: 'test1-1',
              hidden: false
            }
          },
          {
            path: '/test1-2',
            name: 'test1-2',
            component: () => import(/* webpackChunkName: "about" */ '../views/test1/test1-2/index.vue'),
            meta: {
              title: 'test1-2',
              hidden: false
            }
          }
        ]
      }
    ]

  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
