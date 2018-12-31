// Model
const User = require('../models/User')

module.exports = {
    getUser(req, res) {
        User.findUserById(req.params.userId)
            // success
            .then(user =>
                res.send({
                    user: user,
                })
            )
            // error
            .catch(err => res.status(400).send({error: "Invalid userId"}))
    },
}