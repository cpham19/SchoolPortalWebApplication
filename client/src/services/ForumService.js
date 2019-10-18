import Api from '@/services/Api'

export default {
    getThreads() {
        return Api().get('forums')
    },
    getThread(threadId) {
        return Api().get(`forums/${threadId}`)
    },
    postThread(thread) {
        return Api().post('forums/post', thread)
    },
    editThread(thread) {
        return Api().put(`forums/edit/${thread._id}`, thread)
    },
    removeThread(threadId) {
        return Api().delete(`forums/remove/${threadId}`)
    },
    addReply(reply) {
        return Api().post('replies/addreply', reply)
    },
    getReplies() {
        return Api().get('replies')
    },
    getReply(replyId) {
        return Api().get(`replies/${replyId}`)
    },
    editReply(reply) {
        return Api().put(`replies/edit/${reply._id}`, reply)
    },
    removeReply(replyId) {
        return Api().delete(`replies/removereply/${replyId}`)
    },
}