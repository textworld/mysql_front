import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            let data = response.data
            if (data.code === 2000) {
                return Promise.resolve(response);
            }
        }
        return Promise.reject(response);
    },
    error => {
        alert("接口返回错误")
        console.error(error)
        return Promise.reject(error);
    }
)



export default service
