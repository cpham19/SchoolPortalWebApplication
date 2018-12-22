// Model
const Forum = require('../models/Forum')


module.exports = {
    getThreads(req, res) {
        Forum.listOfThreads().then(threads => {
            res.send({ threads: threads })
        })
        // error
        .catch(err => res.status(400).send({ error: "Can't get list of threads!" }))
    },
    postThread(req, res) {
        Forum.postThread(req.body).then(thread => {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Title of the thread exists!" }))
    },
    removeThread(req, res) {
        Forum.removeThread(req.params.threadId).then(thread=> {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Thread deletion error" }))
    },
    editThread(req, res) {
        Forum.editThread(req.body).then(thread => {
            res.send({ thread: thread })
        })
        // error
        .catch(err => res.status(400).send({ error: "Editting thread error" }))
    },
}