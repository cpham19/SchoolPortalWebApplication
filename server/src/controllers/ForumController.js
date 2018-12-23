// Model
const Forum = require('../models/Forum')
const Reply = require('../models/Reply')

module.exports = {
    getThreads(req, res) {
        Forum.listOfThreads().then(threads => {
            res.send({ threads: threads })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't get list of threads!" }))
    },
    getThread(req, res) {
        Forum.findThreadById(req.params.threadId).then(thread => {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't find thread!" }))
    },
    postThread(req, res) {
        Forum.postThread(req.body).then(thread => {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Title of the thread exists!" }))
    },
    async removeThread(req, res) {
        try {
            const forumResponse = await Forum.removeThread(req.params.threadId)
            const replyResponse = await Reply.removeRepliesByThreadId(req.params.threadId)

            res.send({thread: forumResponse})
        }
        catch(err) {
            res.status(400).send({ error: "Thread deletion error" })
        }
    },
    editThread(req, res) {
        Forum.editThread(req.body).then(thread => {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Editting thread error" }))
    },
    getReplies(req, res) {
        Reply.listOfReplies().then(replies => {
            res.send({ replies: replies })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't get list of threads!" }))
    },
    getReply(req, res) {
        Reply.findReplyById(req.params.replyId).then(reply => {
            res.send({ reply: reply })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't find the reply!" }))
    },
    editReply(req, res) {
        Reply.editReply(req.body).then(reply => {
            res.send({ reply: reply })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't edit the reply!" }))
    },
    async addReply(req, res) {
        try {
            const reply = await Reply.addReply(req.body)
            const thread = await Forum.addReply(reply)
            res.send({reply: reply})
        }
        catch(err) {
            res.status(400).send({ error: "Reply exists already" })
        }
    },
    async removeReply(req, res) {
        try {
            const reply = await Reply.removeReply(req.params.replyId)
            const thread = await Forum.removeReply(reply)
            res.send({replyId: req.params.replyId})
        }
        catch(err) {
            res.status(400).send({ error: "Reply exists already" })
        }
    },
}