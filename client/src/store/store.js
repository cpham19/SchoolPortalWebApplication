import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // Strict determines if you can change the state (with setters)
    strict: true,
    state: {
        user: null,
        token: null,
        isUserLoggedIn: false,
        courses: null,
        assignments: null,
        threads: null,
        replies: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        }
    },
    actions: {
        setUser({commit}, user) {
            commit('setUser', user)
        },
        setToken({commit}, token) {
            // Call setToken and pass token object
            commit('setToken', token)
        }
    }
})
