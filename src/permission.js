import router from './router'
import { getToken } from "@/utils/auth"
import store from '@/store'

router.beforeEach(async(to, from, next) => {
    let username = await store.dispatch('getUserInfo')

    if (username) {
        // 已经登录
        if (to.path === '/login'){
            // todo make redirect if have
            next({path: '/'})
        }else{
            next()
            // // 判断state.username是否为空，从服务器请求一遍，把获取的username再保存起来
            // // 如果不为空，那么就什么也不做
            // let username = store.state.user.username
            // if (username) {
            //     next()
            // }else{
            //     // 需要理解一下这个await操作
            //     username = await store.dispatch('getUserInfo')
            //     console.debug('username:', username)
            //     next()
            // }
        }
    }else{
        // 没有登录
        // 首先要获取当前页面的url
        if (to.path === '/login') {
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }
})
