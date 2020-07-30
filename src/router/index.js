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
        meta: { title: 'Home' },
        component: () => import('../views/Home')
      },
      {
        path: 'about',
        name: 'About',
        meta: { title: 'About' },
        component: () => import('../views/About')
      }
    ]
  }
]

const routes = [].concat(
    menuRouts
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

