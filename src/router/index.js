import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const menuRouts = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../layout/index'),
  //   redirect: '/home',
  //   meta: { title: 'Dashboard' },
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'Home',
  //       meta: { title: 'TodoList' },
  //       component: () => import('../views/Home')
  //     },
  //     {
  //       path: 'about',
  //       name: 'About',
  //       meta: { title: 'About' },
  //       component: () => import('../views/About')
  //     },
  //     {
  //       path: 'user',
  //       name: 'User',
  //       meta: { title: '用户管理' },
  //       component: () => import('../views/user/index')
  //     },
  //     {
  //       path: 'auth',
  //       name: 'AuthPage',
  //       component: () => import('../views/auth/index')
  //     },
  //     {
  //       path: 'bill',
  //       name: 'Bill',
  //       component: () => import('../views/bill/index')
  //     },
  //     {
  //       path: 'editor',
  //       name: 'editor',
  //       meta: { title: 'SQL编辑器' },
  //       component: () => import('../views/editor/index')
  //     },
  //     {
  //       path: 'menu',
  //       name: 'menu',
  //       meta: { title: '菜单管理' },
  //       component: () => import('../view')
  //     }
  //   ]
  // },
  {
    path: '/permission',
    meta: { title: '权限管理' },
    component: () => import('@/layout/simple-route'),
    children: [
      {
        path: 'manage',
        name: 'Permission',
        meta: { title: '权限管理' },
        component: () => import('@/views/permission/manager/index')
      },
      {
        path: 'role',
        name: 'Role',
        meta: { title: '角色管理' },
        component: () => import('@/views/permission/role/index')
      }
    ]
  },
  {
    path: '/dashboard',
    meta: { title: 'Dashboard' },
    component: () => import('@/layout/simple-route'),
    redirect: '/dashboard/home',
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
    ]
  }
]

const mainRouter = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/login_pre',
    name: 'LoginPre',
    component: () => import('../views/Login_pre')
  },
  {
    path: '/',
    component: () => import('@/layout/index'),
    name: 'Root',
    redirect: '/dashboard/home',
    children: menuRouts
  }
]

const routes = [].concat(
    mainRouter
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

