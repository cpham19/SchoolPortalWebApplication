<template>
  <div>
    <div class="display-3" v-show="enrolledCourses.length == 0">Nothing to show</div>
    <div v-for="course in enrolledCourses" :key="course._id">
      <h3 class="display-2">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <v-btn fab dark color="indigo" v-on:click="navigateTo({name: 'ForumAdd', params: {courseId: course._id}})" type="submit"><v-icon dark>add</v-icon></v-btn></h3>
      <v-data-table :headers="headers" :items="course.threads" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td><a>{{props.item.title}}</a></td>
          <td>{{props.item.postedDate}}</td>
          <td><v-btn v-on:click="removeThread(props.item._id)" class="error" type="submit"><v-icon>remove</v-icon></v-btn></td>
        </template>
      </v-data-table>
      <br/><br/>
    </div>
  </div>
</template>

<script>
import ForumService from "@/services/ForumService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";

export default {
  name: "Forum",
  data() {
    return {
      headers: [
        { text: "Title", value: "title" },
        { text: "Date", value: "postedDate" },
        { text: "Action", value: "_id" },
      ],
      enrolledCourses: [],
    };
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCoursesAndThreads()
  },
  methods: {
    navigateTo: function(path) {
      this.$router.push(path)
    },
    async getUserCoursesAndThreads() {
      this.userName = this.$store.state.user.userName
      this.enrolledCourses = []

      try {
        const courseResponse = await CourseService.fetchCourses()

        this.$store.state.user.courses.forEach(courseId => {
          courseResponse.data.courses.forEach(course => {
              if (course._id === courseId) {
                course.threads = []
                this.enrolledCourses.push(course)
              }
          })
        })
      }
      catch(err) {
        this.error = err.response.data.error
      }

      try {
        const forumResponse = await ForumService.getThreads()

        this.enrolledCourses.forEach(course => {
            forumResponse.data.threads.forEach(thread => {
              if (course._id === thread.courseId) {
                course.threads.push(thread)
              }
          })
        })
      }
      catch(err) {
        this.error = err.response.data.error
      }
    },
    checkLoggedIn: function() {
      if (!(this.$store.state.isUserLoggedIn)) {
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