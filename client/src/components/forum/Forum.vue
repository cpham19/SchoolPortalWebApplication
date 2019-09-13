<template>
  <v-layout>
    <v-flex xs12 md12>
      <div v-for="course in courses" :key="course._id" hover>
        <v-card class="my-3" hover>
          <v-toolbar dark color="primary">
            <v-toolbar-title>
            <h3 class="display-1">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <v-btn fab dark color="indigo" :to="{name: 'ForumAdd', params: {courseId: course._id}}" type="submit"><v-icon dark>add</v-icon></v-btn></h3>
            </v-toolbar-title>
          </v-toolbar>
          <v-data-table :headers="headers" :items="course.threads" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td><a v-on:click="navigateTo({name: 'ThreadView', params: {threadId: props.item._id}})">{{props.item.title}}</a></td>
              <td>{{props.item.postedDate}}</td>
              <td><v-btn v-show="isUserProfessor || user.userName === props.item.author.userName" v-on:click="removeThread(props.item._id)" class="error" type="submit"><v-icon>remove</v-icon></v-btn></td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ForumService from "@/services/ForumService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"


export default {
  name: "Forum",
  data() {
    return {
      headers: [
        { text: "Title", value: "title" },
        { text: "Posted Date", value: "postedDate" },
        { text: "Action", value: "_id" },
      ],
      courses: [],
    };
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'isUserProfessor'
    ])
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCoursesAndThreads()
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route)
    },
    async getUserCoursesAndThreads() {
      this.courses = []

      try {
        const courseResponse = await CourseService.fetchCourses()
        const forumResponse = await ForumService.getThreads()

        if (this.isUserProfessor) {
          this.courses = courseResponse.data.courses
          this.courses.forEach(course => {
              course.threads = []
          })
        }
        else {
          this.user.courses.forEach(courseId => {
          courseResponse.data.courses.forEach(course => {
              if (course._id === courseId) {
                course.threads = []
                this.courses.push(course)
              }
            })
          })

        }

        this.courses.forEach(course => {
          forumResponse.data.threads.forEach(thread => {
            if (course._id === thread.courseId) {
              course.threads.push(thread)
            }
          })
        })
      }
      catch(err) {
        this.error = err.response.data
      }
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async removeThread(threadId) {
      try {
        const response = await ForumService.removeThread(threadId)
        this.getUserCoursesAndThreads()
        this.$router.push("/forum")
      }
      catch(err) {
        this.error = err.response.data.error
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>