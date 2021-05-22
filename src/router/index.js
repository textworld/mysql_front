import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const menuRouts = [
    {
        path: '/',
        meta: {title: 'Dashboard'},
        component: () => import('@/layout/index'),
        redirect: '/analyst',
        children: [
            {
                path: 'analyst',
                name: 'Analyst',
                meta: { title: 'Analyst' },
                component: () => import('@/views/dashboard')
            },
            {
                path: 'home',
                name: 'Home',
                meta: {title: 'TodoList'},
                component: () => import('../views/Home')
            },
            {
                path: 'about',
                name: 'About',
                meta: {title: 'About'},
                component: () => import('../views/About')
            },
        ]
    },
    {
        path: '/permission',
        meta: {title: '权限管理'},
        component: () => import('@/layout/index'),
        children: [
            {
                path: 'manage',
                name: 'Permission',
                meta: {title: '权限管理'},
                component: () => import('@/views/permission/manager/index')
            },
            {
                path: 'role',
                name: 'Role',
                meta: {title: '角色管理'},
                component: () => import('@/views/permission/role/index')
            }
        ],
    },
    {
        path: '/schema_manage',
        meta: {title: '数据库管理', icon: 'performancemonitori'},
        component: () => import('@/layout/index'),
        children: [
            {
                path: 'mysql',
                name: 'MySQLManage',
                meta: { title: 'mysql实例', icon: 'performancemonitori' },
                component: () => import('@/views/schema_manage/mysql')
            },
            {
                path: 'mysql_task',
                name: 'MySQLTask',
                meta: { title: '任务列表', icon: 'ansible' },
                component: () => import('@/views/schema_manage/ansible_task')
            }
        ]
    },
    {
        path: '/slowsql',
        meta: { title: '慢SQL管理', icon: 'slow' },
        component: () => import('@/layout/index'),
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
]

const routes = [].concat(
    mainRouter,
    menuRouts
)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

