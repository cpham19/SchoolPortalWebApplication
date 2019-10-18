import Api from '@/services/Api'

export default {
    getAssignments() {
        return Api().get('assignments')
    },
    getAssignment(assingmentId) {
        return Api().get(`assignments/${assingmentId}`)
    },
    postAssignment(assignment) {
        return Api().post('assignments/post', assignment)
    },
    editAssignment(assignment) {
        return Api().put(`assignments/edit/${assignment._id}`, assignment)
    },
    removeAssignment(assignmentId) {
        return Api().delete(`assignments/remove/${assignmentId}`)
    }
}