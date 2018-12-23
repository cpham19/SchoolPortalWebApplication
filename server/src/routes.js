const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CourseController = require('./controllers/CourseController')
const CourseControllerPolicy = require('./policies/CourseControllerPolicy')
const AssignmentController = require('./controllers/AssignmentController')
const AssignmentControllerPolicy = require('./policies/AssignmentControllerPolicy')
const ForumController = require('./controllers/ForumController')
const ForumControllerPolicy = require('./policies/ForumControllerPolicy')

module.exports = (app) => {
    // Login/Register handler
    app.get('/', (req, res) => {res.send({ message: `Welcome to the login page` })})
    app.get('/register', (req, res) => {res.send({ message: `Welcome to the register page` })})
    app.post('/', AuthenticationController.login)
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

    // Home handler 
    app.get('/home', (req, res) => {res.send([{ title: "This is where you see your home" }])})

    // Course handler 
    app.get('/course', CourseController.getCourses)
    app.get('/course/:courseId', CourseController.getCourse)
    app.get('/course/add', (req, res) => { res.send([{ title: "This is where you add your courses" }]) })
    app.get('/course/remove', (req, res) => { res.send([{ title: "This is where you remove your courses" }]) })
    app.get('/course/search', (req, res) => { res.send([{ title: "This is where you search and enroll your course" }]) })
    app.get('/course/edit', (req, res) => { res.send([{ title: "This is where you edit your course" }]) })
    app.get('/course/drop', (req, res) => { res.send([{ title: "This is where you drop your course" }]) })

    app.post('/course/add', CourseControllerPolicy.addCourse, CourseController.addCourse)
    app.post('/course/search', CourseController.enrollCourse)
    app.post('/course/remove/:courseId', CourseController.removeCourse)
    app.post('/course/edit', CourseControllerPolicy.editCourse, CourseController.editCourse)
    app.post('/course/drop', CourseController.dropCourse)

    // Assignment handler 
    app.get('/assignment/:assignmentId', AssignmentController.getAssignment)
    app.get('/assignment', AssignmentController.getAssignments)
    app.post('/assignment/post', AssignmentControllerPolicy.postAssignment, AssignmentController.postAssignment)
    app.post('/assignment/edit', AssignmentControllerPolicy.editAssignment, AssignmentController.editAssignment)
    app.post('/assignment/remove/:assignmentId', AssignmentController.removeAssignment)

    // Forum handler
    app.get('/forum', ForumController.getThreads)
    app.get('/forum/:threadId', ForumController.getThread)
    app.post('/forum/post', ForumControllerPolicy.postThread, ForumController.postThread)
    app.post('/forum/edit', ForumControllerPolicy.editThread, ForumController.editThread)
    app.post('/forum/remove/:threadId', ForumController.removeThread)

    app.get('/replies', ForumController.getReplies)
    app.get('/reply/:replyId', ForumController.getReply)
    app.post('/forum/addreply', ForumControllerPolicy.addReply, ForumController.addReply)
    app.post('/reply/edit', ForumControllerPolicy.editReply, ForumController.editReply)
    app.post('/forum/removereply/:replyId', ForumController.removeReply)
}
