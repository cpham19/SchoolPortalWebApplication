const Mongoose = require('mongoose')

// Schema for Courses
const CourseSchema = new Mongoose.Schema({
    dept: String,
    name: String,
    number: String,
    section: String,
    description: String,
    selectedDays: Array,
    startingTime: String,
    endingTime: String,
    unit: String,
    professor: String,
    room: String,
}, { strict: false })

const Course = Mongoose.model('courses', CourseSchema)

// Array of courses
const listOfCourses = () => Course.find({ dept: { $ne: null } })

// Used to check if a course exists already (based on dept, number, and section)
const findCourseByDeptAndNumAndSection = (course) => Course.findOne({ dept: course.dept, number: course.number, section: course.section })

const findCourseById = (courseId) => Course.findOne({ "_id": courseId })

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
                selectedDays: course.selectedDays,
                startingTime: course.startingTime,
                endingTime: course.endingTime,
                professor: course.professor,
                room: course.room,
            }
        })
        // Create course 
        .then(course => {
            return Course.create(course)
        })
}
// Remove course
const removeCourse = (courseId) => {
    return Course.deleteOne({ "_id": courseId }).then(obj => {
        return courseId
    })
}

// Edit course
const editCourse = (course) => {
    return Course.findOneAndUpdate({ _id: course._id }, { "$set": { dept: course.dept, name: course.name, number: course.number, section: course.section, description: course.description, unit: course.unit, selectedDays: course.selectedDays, startingTime: course.startingTime, endingTime: course.endingTime, professor: course.professor, room: course.room }})
    .then(oldCourse => {
        return course
    })
}

module.exports = {
    listOfCourses,
    addCourse,
    removeCourse,
    editCourse,
    findCourseById
}