module.exports = [
    {
        url: '/v1/schema_info/mysql_schema/test_api/',
        type: 'post',
        response: request => {
            return {
                code: 2000,
                data: [],
                message: ""
            }
        }
    }
]