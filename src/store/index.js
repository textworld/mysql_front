import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from "@/utils/auth";

Vue.use(Vuex)
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
export default new Vuex.Store({
  state: {
    count: 0,
    token: getToken(),
    username: '',
    user: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setToken (state, token) {
      state.token = token
    },
    setUsername (state, username) {
      state.username = username
    }
  },
  actions: {
    // userInfo {username: 'yxh', password: 'xxx'}
    login({ commit }, userInfo) {
      // let promise = function (executor) {
      //   let resolve = function (){
      //     // xxxx
      //   }
      //   let reject = function (){
      //     //  xxx
      //   }
      //   executor(resolve, reject)
      // }

      //func(1, 2)

      // func(function (resolve){
      //   return resolve + 1
      // }, function(resolve) {
      //   return resolve + 1
      // })


      // 下面两种等价写法
      // return new Promise(function (resolve, reject){
      //
      // })

      // return new Promise((resolve, reject) => {
      //
      // })

      const {username, password} = userInfo
      return new Promise( (resolve, reject) => {
        if (username === 'zzz' && password === 'zzz') {
          const token = 'xxxxxx'
          setToken(token)
          commit('setUsername', username)
          commit('setToken', token)
          resolve('login success')
        }else{
          reject('login failed')
        }
      })
    },
    getUserInfo({ commit }){
      return new Promise((resolve, reject) => {
        // 模拟异步操作
        const username = 'zhangwenbing'
        commit('setUsername', username)
        resolve(username)
      })
    }
  },
  modules: {
  }
})
