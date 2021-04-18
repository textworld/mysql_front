import request from '@/utils/request'

export function getSchemaSettings(params){
    return request({
        url: '/v1/slowsql/setting/schema_settings',
        method: 'get',
        params: params
    })
}