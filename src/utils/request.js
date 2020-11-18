import axios from 'axios'
import store from '@/store/index'
import { MessageBox, Message } from 'element-ui'

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
        return Promise.reject(new Error(data.message))
    },
    error => {
        alert("接口返回错误")
        console.error(error)
        return Promise.reject(error);
    }
)



export default service
