import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const menuRouts = [
  {
    path: '/dashboard',
    meta: { title: 'Dashboard' },
    component: () => import('@/views/dashboard')
  },
  {
    path: '/db_manage',
    meta: { title: '库管理', icon: 'slow' },
    component: () => import('@/layout/blankview'),
    children: [
      {
        path: 'index',
        meta: { title: '管理页' },
        component: () => import('@/views/db_manage/index')
      }
    ]
  },
  {
    path: '/slowsql',
    meta: { title: '慢SQL管理', icon: 'slow' },
    component: () => import('@/layout/blankview'),
    children: [
      {
        path: 'index',
        meta: { title: '列表', icon: 'all' },
        component: () => import('@/views/slowsql/index')
      },
      {
        path: 'setting',
        name: 'SlowSetting',
        meta: { title: '告警设置', icon: 'wxbgongju' },
        component: () => import('@/views/slowsql/settings')
      }
    ]
  }
]

const normalRoute = [
  {
    path: 'db_manage/schema/:name',
    component: () => import('@/views/db_manage/schema_detail')
  }
]

export const defaultPath = '/dashboard'

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/layout/layout'),
    redirect: '/dashboard',
    children: [].concat(menuRouts, normalRoute)
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
