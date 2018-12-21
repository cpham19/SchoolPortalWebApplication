<template>
  <div>
    <v-responsive>
      <v-container grid-list-md text-xs-center fill-height>
        <v-layout>
          <v-flex xs12>
            <h1>User Information</h1>
            <h2>Full Name</h2>
            <p class="lead">{{this.$store.state.user.firstName}} {{this.$store.state.user.lastName}}</p>

            <h2>Address</h2>
            <p
              class="lead"
            >{{this.$store.state.user.streetAddress}}, {{this.$store.state.user.city}} {{this.$store.state.user.state}} {{this.$store.state.user.zipCode}}</p>

            <h2>Email</h2>
            <p class="lead">{{this.$store.state.user.email}}</p>

            <h2>Phone Number</h2>
            <p class="lead">{{this.$store.state.user.phoneNumber}}</p>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <h1>Current Enrolled Courses</h1>
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
import HomeService from "@/services/HomeService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";

export default {
  name: "Home",
  data() {
    return {
      enrolledCourses: []
    };
  },
  mounted() {
    this.checkLoggedIn(), this.getUserCourses();
  },
  methods: {
    checkLoggedIn() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async getUserCourses() {
      this.enrolledCourses = [];

      const response = await CourseService.fetchCourses();

      this.$store.state.user.courses.forEach(courseId => {
        response.data.courses.forEach(course => {
            if (course._id === courseId) {
              this.enrolledCourses.push(course)
            }
        })
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>