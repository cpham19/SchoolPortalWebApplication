const Joi = require('joi')

module.exports = {
    postAssignment(req, res, next) {
        const schema = {
            courseId: Joi.string().required(),
            date: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'date':
                    res.status(400).send({
                        error: 'You must provide a valid date'
                    })
                    break
                case 'title':
                    res.status(400).send({
                        error: 'You must provide a valid title'
                    })
                    break
                case 'description':
                    res.status(400).send({
                        error: 'You must provide a valid description'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid assignment information'
                    })
            }
        }
        else {
            next()
        }
    }
}