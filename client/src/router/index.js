import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'
import Register from '@/components/login/Register'

import Home from '@/components/home/Home'
import User from '@/components/home/User'


import CourseSearch from '@/components/course/CourseSearch'
import CourseAdd from '@/components/course/CourseAdd'
import CourseRemove from '@/components/course/CourseRemove'
import CourseEdit from '@/components/course/CourseEdit'
import CourseToEdit from '@/components/course/CourseToEdit'
import CourseDrop from '@/components/course/CourseDrop'
import CourseView from '@/components/course/CourseView'

import Assignment from '@/components/assignment/Assignment'
import AssignmentAdd from '@/components/assignment/AssignmentAdd'
import AssignmentView from '@/components/assignment/AssignmentView'
import AssignmentEdit from '@/components/assignment/AssignmentEdit'

import Forum from '@/components/forum/Forum'
import ForumAdd from '@/components/forum/ForumAdd'
import ThreadView from '@/components/forum/ThreadView'
import ThreadEdit from '@/components/forum/ThreadEdit'
import ReplyEdit from '@/components/forum/ReplyEdit'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
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
            path: '/course/search',
            name: 'CourseSearch',
            component: CourseSearch
        },
        {
            path: '/course/add',
            name: 'CourseAdd',
            component: CourseAdd
        },
        {
            path: '/course/remove',
            name: 'CourseRemove',
            component: CourseRemove
        },
        {
            path: '/course/edit',
            name: 'CourseEdit',
            component: CourseEdit
        },
        {
            path: '/course/edit/:courseId',
            name: 'CourseToEdit',
            component: CourseToEdit
        },
        {
            path: '/course/drop',
            name: 'CourseDrop',
            component: CourseDrop
        },
        {
            path: '/course/:courseId',
            name: 'CourseView',
            component: CourseView
        },
        {
            path: '/assignment',
            name: 'Assignment',
            component: Assignment
        },
        {
            path: '/assignment/add/:courseId',
            name: 'AssignmentAdd',
            component: AssignmentAdd
        },
        {
            path: '/assignment/:assignmentId',
            name: 'AssignmentView',
            component: AssignmentView
        },
        {
            path: '/assignment/edit/:assignmentId',
            name: 'AssignmentEdit',
            component: AssignmentEdit
        },
        {
            path: '/forum',
            name: 'Forum',
            component: Forum
        },
        {
            path: '/forum/add/:courseId',
            name: 'ForumAdd',
            component: ForumAdd
        },
        {
            path: '/forum/:threadId',
            name: 'ThreadView',
            component: ThreadView
        },
        {
            path: '/forum/edit/:threadId',
            name: 'ThreadEdit',
            component: ThreadEdit
        },
        {
            path: '/forum/editreply/:replyId',
            name: 'ReplyEdit',
            component: ReplyEdit
        },
    ]
})