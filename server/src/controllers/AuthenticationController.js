// Model
let User = require('../models/User')

module.exports = {
    login(req, res) {
        User.loginUser(req.body.userName, req.body.password)
            // success
            .then(user =>
                res.send({
                    user: user
                }))
            // error
            .catch(err => res.status(400).send({error: err}))
    },
    register(req, res) {
        // create user
        User.createUser(req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city, req.body.state, req.body.zipCode, req.body.email, req.body.phoneNumber, req.body.userName, req.body.password, req.body.admin)
            // success
            .then(user =>
                res.send({
                    user: user
                }))
            // error
            .catch(err => res.status(400).send({error: err}))
    }
}