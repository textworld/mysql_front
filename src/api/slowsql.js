import request from '@/utils/request'

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
    return request({
        url: '/v1/slowsql/setting/global_setting/',
        method: 'post',
        data: {
            query_time: 5,
            query_count: 10
        }
    })
}