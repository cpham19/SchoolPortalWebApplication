// Model
const User = require('../models/User')
const jwt = require('jsonwebtoken')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, process.env.JWT_SECRET || 'secret', {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    login(req, res) {
        User.loginUser(req.body.userName, req.body.password)
            // success
            .then(user =>
                res.send({
                    user: user,
                    token: jwtSignUser(user)
                }))
            // error
            .catch(err => res.status(400).send({error: "Invalid username or password"}))
    },
    register(req, res) {
        // create user
        User.createUser(req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city, req.body.state, req.body.zipCode, req.body.email, req.body.phoneNumber, req.body.userName, req.body.password, req.body.isProfessor)
            // success
            .then(user =>
                res.send({
                    user: user
                }))
            // error
            .catch(err => res.status(400).send({error : "Username is already taken"}))
    }
}