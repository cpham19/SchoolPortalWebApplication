<template>
  <div>
    <h1 class="display-3">Home Page</h1>
    <v-responsive>
      <v-container grid-list-md text-xs-center fill-height>
        <v-layout align-center>
          <v-flex xs4 v-show="!(this.$store.state.user.admin)">
            <div class="course-list">
              <h4 align="center">Current Courses</h4>
              <ul>
                <li v-for="course in this.$store.state.user.courses" :key="course.id">
                  <p>
                    {{course.dept}} {{course.number}}-{{course.section}}
                    <br>
                    {{course.name}}
                    <br>
                    {{course.professor}} {{course.room}}
                    <br>
                  </p>
                </li>
                <hr>
              </ul>
            </div>
          </v-flex>
          <v-flex xs8>
            <h1>User Information</h1>
            <h2>Full Name</h2>
            <p class="lead">{{this.$store.state.user.firstName}} {{this.$store.state.user.lastName}}</p>

            <h2>Address</h2>
            <p class="lead">{{this.$store.state.user.streetAddress}}, {{this.$store.state.user.city}} {{this.$store.state.user.state}} {{this.$store.state.user.zipCode}}</p>

            <h2>Email</h2>
            <p class="lead">{{this.$store.state.user.email}}</p>

            <h2>Phone Number</h2>
            <p class="lead">{{this.$store.state.user.phoneNumber}}</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
import HomeService from "@/services/HomeService";
import Router from "vue-router";

export default {
  name: "Home",
  data() {
    return {
    };
  },
  mounted() {
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Course List Styles */
.course-list {
  padding: 10px 0.75rem;
}

.course-list ul {
  margin: 0;
}

.course-list h6 {
  padding: 10px 0 10px 0;
}

.course-list span {
  color: black;
  padding: 0 0 0 2px;
}
</style>