const Mongoose = require('mongoose'),
    { generateHash, validatePassword } = require('./validate')

// Schema for User 
const UserSchema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    email: String,
    phoneNumber: String,
    userName: String,
    avatar: String,
    password: String,
    isUserProfessor: Boolean,
    courses: Array,
}, { strict: false })

const User = Mongoose.model('users', UserSchema)

// Array of users
const listOfUsers = () => User.find({ userName: { $ne: null } }, { password: 0 })

// Used for validating user for login
const findUserByName = (userName) => User.findOne({ userName: userName })

// Used for finding user by id (when a user wants to see another user's profile)
const findUserById = (userId) => {
    return User.findOne({ _id: userId })
        // return user info
        .then(({ _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }) => {
            return { _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }
        })
}

// Validating user for logging in
const loginUser = (userName, password) => {
    // Find if the username is in the db
    return findUserByName(userName)
        .then(user => {
            // Checks if username doesn't exist
            if (!user) {
                throw new Error('User does not exists')
            }

            // validate the password
            const valid = validatePassword(password, user.password)
            if (!valid) {
                throw new Error('Invalid Password')
            }

            return user
        })
        // return user info
        .then(({ _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }) => {
            return { _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }
        })
}

// Create a user
const createUser = (firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, password, isUserProfessor) => {
    // Return a user object if username is in db
    return findUserByName(userName)
        .then(user => {
            // Check if username is taken already
            if (user) {
                throw new Error('Username already exists')
            }

            // Return an object if username doesnt exist
            return {
                firstName: firstName,
                lastName: lastName,
                streetAddress: streetAddress,
                city: city,
                state: state,
                zipCode: zipCode,
                email: email,
                phoneNumber: phoneNumber,
                userName: userName,
                password: generateHash(password),
                isUserProfessor: isUserProfessor,
                avatar: `https://robohash.org/${userName}`,
                courses: []
            }
        })
        // Create user from user object 
        .then(user => User.create(user))
        // return user info
        .then(({ _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }) => {
            return { _id, firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, isUserProfessor, courses }
        })
}

const enrollCourse = (obj) => {
    return User.findOneAndUpdate({ _id: obj.userId }, { "$push": { courses: obj.courseId } })
        .then(user => {
            return { courseId: obj.courseId }
        })
}

// Drop course for user
const dropCourse = (userId, courseId) => {
    return User.findOneAndUpdate({ _id: userId  }, { '$pull': { courses: courseId } })
        .then(user => {
            return { courseId: courseId }
        })
}

// Remove course (if users are still enrolled in a course that was removed)
const removeCourse = (courseId) => {
    return User.updateMany({}, { "$pull": { courses: courseId } })
}

module.exports = {
    listOfUsers,
    createUser,
    loginUser,
    enrollCourse,
    dropCourse,
    removeCourse,
    findUserById
}