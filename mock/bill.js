const util = require('./utils');
module.exports = [
    // 账单数据
    {
        url: '/v1/bill/bill_data/',
        type: 'get',
        response: _ => {
            return util.getJsonFile('./json_file/bill.json')
        }
    }
]