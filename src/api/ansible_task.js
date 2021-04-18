import request from '@/utils/request'

export function queryAnsibleTask(params) {
    return request({
        url: '/v1/schema_info/ansible_task/',
        type: 'get',
        params: params
    })
}

export function queryAnsibleTaskSteps(task_id) {
    return request({
        url: `/v1/schema_info/ansible_task/${task_id}/steps/`,
        type: 'get'
    })
}

export function getAnsibleTaskById(task_id) {
    return request({
        url: `/v1/schema_info/ansible_task/${task_id}/`,
        type: 'get'
    })
}