import request from '@/utils/request'

export function getSchemaList(params){
    return request({
        url: '/v1/bill/bill_data/',
        method: 'get',
        params: params
    })
}