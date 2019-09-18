import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/landing/Landing'

import Login from '@/components/login/Login'
import Register from '@/components/login/Register'

import Home from '@/components/home/Home'
import User from '@/components/home/User'

import CourseSearch from '@/components/course/CourseSearch'
import CourseAdd from '@/components/course/CourseAdd'
import CourseConfigure from '@/components/course/CourseConfigure'
import CourseToEdit from '@/components/course/CourseToEdit'
import CourseDrop from '@/components/course/CourseDrop'
import CourseView from '@/components/course/CourseView'

import Assignments from '@/components/assignment/Assignments'
import AssignmentAdd from '@/components/assignment/AssignmentAdd'
import AssignmentView from '@/components/assignment/AssignmentView'
import AssignmentEdit from '@/components/assignment/AssignmentEdit'

import Forums from '@/components/forum/Forums'
import ForumAdd from '@/components/forum/ForumAdd'
import ThreadView from '@/components/forum/ThreadView'
import ThreadEdit from '@/components/forum/ThreadEdit'
import ReplyEdit from '@/components/forum/ReplyEdit'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/user/:userId',
            name: 'User',
            component: User
        },
        {
            path: '/courses/search',
            name: 'CourseSearch',
            component: CourseSearch
        },
        {
            path: '/courses/add',
            name: 'CourseAdd',
            component: CourseAdd
        },
        {
            path: '/courses/configure',
            name: 'CourseConfigure',
            component: CourseConfigure
        },
        {
            path: '/courses/edit/:courseId',
            name: 'CourseToEdit',
            component: CourseToEdit
        },
        {
            path: '/courses/drop',
            name: 'CourseDrop',
            component: CourseDrop
        },
        {
            path: '/courses/:courseId',
            name: 'CourseView',
            component: CourseView
        },
        {
            path: '/assignments',
            name: 'Assignments',
            component: Assignments
        },
        {
            path: '/assignments/add/:courseId',
            name: 'AssignmentAdd',
            component: AssignmentAdd
        },
        {
            path: '/assignments/:assignmentId',
            name: 'AssignmentView',
            component: AssignmentView
        },
        {
            path: '/assignments/edit/:assignmentId',
            name: 'AssignmentEdit',
            component: AssignmentEdit
        },
        {
            path: '/forums',
            name: 'Forums',
            component: Forums
        },
        {
            path: '/forums/:courseId/:courseName/add',
            name: 'ForumAdd',
            component: ForumAdd
        },
        {
            path: '/forums/:courseId/:courseName/:threadId',
            name: 'ThreadView',
            component: ThreadView
        },
        {
            path: '/forums/:courseId/:courseName/editthread/:threadId',
            name: 'ThreadEdit',
            component: ThreadEdit
        },
        {
            path: '/forums/:courseId/:courseName/editreply/:replyId',
            name: 'ReplyEdit',
            component: ReplyEdit
        },
    ]
})