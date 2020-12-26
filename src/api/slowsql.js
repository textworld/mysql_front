import request from '@/utils/request'

export function querySlowsql(params){
    return request({
        url: '/v1/slowsql/query/',
        method: 'get',
        params: params
    })
}