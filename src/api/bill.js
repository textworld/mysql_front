import request from '@/utils/request'

export function getBillData(params){
    console.log('test')
    return request({
        url: '/v1/bill/bill_data/',
        method: 'get',
        params: params
      })
}