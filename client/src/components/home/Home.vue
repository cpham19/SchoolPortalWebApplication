<template>
  <v-layout>
    <v-flex xs12 md12 v-show="isUserAdmin">
      <div class="text-xs-center">
        <div class="headline">Admin</div>
        <v-avatar size="250px">
          <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
        </v-avatar>
        <div class="headline">
          <v-img src="static/admin.png" height="30px" alt="admin" contain></v-img>
          <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
        </div>

        <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>

        <h2>Address</h2>
        <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

        <h2>Phone Number</h2>
        <p class="lead">{{user.phoneNumber}}</p>
      </div>
    </v-flex>
    <v-flex xs12 md4 v-show="!isUserAdmin">
      <div class="text-xs-center">
        <div class="headline">Student</div>
        <v-avatar size="250px">
          <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
        </v-avatar>
        <div class="headline">
          <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
        </div>

        <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>

        <h2>Address</h2>
        <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

        <h2>Phone Number</h2>
        <p class="lead">{{user.phoneNumber}}</p>
      </div>
    </v-flex>
    <v-flex xs12 md5 offset-md2 v-show="!isUserAdmin">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Current Enrolled Courses</v-toolbar-title>
        </v-toolbar>
        <div v-for="course in enrolledCourses" :key="course._id">
          <v-card class="my-3" hover>
            <v-responsive height="100px">
              <v-container fill-height fluid>
                <v-layout>
                  <v-flex xs12 align-end d-flex>
                    <span class="headline">{{course.dept}}{{course.number}}-{{course.name}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-responsive>
            <v-card-text>{{ course.description }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="{name: 'CourseView', params: {courseId: course._id}}" flat class="blue--text">View</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import HomeService from "@/services/HomeService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import { mapState } from "vuex"

export default {
  name: "Home",
  data() {
    return {
      enrolledCourses: []
    }
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCourses()
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserAdmin"])
  },
  methods: {
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/")
      }
    },
    async getUserCourses() {
      this.enrolledCourses = []

      const response = await CourseService.fetchCourses()

      this.user.courses.forEach(courseId => {
        response.data.courses.forEach(course => {
          if (course._id === courseId) {
            this.enrolledCourses.push(course)
          }
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>