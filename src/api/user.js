import request from '@/utils/request'

export function logout(params){
    return request({
        url: '/v1/user/logout',
        method: 'get',
        params: params
    })
}
