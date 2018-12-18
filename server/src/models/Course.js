const Mongoose = require('mongoose')

// Schema for Courses
const CourseSchema = new Mongoose.Schema({
    dept: String,
    name: String,
    number: String,
    section: String,
    description: String,
    unit: String,
    professor: String,
    room: String,
    assignments: Array,
    threads: Array
}, { strict: false })

const Course = Mongoose.model('courses', CourseSchema)

// Array of courses
const listOfCourses = () => Course.find({ dept: { $ne: null } })

// Used to check if a course exists already (based on dept, number, and section)
const findCourseByDeptAndNumAndSection = (course) => Course.findOne({ dept: course.dept, number: course.number, section: course.section })

// Add course
const addCourse = (course) => {
    // Return a user object if username is in db
    return findCourseByDeptAndNumAndSection(course)
        .then(found => {
            // Check if course exists
            if (found) {
                throw new Error('Course Section of this course already exists')
            }

            // Return an object if username doesnt exist
            return {
                dept: course.dept,
                name: course.name,
                number: course.number,
                section: course.section,
                description: course.description,
                unit: course.unit,
                professor: course.professor,
                room: course.room,
                assignments: [],
                threads: []
            }
        })
        // Create course 
        .then(course => {
            return Course.create(course)
        })
}

// Enroll course for user
const enrollCourse = (userName, courseId) => {
    return User.findOneAndUpdate({ name: userName }, { "$push": { courses: courseId } })
        .then(found => {
            return courseId
        })
}

// Drop course for user
const dropCourse = (userName, courseId) => {
    return User.findOneAndUpdate({ name: userName }, { '$pull': { courses: courseId } })
        .then(found => {
            return courseId
        })
}

// Remove course
const removeCourse = (courseId) => {
    return Course.remove({ _id: courseId })
        .then(obj => User.updateMany({}, { "$pull": { courses: courseId } }))
        .then(obj => Assignment.remove({ courseId: courseId }))
        .then(obj => Thread.remove({ courseId: courseId }))
        .then(obj => {
            return courseId
        })
}

// Edit course
const editCourse = (course) => {
    return Course.findOneAndUpdate({ _id: course._id }, { "$set": { dept: course.dept, name: course.name, number: course.number, section: course.section, description: course.description, unit: course.unit, prof: course.prof, room: course.room }})
    .then(obj => {
        return course
    })
}

module.exports = {
    listOfCourses,
    addCourse,
    editCourse
}