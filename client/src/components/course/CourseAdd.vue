<template>
  <v-container fluid>
    <course-nav v-bind:active="active"/>
    <br/><br/><br/>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Add Course</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-select :items="depts" v-model="courseDept" label="department" required :rules="[required]" outline></v-select>
              <v-text-field v-model="courseName" label="course name" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseNumber" label="course number" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseSection" label="course section" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseDescription" label="course description" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseUnit" label="course unit" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseProf" label="course professor" type="text" required :rules="[required]" outline></v-text-field>
              <v-text-field v-model="courseRoom" label="course room" type="text" required :rules="[required]" outline></v-text-field>
            </v-form>
            <div class="success" v-show="successfulAdd">Course has been successfully added!</div>
            <div class="failed" v-show="failedAdd">{{error}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-on:click="addCourse()" :disabled="!courseDept || !courseName || !courseNumber || !courseSection || !courseDescription || !courseUnit || !courseProf || !courseRoom" class="success" type="submit">Add Course</v-btn>
            <v-btn v-on:click="discard()" class="info" type="submit">Discard</v-btn>
          </v-card-actions>
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
  name: "CourseAdd",
  data() {
    return {
      depts: [],
      courseDept: "",
      courseName: "",
      courseNumber: "",
      courseSection: "",
      courseDescription: "",
      courseUnit: "",
      courseProf: "",
      courseRoom: "",
      failedAdd: false,
      successfulAdd: false,
      required: (value) => !!value || 'Required Field',
      error: "",
      active: 1
    };
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
    ])
  },
  mounted: function() {
    this.depts = depts,
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    discard: function() {
      this.courseDept = ""
      this.courseName = ""
      this.courseNumber = ""
      this.courseSection = ""
      this.courseDescription = ""
      this.courseUnit = ""
      this.courseProf = ""
      this.courseRoom = ""
    },
    async addCourse() {
      const course = {dept: this.courseDept, name: this.courseName, number: this.courseNumber, section: this.courseSection, description: this.courseDescription, unit: this.courseUnit, professor: this.courseProf, room: this.courseRoom}

      if (!Object.keys(course).every(key => !!course[key])) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = "One or more of the fields are empty."
        return
      }

      try {
        const response = await CourseService.addCourse(course)
        this.failedAdd = false
        this.successfulAdd = true
        this.discard();
        this.$router.push('/course/add')
      }
      catch (err) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = err.response.data.error
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
.failed {
  color: red;
}

.success {
  color: green;
  background-color:white;
}
</style>