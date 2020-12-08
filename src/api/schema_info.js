import request from '@/utils/request'

export function getSchemaNameList(params){
    return request({
        url: '/v1/schema_info/mysql_schema/get_distinct_schema_names/',
        method: 'get',
        params: params
    })
}

export function getSchemas(params) {
    return request({
        url: '/v1/schema_info/mysql_schema/',
        method: 'get',
        params: params
    })
}

export function getProcessList(schemaId) {
    return request({
        url: `/v1/schema_info/mysql_schema/${schemaId}/get_process_list/`,
        method: 'get'
    })
}

export function killProcessById(schemaId, processId) {
    return request({
        url: `/v1/schema_info/mysql_schema/${schemaId}/kill_process_list/`,
        method: 'delete',
        data: {
            process_id: processId
        }
    })
}

export function installMySQL(instance) {
    return request({
        url: '/v1/schema_info/mysql_schema/install_mysql/',
        method: 'post',
        data: instance
    })
}