<template>
  <v-container fluid>
    <course-nav />
    <br/><br/><br/>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Drop Courses</v-toolbar-title>
          </v-toolbar>
          <v-data-table v-model="selected" :single-select="singleSelect" :headers="headers" :items="enrolledCourses" item-key="_id" show-select class="elevation-1">
            <template v-slot:top>
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
            </template>
            <template v-slot:footer>
              <hr/>
              <v-btn v-show="!isUserProfessor" v-on:click="dropCourse" class="error" type="button">Drop</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        { text: "Room", value: "room" },
      ],
      enrolledCourses: [],
      selected: [],
      singleSelect: false,
      error: ""
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
    this.getUserCourses()
  },
  methods: {
    async dropCourse() {
      if (this.selected.length == 0) {
        return;
      }

      var id = this.user._id
      try {
        for(const course of this.selected) {
          const obj = {userId: id, courseId: course._id}
          const response = await CourseService.dropCourse(obj)
          this.$store.dispatch('dropCourse', response.data.courseId)
          // Filter the search results based on the user's enrolled courses
          this.enrolledCourses = await this.enrolledCourses.filter(courseObj => !(courseObj._id === response.data.courseId))
        }
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