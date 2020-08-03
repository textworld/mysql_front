import router from './router'
import { getToken } from "@/utils/auth";

router.beforeEach(async(to, from, next) => {
    const token = getToken()
    if (token) {
        // 已经登录

        // import store from './store'
        // 判断state.username是否为空，从服务器请求一遍，把获取的username再保存起来
        // 如果不为空，那么就什么也不做
        next()
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
