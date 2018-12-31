<template>
  <v-layout>
    <v-flex xs12 md12 v-show="isUserAdmin">
      <div class="text-xs-center">
        <v-avatar size="250px">
          <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
        </v-avatar>
        <div class="headline">
          <span style="font-weight:bold">{{user.firstName}}{{user.lastName}}</span>
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
        <v-avatar size="250px">
          <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
        </v-avatar>
        <div class="headline">
          <span style="font-weight:bold">{{user.firstName}}{{user.lastName}}</span>
        </div>

        <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>

        <h2>Address</h2>
        <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

        <h2>Phone Number</h2>
        <p class="lead">{{user.phoneNumber}}</p>
      </div>
    </v-flex>
    <v-flex xs12 md5 offset-md2 v-show="!isUserAdmin">
      <h1>Current Enrolled Courses</h1>
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
            <v-btn flat class="blue--text">View</v-btn>
          </v-card-actions>
        </v-card>
      </div>
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