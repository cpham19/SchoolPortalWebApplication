const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CourseController = require('./controllers/CourseController')
const CourseControllerPolicy = require('./policies/CourseControllerPolicy')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({ message: `Welcome to the login page` })
    })

    app.get('/register', (req, res) => {
        res.send({ message: `Welcome to the register page` })
    })

    app.post('/', AuthenticationController.login)

    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

    app.post('/course/add', CourseControllerPolicy.addCourse, CourseController.addCourse)

    // Home handler 
    app.get('/home', (req, res) => {
        res.send(
            [{
                title: "This is where you see your home"
            }]
        )
    })

    // Course handler 
    app.get('/course', CourseController.getCourses)

    // Course handler 
    app.get('/course/add', (req, res) => {
        res.send(
            [{
                title: "This is where you add your courses"
            }]
        )
    })

    // Course handler 
    app.get('/course/remove', (req, res) => {
        res.send(
            [{
                title: "This is where you remove your courses"
            }]
        )
    })

    // Course handler 
    app.get('/course/edit', (req, res) => {
        res.send(
            [{
                title: "This is where you edit your course"
            }]
        )
    })

    // Course handler 
    app.get('/course/drop', (req, res) => {
        res.send(
            [{
                title: "This is where you drop your course"
            }]
        )
    })

    // Assignment handler 
    app.get('/assignment', (req, res) => {
        res.send(
            [{
                title: "This is where you see your assignments"
            }]
        )
    })
}
