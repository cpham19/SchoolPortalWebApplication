<template>
  <div>
    <v-responsive>
      <v-container grid-list-md text-xs-center fill-height>
        <v-layout>
          <v-flex xs12>
            <h1>User Information</h1>
            <h2>Full Name</h2>
            <p class="lead">{{user.firstName}} {{user.lastName}}</p>

            <h2>Address</h2>
            <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

            <h2>Email</h2>
            <p class="lead">{{user.email}}</p>

            <h2>Phone Number</h2>
            <p class="lead">{{user.phoneNumber}}</p>
          </v-flex>
        </v-layout>
        <v-layout v-show="!isUserAdmin">
          <v-flex xs12>
            <h1> Current Enrolled Courses</h1>
            <p class="lead" v-for="course in enrolledCourses" :key="course._id">
              {{course.dept}}{{course.number}}
              <br>
              {{course.name}}
              <br>
              {{course.professor}} {{course.room}}
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
import HomeService from "@/services/HomeService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"

export default {
  name: "Home",
  data() {
    return {
      enrolledCourses: []
    };
  },
  mounted() {
    this.checkLoggedIn() 
    this.getUserCourses()
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'isUserAdmin'
    ])
  },
  methods: {
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async getUserCourses() {
      this.enrolledCourses = [];

      const response = await CourseService.fetchCourses();

      this.user.courses.forEach(courseId => {
        response.data.courses.forEach(course => {
            if (course._id === courseId) {
              this.enrolledCourses.push(course)
            }
        })
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>