import Api from '@/services/Api'

export default {
    fetchCourses() {
        return Api().get('course')
    },
    addCourse(course) {
        return Api().post('course/add', course)
    }
}