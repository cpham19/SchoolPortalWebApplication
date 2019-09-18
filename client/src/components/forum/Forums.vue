<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout align-center justify-center>
      <v-flex xs8>     
        <div v-for="course in courses" :key="course._id" class="box">
           <h3 class="text-white">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <v-btn fab dark color="indigo" :to="{name: 'ForumAdd', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name}}" type="submit"><v-icon dark>add</v-icon></v-btn></h3>    
           <table class="table table-striped table-light">
              <thead class="thead-dark">
                <tr>
                    <th scope="col">Thread</th>
                    <th scope="col">Posted Date</th>
                    <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr scope="row" v-for="thread in course.threads" :key="thread._id">
                  <td><a :style="'color:blue;'" v-on:click="navigateTo({name: 'ThreadView', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name, threadId: thread._id}})">{{thread.title}}</a></td>
                  <td>{{thread.postedDate}}</td>
                  <td><v-btn v-show="isUserProfessor || user.userName === thread.author.userName" v-on:click="removeThread(thread._id)" class="error" type="submit"><v-icon>remove</v-icon></v-btn></td>
                </tr>
              </tbody>
            </table>
            <br/><br/><br/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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
    .table-light {
        border: solid 5px;
    }

</style>