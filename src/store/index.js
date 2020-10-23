import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from "@/utils/auth";
import User from './modules/user'
import dbtables from "@/store/modules/dbtables";
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
  modules: {
    user: User,
    dbLexicon: dbtables
  }
})
