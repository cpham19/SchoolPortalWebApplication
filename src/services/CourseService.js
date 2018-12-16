import Api from '@/services/Api'

export default {
    fetchCourse() {
        return Api().get('course')
    }
}