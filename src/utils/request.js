import axios from 'axios'
import store from '@/store/index'
import { MessageBox, Message } from 'element-ui'
import _ from 'lodash'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
    response => {
        let data = response.data
        if (data.code === 2000) {
            return Promise.resolve(data);
        }else if (data.code === 4001) {
            store.commit('resetUser')
        }

        console.log('resp data', data)

        let callback = setTimeout(function(){
            let errMsg = ""
            let msg = data.message
            if (_.isString(msg)) {
                errMsg = msg
            }else if (_.isObject(msg)) {
                _.forEach(msg, (v, k)=> {
                    errMsg += k + ":" + v + ","
                })
            }
            Message.error(errMsg)
        }, 500)

        let cancelFn = function(){
            clearTimeout(callback)
        }
        return Promise.reject(new Error(data), cancelFn)
    },
    error => {
        let callback = setTimeout(function(){
            Message.error('服务器开小差啦')
        }, 500)
        let cancelFn = function(){
            clearTimeout(callback)
        }
        return Promise.reject(error, cancelFn);
    }
)



export default service
