<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sm12 md4>
        <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Department</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.dept}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Number</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.number}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Title</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.name}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.section}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Professor</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.professor}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Units</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.unit}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Description</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.description}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import CourseNavigation from "@/components/course/CourseNavigation.vue"
import { mapState } from "vuex"

export default {
  name: "CourseView",
  data() {
    return {
      course: {}
    };
  },
  async mounted() {
    this.checkLoggedIn()
    const courseId = this.$store.state.route.params.courseId
    const response = await CourseService.getCourse(courseId)
    this.course = response.data.course
  },
  computed: {
    ...mapState(["isUserLoggedIn"])
  },
  methods: {
    back: function() {
      this.$router.push("/home")
    },
    checkLoggedIn() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/")
      }
    }
  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>