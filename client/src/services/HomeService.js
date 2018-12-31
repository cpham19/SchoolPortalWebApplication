import Api from '@/services/Api'

export default {
    fetchHome() {
        return Api().get('home')
    },
    getUser(userId) {
        return Api().get(`user/${userId}`)
    }
}