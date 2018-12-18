import Api from '@/services/Api'

export default {
    fetchAssignment() {
        return Api().get('assignment')
    }
}