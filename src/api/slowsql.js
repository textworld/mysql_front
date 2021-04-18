import request from '@/utils/request'

export function getSchemaSettings(params){
    return request({
        url: '/v1/slowsql/setting/schema_settings',
        method: 'get',
        params: params
    })
}
export function querySlowsql(params){
    return request({
        url: '/v1/slowsql/query/',
        method: 'get',
        params: params
    })
}

export function getAggsBySchema(params) {
    return request({
        url: '/v1/slowsql/query/get_aggs_by_schema/',
        method: 'get',
        params: params
    })
}

export function getAggsByDate(params) {
    return request({
        url: '/v1/slowsql/query/get_aggs_by_date/',
        method: 'get',
        params: params
    })
}

export function getTop10(params) {
    return request({
        url: '/v1/slowsql/query/get_top10_sql/',
        method: 'get',
        params: params
    })
}

export function getGlobalSetting(params) {
    return request({
        url: '/v1/slowsql/setting/global_setting/',
        method: 'get',
        params: params
    })
}

export function saveGlobalSetting(body) {
    return request.post('/v1/slowsql/setting/global_setting/', body)
}

export function saveSchemaAlarmCfg(data) {
    return request.post('/v1/slowsql/setting/', data)
}

export function getSchemaAlarmCfgList() {
    return request.get('/v1/slowsql/setting/')
}

export function updateSchemaAlarmCfg(cfg_id, data){
    return request.put(`/v1/slowsql/setting/${cfg_id}/`, data)
}
