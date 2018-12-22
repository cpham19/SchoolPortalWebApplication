const Mongoose = require('mongoose')

// Schema for Threads
const ThreadSchema = new Mongoose.Schema({
    courseId: String,
    author: Object,
    title: String,
    description: String,
    replies: Array,
}, { strict: false })

const Thread = Mongoose.model('threads', ThreadSchema)

// Array of assignments
const listOfThreads = () => Thread.find({ title: { $ne: null } })

// Used to check if a thread exists already 
const findThread = (thread) => Thread.findOne({courseId: thread.courseId, title: thread.title})

// Post Thread
const postThread = (thread) => {
    // Return a thread object if thread is not in db
    return findThread(thread)
        .then(found => {
            // Check if post is taken already
            if (found) {
                throw new Error('Title of Thread already exists')
            }

            const date = new Date()
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const day = ('0' + date.getDate()).slice(-2)
            const year = date.getFullYear()
            const formattedDate = year + "-" + day + "-" + month

            // Return an object if post doesnt exist
            return {
                courseId: thread.courseId,
                author: thread.author,
                title: thread.title,
                description: thread.description,
                replies: [],
                postedDate: formattedDate
            }
        })
        // Create thread from thread object 
        .then(thread => Thread.create(thread))
}

// Remove assignment
const removeThread = (threadId) => {
    return Thread.findOneAndDelete({_id: threadId})
}

// Edit thread
const editThread = (thread) => {
    return Thread.findOneAndUpdate({ _id: thread._id }, { "$set": { title: thread.title, description: thread.description } })
}

module.exports = {
    listOfThreads,
    postThread,
    removeThread,
    editThread
}