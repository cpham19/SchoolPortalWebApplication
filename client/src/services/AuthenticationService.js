import Api from '@/services/Api'

export default {
    login (credentials) {
        return Api().post('', credentials)
    },
    register (credentials) {
        return Api().post('register', credentials)
    }
}