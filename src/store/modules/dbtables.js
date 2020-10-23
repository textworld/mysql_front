import {setToken} from "@/utils/auth";

export default {
    state: () => ({
        dbLexicon: {}

    }),
    mutations: {
        getIdbLexicon (state, username) {
            state.username = username
        },
        setDbLexicon: (state, dbLexicon) => {
            state.dbLexicon[dbLexicon['key']] = dbLexicon['value']
        }
    },
    actions: {
        setIdbLexicon: ({commit}, dbLexicon) => {
            commit('setDbLexicon', dbLexicon)
        }
    },
    getters: {
        getIdbLexicon: (state) => {
            return state.dbLexicon
        }
    }
}
