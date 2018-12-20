const Joi = require('joi')

module.exports = {
    addCourse(req, res, next) {
        const schema = {
            dept: Joi.string().required(),
            name: Joi.string().required(),
            number: Joi.string().regex(/^\d{4}/).required(),
            section: Joi.string().required(),
            description: Joi.string().required(),
            unit: Joi.string().required(),
            professor: Joi.string().required(),
            room: Joi.string().required(),
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'dept':
                    res.status(400).send({
                        error: 'You must provide a valid course department'
                    })
                    break
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a valid course name'
                    })
                    break
                case 'number':
                    res.status(400).send({
                        error: 'You must provide a valid course number'
                    })
                    break
                case 'section':
                    res.status(400).send({
                        error: 'You must provide a valid course section'
                    })
                    break
                case 'description':
                    res.status(400).send({
                        error: 'You must provide a valid course description'
                    })
                    break
                case 'unit':
                    res.status(400).send({
                        error: 'You must provide a valid course unit'
                    })
                    break
                case 'professor':
                    res.status(400).send({
                        error: 'You must provide a valid course professor name'
                    })
                    break
                case 'room':
                    res.status(400).send({
                        error: 'You must provide a valid course room'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid course information'
                    })
            }
        }
        else {
            next()
        }
    },
    editCourse(req, res, next) {
        const schema = {
            _id: Joi.string(),
            dept: Joi.string().required(),
            name: Joi.string().required(),
            number: Joi.string().regex(/^\d{4}/).required(),
            section: Joi.string().required(),
            description: Joi.string().required(),
            unit: Joi.string().required(),
            professor: Joi.string().required(),
            room: Joi.string().required(),
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'dept':
                    res.status(400).send({
                        error: 'You must provide a valid course department'
                    })
                    break
                case 'name':
                    res.status(400).send({
                        error: 'You must provide a valid course name'
                    })
                    break
                case 'number':
                    res.status(400).send({
                        error: 'You must provide a valid course number'
                    })
                    break
                case 'section':
                    res.status(400).send({
                        error: 'You must provide a valid course section'
                    })
                    break
                case 'description':
                    res.status(400).send({
                        error: 'You must provide a valid course description'
                    })
                    break
                case 'unit':
                    res.status(400).send({
                        error: 'You must provide a valid course unit'
                    })
                    break
                case 'professor':
                    res.status(400).send({
                        error: 'You must provide a valid course professor name'
                    })
                    break
                case 'room':
                    res.status(400).send({
                        error: 'You must provide a valid course room'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid course information'
                    })
            }
        }
        else {
            next()
        }
    }
}