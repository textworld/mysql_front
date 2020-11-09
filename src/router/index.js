import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const menuRouts = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../layout/index'),
    redirect: '/home',
    meta: { title: 'Dashboard' },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: 'TodoList' },
        component: () => import('../views/Home')
      },
      {
        path: 'about',
        name: 'About',
        meta: { title: 'About' },
        component: () => import('../views/About')
      },
      {
        path: 'user',
        name: 'User',
        meta: { title: '用户管理' },
        component: () => import('../views/user/index')
      },
      {
        path: 'auth',
        name: 'AuthPage',
        component: () => import('../views/auth/index')
      },
      {
        path: 'bill',
        name: 'Bill',
        component: () => import('../views/bill/index')
      },
      {
        path: 'editor',
        name: 'editor',
        meta: { title: 'SQL编辑器' },
        component: () => import('../views/editor/index')
      }
    ]
  }
]

const mainRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const routes = [].concat(
    menuRouts,
    mainRouter
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

