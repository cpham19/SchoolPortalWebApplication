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
        return Api().post('course/enroll', course)
    },
    removeCourse(courseId) {
        return Api().delete(`course/remove/${courseId}`)
    },
    editCourse(course) {
        return Api().put(`course/edit/${course._id}`, course)
    },
    dropCourse(course) {
        return Api().post(`course/drop/${course.userName}/${course.courseId}`)
    }
}