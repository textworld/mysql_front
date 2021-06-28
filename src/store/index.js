import Vue from 'vue'
import Vuex from 'vuex'
import { getLoginUser, logout, login } from '@/api/user'
import _ from 'lodash'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: Cookies.getJSON('user')
    },
    mutations: {
        setUser(state, user) {
            Cookies.set('user', user)
            state.user = user
        },
        getUser(state) {
            return state.user;
        }
    },
    getters: {
        username: state => {
            return state.user && state.user.username ? state.user.username : '';
        }
    },
    actions: {
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                login(user).then(resp => {
                    console.log('resp in login', resp)
                    if (resp.code === 2000) {
                        commit('setUser', resp.data)
                        resolve(resp.data)
                    } else {
                        reject(resp.message)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        logout({ commit }) {
            logout().then(resp => {
                commit('setUser', {})
                window.location.reload()
            })
        }
    }
})