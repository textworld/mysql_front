import request from '@/utils/request'

export function simple_login(data) {
    return request.post('/index/simple_login/', data)
}

export function login(data) {
    return request.post('v1/user_app/login/', data)
}

export function getLoginUser(){
    return request.get('v1/user_app/user/')
}

export function logout() {
    return request.get('v1/user_app/logout/')
}