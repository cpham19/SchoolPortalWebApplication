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
        return Api().post('forum/edit', thread)
    },
    removeThread(threadId) {
        return Api().post(`forum/remove/${threadId}`)
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
        return Api().post('reply/edit', reply)
    },
    removeReply(replyId) {
        return Api().post(`forum/removereply/${replyId}`)
    },
}