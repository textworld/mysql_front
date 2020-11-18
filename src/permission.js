import router from './router'
import { getToken } from "@/utils/auth"
import store from '@/store'
import _ from 'lodash'

router.beforeEach(async(to, from, next) => {
    let user = await store.dispatch('getUserInfo')
    if(_.isEmpty(user)) {
        if (to.path === '/login') {
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }else{
        if(to.path == '/login') {
            let redirect = to.query.redirect
            if (!_.isEmpty(redirect)) {
                redirect = decodeURI(redirect)
            }else{
                redirect = '/'
            }
            next(redirect)
        }else{
            next()
        }
    }
})
