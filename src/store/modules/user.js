import JSEncrypt from 'jsencrypt'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/api/user'
import _ from 'lodash'
const rasPublicKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n" +
    "FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n" +
    "xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n" +
    "gwQco1KRMDSmXSMkDwIDAQAB\n" +
    "-----END PUBLIC KEY-----"

export default {
    state: {
        user: {}
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setUser(state, user) {
            state.user = user
        },
        resetUser(state) {
            state.user = {}
        }
    },
    actions: {
        login({ commit }, loginRequest) {
            const { username, password } = loginRequest
            return new Promise((resolve, reject) => {
                login(loginRequest).then(resp => {
                    console.log('login:', resp)
                    commit('setUser', username)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(resp => {
                    removeToken()
                    commit('setUsername', '')
                    resolve()
                }).catch(err => {
                    console.error('failed to logout', err)
                    reject(err)
                })
            })
        },
        getUserInfo(context) {
            let {commit, state} = context

            return new Promise((resolve, reject) => {
                if (_.isEmpty(state.user)) {
                    getUserInfo().then(resp => {
                        console.log(resp)
                        commit('setUser', resp)
                        resolve(resp)
                    }).catch(_ => {
                        resolve()
                    })
                }else{
                    resolve(state.user)
                }

            })
        }
    },
    getters: {}
}

