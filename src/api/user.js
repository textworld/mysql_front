import request from '@/utils/request'

export function logout(params){
    return request({
        url: '/v1/user/logout',
        method: 'get',
        params: params
    })
}

export let login = (body) => {
    return request({
        url: '/v1/auth/login',
        method: 'post',
        data: body
    })
}