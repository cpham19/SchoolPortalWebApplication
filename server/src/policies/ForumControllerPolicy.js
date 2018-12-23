const Joi = require('joi')

module.exports = {
    postThread(req, res, next) {
        const schema = {
            courseId: Joi.string().required(),
            author: Joi.object().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
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
                        error: 'Invalid thread information'
                    })
            }
        }
        else {
            next()
        }
    },
    editThread(req, res, next) {
        const schema = {
            courseId: Joi.string().required(),
            _id: Joi.string().required(),
            author: Joi.object().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            postedDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
            replies: Joi.array().required()
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
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
                        error: 'Invalid thread information'
                    })
            }
        }
        else {
            next()
        }
    },
    addReply(req, res, next) {
        const schema = {
            threadId: Joi.string().required(),
            author: Joi.object().required(),
            description: Joi.string().required(),
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'description':
                    res.status(400).send({
                        error: 'You must provide a valid description'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid reply information'
                    })
            }
        }
        else {
            next()
        }
    },
    editReply(req, res, next) {
        const schema = {
            _id: Joi.string().required(),
            threadId: Joi.string().required(),
            author: Joi.object().required(),
            description: Joi.string().required(),
            postedDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required()
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'description':
                    res.status(400).send({
                        error: 'You must provide a valid description'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid thread information'
                    })
            }
        }
        else {
            next()
        }
    }
}