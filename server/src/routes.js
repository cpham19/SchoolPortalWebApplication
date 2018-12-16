const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({message: `Welcome to the login page`})
    })

    app.get('/register', (req, res) => {
        res.send({message: `Welcome to the register page`})
    })

    app.post('/', AuthenticationController.login)

    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

    // Home handler 
    app.get('/home', (req, res) => {
        res.send(
            [{
                title: "This is where you see your home"
            }]
        )
    })


    // Course handler 
    app.get('/course', (req, res) => {
        res.send(
            [{
                title: "This is where you see your courses"
            }]
        )
    })

    // Course handler 
    app.get('/assignment', (req, res) => {
        res.send(
            [{
                title: "This is where you see your assignments"
            }]
        )
    })
}
