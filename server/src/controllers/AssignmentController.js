// Model
const Assignment = require('../models/Assignment')

module.exports = {
    getAssignments(req, res) {
        Assignment.listOfAssignments().then(assignments => {
            res.send({ assignments: assignments })
        })
        // error
        .catch(err => res.status(400).send({error : "Can't get assignments"}))
    },
    getAssignment(req, res) {
        Assignment.findAssignmentById(req.params.assignmentId).then(assignment => {
            res.send({assignment: assignment})
        })
        // error
        .catch(err => res.status(400).send({error : "Assignment does not exist!"}))
    },
    postAssignment(req, res) {
        Assignment.postAssignment(req.body).then(assignment => {
            res.send({assignment: assignment})
        })
        // error
        .catch(err => res.status(400).send({error : "The assignment already exists! Choose different title and description."}))
    }
}