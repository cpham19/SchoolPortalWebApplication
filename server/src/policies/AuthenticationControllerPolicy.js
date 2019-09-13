const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            streetAddress: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipCode: Joi.string().regex(/^\d{5}/).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
            phoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
            userName: Joi.string().alphanum().min(3).max(15).required(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{3,10}$')
            ).required(),
            isUserProfessor: Joi.boolean().required()
        }

        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'firstName':
                    res.status(400).send({
                        error: 'You must provide a valid first name'
                    })
                    break
                case 'lastName':
                    res.status(400).send({
                        error: 'You must provide a valid last name'
                    })
                    break
                case 'streetAddress':
                    res.status(400).send({
                        error: 'You must provide a valid street address'
                    })
                    break
                case 'city':
                    res.status(400).send({
                        error: 'You must provide a valid city'
                    })
                    break
                case 'state':
                    res.status(400).send({
                        error: 'You must provide a valid state'
                    })
                    break
                case 'zipCode':
                    res.status(400).send({
                        error: 'You must provide a valid zipcode (number of digits has to be 5, ex: 12345)'
                    })
                    break
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email (must have two domain parts: example@yahoo.com)'
                    })
                    break
                case 'phoneNumber':
                    res.status(400).send({
                        error: 'You must provide a valid phone number (in this format: XXX-XXX-XXXX where X is a digit (0-9))'
                    })
                    break
                case 'userName':
                    res.status(400).send({
                        error: 'You must provide a valid username (3 to 15 characters allowed)'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'You must provide a valid password (3 to 10 characters allowed)'
                    })
                    break
                case 'isUserProfessor':
                    res.status(400).send({
                        error: 'You must have a boolean value for isUserProfessor'
                    })
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        }
        else {
            next()
        }
    }
}