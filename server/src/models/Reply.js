const Mongoose = require('mongoose')

// Schema for Replies
const ReplySchema = new Mongoose.Schema({
    threadId: String,
    author: Object,
    descripton: String
}, { strict: false })

const Reply = Mongoose.model('replies', ReplySchema)

// Array of assignments
const listOfReplies = () => Reply.find({ description: { $ne: null } })

// Used to check if a reply exists already 
const findReply = (reply) => Reply.findOne({ threadId: reply.threadId, author: reply.author, description: reply.description })

// Find reply using id
const findReplyById = (replyId) => Reply.findOne({_id: replyId})

// Reply to thread
const addReply = (reply) => {
    return findReply(reply)
        .then(found => {
            // Check if reply is posted already
            if (found) {
                throw new Error('Reply already exists')
            }

            const date = new Date()
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const day = ('0' + date.getDate()).slice(-2)
            const year = date.getFullYear()
            const formattedDate = year + "-" + day + "-" + month

            // Return an object if post doesnt exist
            return {
                threadId: reply.threadId,
                author: reply.author,
                description: reply.description,
                postedDate: formattedDate
            }
        })
        .then(reply => Reply.create(reply))
}

// Remove reply
const removeReply = (replyId) => {
    return Reply.findOneAndDelete({_id: replyId})
}

// Edit reply
const editReply = (reply) => {
    return Reply.findOneAndUpdate({ _id: reply._id }, { "$set": { description: reply.description } })
}

// Remove replies using thread id
const removeRepliesByThreadId = (threadId) => {
    return Reply.deleteMany({threadId: threadId})
}

// Remove replies using multiple thread ids (when you remove a course, it should remove everything that is relevant to the course)
const removeRepliesByThreads = (threads) => {
    return Reply.remove({threadId: {$in:threads}})
}

module.exports = {
    listOfReplies,
    addReply,
    removeReply,
    findReplyById,
    editReply,
    removeRepliesByThreadId,
    removeRepliesByThreads
}