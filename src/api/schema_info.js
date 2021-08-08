import request from '@/utils/request'


export function get_schemas(params) {
    return request.get('v1/schema/schema_view/', {params})
}

export function get_instances(params) {
    return request.get('v1/schema/instance_view/', {params})
}

export function get_process_list(instanceId) {
    return request({
        url: `v1/schema/instance_view/${instanceId}/get_process_list/`,
        method: 'get'
    })
}

export function kill_process_by_id(instanceId, processId){
    return request({
        url: `v1/schema/instance_view/${instanceId}/kill_process_list/`,
        method: 'delete',
        data: {
            process_id: processId
        }
    })
}

export function installMySQL(instance) {
    return request({
        url: 'v1/schema/instance_view/install_mysql/',
        method: 'post',
        data: instance
    })
}


export function getSchemaNameList(params){
    return request({
        url: '/v1/schema/schema_view/get_distinct_schema_names/',
        method: 'get',
        params: params
    })
}

export function querySlowSQL(params) {
    return request({
        url: '/v1/schema/es_document/search/',
        method: 'get',
        params: params
    })
}

export function getGlobalSetting(params){
    return request({
        url: 'v1/schema/alarm_setting/global_setting/',
        method: 'GET',
        params: params
    })
}

export function saveGlobalSetting(data) {
    return request({
        url: 'v1/schema/alarm_setting/global_setting/',
        method: 'POST',
        data: data
    })
}

export function getSchemaSetting(params) {
    return request({
        url: 'v1/schema/alarm_setting/',
        method: 'GET',
        params: params
    })
}

export function saveSchemaSetting(data) {
    return request({
        url: 'v1/schema/alarm_setting/',
        method: 'POST',
        data: data
    })
}

export function updateSchemaSetting(data) {
    return request({
        url: `v1/schema/alarm_setting/${data.id}/`,
        method: 'PUT',
        data: data
    })
}

export function getSQLId(data){
    return request({
        url: `v1/schema/alarm_setting/get_sql_id/`,
        method: 'POST',
        data: data
    })
}

export function saveSQLSetting(data) {
    return request({
        url: 'v1/schema/alarm_setting/',
        method: 'POST',
        data: {
            'type': 'sql',
            ...data
        }
    })
}

export function updateSQLSetting(data) {
    return request({
        url: `v1/schema/alarm_setting/${data['id']}/`,
        method: 'PUT',
        data: {
            'type': 'sql',
            ...data
        }
    })
}


export function getAggsByDate(params) {
    return request({
        url: 'v1/schema/es_document/get_aggs_by_date/',
        method: 'get',
        params: params
    })
}
