// Model
const UserClass = require('../models/User')
const Course = require('../models/Course')


module.exports = {
    getCourses(req, res) {
        Course.listOfCourses().then(courses => {
            res.send({ courses: courses })
        })
    },
    addCourse(req, res) {
        Course.addCourse({dept: req.body.dept, name: req.body.name, number: req.body.number, section: req.body.section, description: req.body.description, unit: req.body.unit, professor: req.body.professor, room: req.body.room}).then(course => {
            res.send({course: course})
        })
        // error
        .catch(err => res.status(400).send({error: "Section of this course already exists!"}))
    },
    enrollCourse(req, res) {
        UserClass.User.findOneAndUpdate({ name: req.body.userName }, { "$push": { courses: req.body.courseId } })
            .then(found => {
                res.send({ courseId: courseId })
            })
            // error
            .catch(err => res.status(400).send({ error: "Course not found!" }))
    },


}