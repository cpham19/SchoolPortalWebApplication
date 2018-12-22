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
    }
}