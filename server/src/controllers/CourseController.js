// Model
const User = require('../models/User')
const Course = require('../models/Course')
const Assignment = require('../models/Assignment')
const Forum = require('../models/Forum')
const Reply = require('../models/Reply')

module.exports = {
    getCourses(req, res) {
        Course.listOfCourses().then(courses => {
            res.send({ courses: courses })
        })
    },
    getCourse(req, res) {
        Course.findCourseById(req.params.courseId).then(course => {
            res.send({course: course})
        })
    },
    addCourse(req, res) {
        Course.addCourse({ dept: req.body.dept, name: req.body.name, number: req.body.number, section: req.body.section, description: req.body.description, unit: req.body.unit, professor: req.body.professor, room: req.body.room }).then(course => {
            res.send({ course: course })
        })
            // error
            .catch(err => res.status(400).send({ error: "Section of this course already exists!" }))
    },
    enrollCourse(req, res) {
        User.enrollCourse({ userName: req.body.userName, courseId: req.body.courseId }).then(found => {
            res.send({ courseId: req.body.courseId })
        })
         // error
        .catch(err => res.status(400).send({ error: "User not found!" }))
    },
    async removeCourse(req, res) {
        try {
            const userResponse = await User.removeCourse(req.params.courseId)
            const courseResponse = await Course.removeCourse(req.params.courseId)
            const assignmentResponse = await Assignment.removeAssignmentAfterCourseRemoval(req.params.courseId)

            const threads = await Forum.findThreadsByCourseId(req.params.courseId)
            const forumResponse = await Forum.removeThreadsByCourseId(req.params.courseId)

            const threadIds = threads.map(thread => {
                return thread._id
            })

            const replyResponse = await Reply.removeRepliesByThreads(threadIds)

            res.send({courseId: req.params.courseId})
        }
        catch(err) {
            res.status(400).send({ error: "Error when removing course" })
        }
    },
    editCourse(req, res) {
        Course.editCourse({_id: req.body._id, dept: req.body.dept, name: req.body.name, number: req.body.number, section: req.body.section, description: req.body.description, unit: req.body.unit, professor: req.body.professor, room: req.body.room}).then(course => {
            res.send(course)
        })
        // error
        .catch(err => res.status(400).send({ error: "Error when editting course" }))
    },
    dropCourse(req, res) {
        User.dropCourse(req.params.userName, req.params.courseId).then(found => {
            res.send({courseId: req.params.courseId})
        })
        // error
        .catch(err => res.status(400).send({ error: "Error when dropping course" }))
    }
}