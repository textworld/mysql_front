import axios from 'axios'

// create an axios instance
// 详细的配置文档 http://axios-js.com/zh-cn/docs/index.html#axios-create-config
const service = axios.create({
    baseURL: '/api',
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
service.interceptors.response.use(function (response) {
    let data = response.data
    if (data.code === 4001) {
        
    }
    return data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)


export default service
