import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Course from '@/components/Course'
import CourseSearch from '@/components/CourseSearch'
import CourseAdd from '@/components/CourseAdd'
import CourseRemove from '@/components/CourseRemove'
import CourseEdit from '@/components/CourseEdit'
import CourseDrop from '@/components/CourseDrop'
import Assignment from '@/components/Assignment'

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
            path: '/course/drop',
            name: 'CourseDrop',
            component: CourseDrop
        },
        {
            path: '/assignment',
            name: 'Assignment',
            component: Assignment
        }
    ]
})