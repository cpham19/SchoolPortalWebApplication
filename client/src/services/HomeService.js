import Api from '@/services/Api'

export default {
    fetchHome() {
        return Api().get('home')
    }
}