const _ = require('lodash')

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
                        schema_id: 1,
                        status: 'success',
                        task_start: '2020-12-08 23:05',
                        task_end: '2020-12-08 23:30'
                    }
                ]
            }
        }
    }
]