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
    app.get('/course', CourseController.getCourses)
    app.get('/course/:courseId', CourseController.getCourse)

    app.post('/course/add', CourseControllerPolicy.addCourse, CourseController.addCourse)
    app.post('/course/enroll', CourseController.enrollCourse)
    app.delete('/course/remove/:courseId', CourseController.removeCourse)
    app.put(`/course/edit/:courseId`, CourseControllerPolicy.editCourse, CourseController.editCourse)
    app.post('/course/drop/:userName/:courseId', CourseController.dropCourse)

    // Assignment handler 
    app.get('/assignment/:assignmentId', AssignmentController.getAssignment)
    app.get('/assignment', AssignmentController.getAssignments)
    app.post('/assignment/post', AssignmentControllerPolicy.postAssignment, AssignmentController.postAssignment)
    app.put('/assignment/edit/:assignmentId', AssignmentControllerPolicy.editAssignment, AssignmentController.editAssignment)
    app.delete('/assignment/remove/:assignmentId', AssignmentController.removeAssignment)

    // Forum handler
    app.get('/forum', ForumController.getThreads)
    app.get('/forum/:threadId', ForumController.getThread)
    app.post('/forum/post', ForumControllerPolicy.postThread, ForumController.postThread)
    app.put('/forum/edit/:threadId', ForumControllerPolicy.editThread, ForumController.editThread)
    app.delete('/forum/remove/:threadId', ForumController.removeThread)

    app.get('/replies', ForumController.getReplies)
    app.get('/reply/:replyId', ForumController.getReply)
    app.post('/forum/addreply', ForumControllerPolicy.addReply, ForumController.addReply)
    app.put('/reply/edit/:replyId', ForumControllerPolicy.editReply, ForumController.editReply)
    app.delete('/forum/removereply/:replyId', ForumController.removeReply)
}
