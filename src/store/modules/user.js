import JSEncrypt from 'jsencrypt'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/api/user'
const rasPublicKey = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n" +
    "FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n" +
    "xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n" +
    "gwQco1KRMDSmXSMkDwIDAQAB\n" +
    "-----END PUBLIC KEY-----"

export default {
    state: () => ({
        username: getToken()

    }),
    mutations: {
        setUsername(state, username) {
            state.username = username
        }
    },
    actions: {
        login({ commit }, loginRequest) {
            const { username, password } = loginRequest
            // let encrypt = new JSEncrypt();
            // encrypt.setPublicKey(rasPublicKey)
            // let encrypted = encrypt.encrypt(password)
            
            return new Promise((resolve, reject) => {
                login(loginRequest).then(resp => {
                    commit('setUsername', username)
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
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(resp => {
                    console.log(resp)
                    resolve(resp)
                }).catch(err => {
                    resolve()
                })
            })
        }
    },
    getters: {}
}

