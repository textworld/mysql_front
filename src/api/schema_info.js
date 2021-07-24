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
