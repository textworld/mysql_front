import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from "@/utils/auth";
import User from './modules/user'
<<<<<<< HEAD

=======
import dbtables from "@/store/modules/dbtables";
>>>>>>> c085a8d04d63b920252423562040d7107f5698e9
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
<<<<<<< HEAD
    user: User
=======
    user: User,
    dbLexicon: dbtables
>>>>>>> c085a8d04d63b920252423562040d7107f5698e9
  }
})
