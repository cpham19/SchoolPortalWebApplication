<template>
  <div>
    <course-nav v-bind:active="active"/>
    <br/><br/><br/>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Drop Courses</v-toolbar-title>
          </v-toolbar>
          <v-data-table :headers="headers" :items="enrolledCourses" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{props.item.dept}}</td>
              <td>{{props.item.number}}</td>
              <td>{{props.item.section}}</td>
              <td>{{props.item.name}}</td>
              <td>{{props.item.unit}}</td>
              <td>{{props.item.professor}}</td>
              <td><v-btn v-on:click="dropCourse(props.item._id)" class="info" type="button"><v-icon dark>remove</v-icon></v-btn></td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import CourseNavigation from "@/components/course/CourseNavigation.vue"
import {mapState} from "vuex"

export default {
  name: "CourseDrop",
  data() {
    return {
      headers: [
        { text: "Department", value: "dept" },
        { text: "Number", value: "number" },
        { text: "Section", value: "section" },
        { text: "Name", value: "name" },
        { text: "Unit", value: "unit" },
        { text: "Professor", value: "professor" },
        { text: "Action", value: "_id"}
      ],
      enrolledCourses: [],
      active: 4,
      error: ""
    };
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
    ])
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCourses()
  },
  methods: {
    async dropCourse(courseId) {
      const course = {userId: this.user._id, courseId: courseId}
      try {
        const response = await CourseService.dropCourse(course)
        this.$store.dispatch('dropCourse', response.data.courseId)
        // Filter the search results based on the user's enrolled courses
        this.enrolledCourses = this.enrolledCourses.filter(course => !(course._id === response.data.courseId))
        this.$router.push("/course/drop")
      }
      catch(err) {
        this.error = error.response.data.error
      }
    },
    checkLoggedIn() {
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
      });
    }
  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>