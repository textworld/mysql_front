const _ = require('lodash')
const Mock = require('mockjs')

const taskSteps = []

for (let i = 0; i < 10; i++) {
    taskSteps.push(Mock.mock({
        id: '@increment',
        task_id: Mock.Random.string(20),
        timestamp: +Mock.Random.date('T'),
        name: '@title(5, 10)',
        'changed|1': [true, false],
        'status|1': ['success', 'failed'],
        result: "xxdfssdfd"
    }))
}
module.exports = [
    {
        url: '/v1/schema_info/ansible_task/',
        type: 'get',
        response: config => {
            return {
                code: 2000,
                data: [
                    {
                        id: 1,
                        task_id: Mock.Random.string(20),
                        schema_id: 1,
                        schema_ip: '192.168.31.1',
                        schema_port: 3306,
                        schema_name: 'name',
                        status: 'success',
                        task_start: '2020-12-08 23:05',
                        task_end: '2020-12-08 23:30'
                    }
                ]
            }
        }
    },
    {
        url: '/v1/schema_info/ansible_task/\\d+/steps/',
        type: 'get',
        response: config => {
            return {
                code: 2000,
                data: taskSteps
            }
        }
    }
]