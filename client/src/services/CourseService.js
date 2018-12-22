import Api from '@/services/Api'

export default {
    fetchCourses() {
        return Api().get('course')
    },
    getCourse(courseId) {
        return Api().get(`course/${courseId}`)
    },
    addCourse(course) {
        return Api().post('course/add', course)
    },
    enrollCourse(course) {
        return Api().post('course/search', course)
    },
    removeCourse(courseId) {
        return Api().post(`course/remove/${courseId}`)
    },
    editCourse(course) {
        return Api().post('course/edit', course)
    },
    dropCourse(course) {
        return Api().post('course/drop', course)
    }
}