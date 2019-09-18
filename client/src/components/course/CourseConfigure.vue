<template>
  <v-container fluid>
    <course-nav />
    <br/><br/><br/>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Edit and Remove Courses</v-toolbar-title>
          </v-toolbar>
          <v-data-table :headers="headers" :items="courses" :single-expand="singleExpand" :expanded.sync="expanded" show-expand item-key="_id"  class="elevation-1">
           <template v-slot:top>
              <v-toolbar>
                <v-switch v-model="singleExpand" label="Single expand" class="pa-3"></v-switch>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item}">
              <td :colspan="headers.length">
                {{item.description}}
                <br/>
                <v-btn :to="{name: 'CourseToEdit', params: {courseId: item._id}}" class="success" type="button"><v-icon>edit</v-icon> Edit</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-on:click="removeCourse(item._id)" class="error" type="button"><v-icon>remove</v-icon> Remove</v-btn>
              </td>
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
import depts from "./depts"
import {mapState} from "vuex"

export default {
  name: "CourseEdit",
  data() {
    return {
      headers: [
        { text: "Department", value: "dept" },
        { text: "Number", value: "number" },
        { text: "Section", value: "section" },
        { text: "Name", value: "name" },
        { text: "Unit", value: "unit" },
        { text: "Professor", value: "professor" },
        { text: "Room", value: "room"}
      ],
      courses: [],
      expanded: [],
      singleExpand: false,
      selected: [],
      singleSelect: false,
    };
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
    ])
  },
  async mounted() {
    this.checkLoggedIn()
    const response = await CourseService.fetchCourses()
    this.courses = response.data.courses
  },
  methods: {
    async fetchCourses() {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
    },
    back: function() {
      this.$router.push('/course/configure')
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async removeCourse(courseId) {
      try {
        const response = await CourseService.removeCourse(courseId)
        this.$store.dispatch("removeCourse", response.data.courseId)
        this.fetchCourses()
        this.$router.push("/course/configure")
      }
      catch (err) {
        console.log(err.response)
      }
    }
  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>

<style scoped>
.failed {
  color:red;
}
</style>