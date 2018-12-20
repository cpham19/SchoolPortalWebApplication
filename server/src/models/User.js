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
    admin: Boolean,
    courses: Array,
}, { strict: false })

const User = Mongoose.model('users', UserSchema)

// Array of users
const listOfUsers = () => User.find({ userName: { $ne: null } }, { password: 0 })

// Used for validating user for login
const findUserByName = (userName) => User.findOne({ userName: { $regex: `^${userName}$`, $options: 'i' } })

// Validating user for logging in
const loginUser = (userName, password) => {
    // Find if the username is in the db
    return findUserByName(userName)
        .then(found => {
            // Checks if username doesn't exist
            if (!found) {
                throw new Error('User does not exists')
            }

            // validate the password
            const valid = validatePassword(password, found.password)
            if (!valid) {
                throw new Error('Invalid Password')
            }

            return found
        })
        // return userName and avatar
        .then(({ firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, admin, courses }) => {
            return { firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, admin, courses }
        })
}

// Create a user
const createUser = (firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, password, administrator) => {
    // Return a user object if username is in db
    return findUserByName(userName)
        .then(found => {
            // Check if username is taken already
            if (found) {
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
                admin: administrator,
                avatar: `https://robohash.org/${userName}`,
                courses: []
            }
        })
        // Create user from user object 
        .then(user => User.create(user))
        // Return userName, avatar, admin, and courses
        .then(({ firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, admin, courses }) => {
            return { firstName, lastName, streetAddress, city, state, zipCode, email, phoneNumber, userName, avatar, admin, courses }
        })
}

const enrollCourse = (obj) => {
    return User.findOneAndUpdate({ userName: obj.userName }, { "$push": { courses: obj.courseId} })
    .then(found => {
        return { courseId: obj.courseId }
    })
}

// Drop course for user
const dropCourse = (userName, courseId) => {
    return User.findOneAndUpdate({ userName: userName }, { '$pull': { courses: courseId } })
        .then(found => {
            return { courseId: courseId}
        })
}


module.exports = {
    listOfUsers,
    createUser,
    loginUser,
    enrollCourse,
    dropCourse
}