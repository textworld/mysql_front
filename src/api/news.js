import request from '@/utils/request'

export function getNews(params){
    return request({
        url: '/v1/news/news/',
        method: 'get',
        params: params
      })
}