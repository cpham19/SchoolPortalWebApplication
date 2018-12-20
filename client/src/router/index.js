import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'

import Course from '@/components/course/Course'
import CourseSearch from '@/components/course/CourseSearch'
import CourseAdd from '@/components/course/CourseAdd'
import CourseRemove from '@/components/course/CourseRemove'
import CourseEdit from '@/components/course/CourseEdit'
import CourseToEdit from '@/components/course/CourseToEdit'
import CourseDrop from '@/components/course/CourseDrop'

import Assignment from '@/components/assignment/Assignment'
import AssignmentAdd from '@/components/assignment/AssignmentAdd'
import AssignmentView from '@/components/assignment/AssignmentView'
import AssignmentEdit from '@/components/assignment/AssignmentEdit'

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
            path: '/course',
            name: 'Course',
            component: Course
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
    ]
})