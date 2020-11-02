import request from '@/utils/request'

export function getBillData(params){
    console.log('test')
    return request({
        url: '/v1/bill/bill_data/',
        method: 'get',
        params: params
      })
}

export function login(data) {
    //return request.post('/login', data)
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

