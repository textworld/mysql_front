import request from '@/utils/request'

/**
 * 获取数据库列表
 * @param {} params 
 * @returns 
 */
export function getDbSchemaList(params) {
    return request({
        url: '/v1/schema_info/db_schema/',
        method: 'get',
        params: params
    })
}
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