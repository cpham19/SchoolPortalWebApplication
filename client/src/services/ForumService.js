import Api from '@/services/Api'

export default {
    getThreads() {
        return Api().get('forum')
    },
    getThread(threadId) {
        return Api().get(`forum/${threadId}`)
    },
    postThread(thread) {
        return Api().post('forum/post', thread)
    },
    editThread(thread) {
        return Api().put(`forum/edit/${thread._id}`, thread)
    },
    removeThread(threadId) {
        return Api().delete(`forum/remove/${threadId}`)
    },
    addReply(reply) {
        return Api().post('forum/addreply', reply)
    },
    getReplies() {
        return Api().get('replies')
    },
    getReply(replyId) {
        return Api().get(`reply/${replyId}`)
    },
    editReply(reply) {
        return Api().put(`reply/edit/${reply._id}`, reply)
    },
    removeReply(replyId) {
        return Api().delete(`forum/removereply/${replyId}`)
    },
}