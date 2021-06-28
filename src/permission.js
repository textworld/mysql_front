import router from '@/router/index.js'
import store from '@/store/index'
import {defaultPath} from '@/router/index.js'
import _ from 'lodash'

router.beforeEach((to, from, next) => {
  
    let user = store.state.user
    let isLogin = user && user.username ? true : false;

    if (to.path != '/login') {
        // 访问非登录页面,也就是所有需要登录以后才能访问的界面
        if (isLogin) {
          console.log('you have login')
          next()
        }else{
            //跳转到登录界面
          next('/login')
        }
      }else{
        // 访问登录界面
        if (isLogin) {
          next('/')
        }else{
          next()
        }
      }
  })