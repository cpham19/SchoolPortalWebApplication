const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
const HomeController = require('./controllers/HomeController')
const CourseController = require('./controllers/CourseController')
const CourseControllerPolicy = require('./policies/CourseControllerPolicy')
const AssignmentController = require('./controllers/AssignmentController')
const AssignmentControllerPolicy = require('./policies/AssignmentControllerPolicy')
const ForumController = require('./controllers/ForumController')
const ForumControllerPolicy = require('./policies/ForumControllerPolicy')

module.exports = (app) => {
    // Login/Register handler
    app.post('/', AuthenticationController.login)
    app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

    // Home handler 
    app.get('/home', (req, res) => {res.send([{ title: "This is where you see your home" }])})

     // User handler
     app.get('/user/:userId', HomeController.getUser)

    // Course handler 
    app.get('/courses', CourseController.getCourses)
    app.get('/courses/:courseId', CourseController.getCourse)

    app.post('/courses/add', CourseControllerPolicy.addCourse, CourseController.addCourse)
    app.post('/courses/enroll', CourseController.enrollCourse)
    app.delete('/courses/remove/:courseId', CourseController.removeCourse)
    app.put(`/courses/edit/:courseId`, CourseControllerPolicy.editCourse, CourseController.editCourse)
    app.post('/courses/drop/:userId&:courseId', CourseController.dropCourse)

    // Assignment handler 
    app.get('/assignments/:assignmentId', AssignmentController.getAssignment)
    app.get('/assignments', AssignmentController.getAssignments)
    app.post('/assignments/post', AssignmentControllerPolicy.postAssignment, AssignmentController.postAssignment)
    app.put('/assignments/edit/:assignmentId', AssignmentControllerPolicy.editAssignment, AssignmentController.editAssignment)
    app.delete('/assignments/remove/:assignmentId', AssignmentController.removeAssignment)

    // Forum handler
    app.get('/forums', ForumController.getThreads)
    app.get('/forums/:threadId', ForumController.getThread)
    app.post('/forums/post', ForumControllerPolicy.postThread, ForumController.postThread)
    app.put('/forums/edit/:threadId', ForumControllerPolicy.editThread, ForumController.editThread)
    app.delete('/forums/remove/:threadId', ForumController.removeThread)

    app.get('/replies', ForumController.getReplies)
    app.get('/replies/:replyId', ForumController.getReply)
    app.post('/replies/addreply', ForumControllerPolicy.addReply, ForumController.addReply)
    app.put('/replies/edit/:replyId', ForumControllerPolicy.editReply, ForumController.editReply)
    app.delete('/replies/removereply/:replyId', ForumController.removeReply)
}
