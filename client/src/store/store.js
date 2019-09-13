import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    // Strict determines if you can change the state (with setters)
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        user: null,
        token: null,
        isUserLoggedIn: false,
        isUserProfessor: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (state.user != null) {
                state.isUserProfessor = state.user.isProfessor
            }
        },
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        enrollCourse(state, courseId) {
            state.user.courses.push(courseId)
        },
        removeCourse(state, courseId) {
            state.user.courses = state.user.courses.filter(id => !(id === courseId))
        },
        dropCourse(state, courseId) {
            state.user.courses = state.user.courses.filter(id => !(id === courseId))
        }
    },
    actions: {
        setUser({commit}, user) {
            commit('setUser', user)
        },
        setToken({commit}, token) {
            // Call setToken and pass token object
            commit('setToken', token)
        },
        enrollCourse({commit}, courseId) {
            commit("enrollCourse", courseId)
        },
        removeCourse({commit}, courseId) {
            commit("removeCourse", courseId)
        },
        dropCourse({commit}, courseId) {
            commit("dropCourse", courseId)
        }
    }
})
