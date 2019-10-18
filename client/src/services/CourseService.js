import Api from '@/services/Api'

export default {
    fetchCourses() {
        return Api().get('courses')
    },
    getCourse(courseId) {
        return Api().get(`courses/${courseId}`)
    },
    addCourse(course) {
        return Api().post('courses/add', course)
    },
    enrollCourse(course) {
        return Api().post('courses/enroll', course)
    },
    removeCourse(courseId) {
        return Api().delete(`courses/remove/${courseId}`)
    },
    editCourse(course) {
        return Api().put(`courses/edit/${course._id}`, course)
    },
    dropCourse(course) {
        return Api().post(`courses/drop/${course.userId}&${course.courseId}`)
    }
}