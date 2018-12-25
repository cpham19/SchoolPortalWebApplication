import Api from '@/services/Api'

export default {
    getAssignments() {
        return Api().get('assignment')
    },
    getAssignment(assingmentId) {
        return Api().get(`assignment/${assingmentId}`)
    },
    postAssignment(assignment) {
        return Api().post('assignment/post', assignment)
    },
    editAssignment(assignment) {
        return Api().put(`assignment/edit/${assignment._id}`, assignment)
    },
    removeAssignment(assignmentId) {
        return Api().delete(`assignment/remove/${assignmentId}`)
    }
}