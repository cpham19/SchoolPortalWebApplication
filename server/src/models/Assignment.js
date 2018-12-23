const Mongoose = require('mongoose')

// Schema for Assignments
const AssignmentSchema = new Mongoose.Schema({
    courseId: String,
    title: String,
    description: String,
    dueDate: String,
    postedDate: String,
}, { strict: false })

const Assignment = Mongoose.model('assignments', AssignmentSchema)

// Array of assignments
const listOfAssignments = () => Assignment.find({ title: { $ne: null } })

// Used to check if an assignment exists already 
const findAssignment = (assignment) => Assignment.findOne({ courseId: assignment.courseId, title: assignment.title, description: assignment.description})

const findAssignmentById = (assignmentId) => Assignment.findOne({_id: assignmentId})

// Post assignment
const postAssignment = (assignment) => {
    // Return an assignment object if assignment is not in db
    return findAssignment(assignment)
        .then(found => {
            // Check if assignment is taken already
            if (found) {
                throw new Error('Assignment already exists')
            }

            const date = new Date()
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const day = ('0' + date.getDate()).slice(-2)
            const year = date.getFullYear()
            const formattedDate = year + "-" + month + "-" + day

            // Return an object if assignment doesnt exist
            return {
                courseId: assignment.courseId,
                dueDate: assignment.date,
                title: assignment.title,
                description: assignment.description,
                postedDate: formattedDate
            }
        })
        // Create assignment from assignment object 
        .then(assignment => Assignment.create(assignment))
}

// Edit assignment
const editAssignment = (assignment) => {
    return Assignment.findOneAndUpdate({ _id: assignment._id }, { "$set": { title: assignment.title, description: assignment.description, dueDate: assignment.dueDate } })
    .then(obj => {
        return assignment
    })
}

// Remove assignment
const removeAssignment = (assignmentId) => {
    return Assignment.findOneAndDelete({_id: assignmentId})
}

// Remove assignments when a course is removed
const removeAssignmentAfterCourseRemoval = (courseId) => {
    return Assignment.deleteMany({courseId: courseId})
}

module.exports = {
    listOfAssignments,
    findAssignmentById,
    postAssignment,
    editAssignment,
    removeAssignment,
    removeAssignmentAfterCourseRemoval
}