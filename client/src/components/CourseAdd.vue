<template>
  <div>
    <h1>Course Add</h1>
    <course-drawer/>

    <v-layout column>
      <v-flex xs3 offset>
        <v-form>
          <v-select :items="depts" v-model="courseDept" label="department" outline></v-select>
          <v-text-field v-model="courseName" label="course name" type="text" outline></v-text-field>
          <v-text-field v-model="courseNumber" label="course number" type="text" outline></v-text-field>
          <v-text-field v-model="courseSection" label="course section" type="text" outline></v-text-field>
          <v-text-field v-model="courseDescription" label="course description" type="text" outline></v-text-field>
          <v-text-field v-model="courseUnit" label="course unit" type="text" outline></v-text-field>
          <v-text-field v-model="courseProf" label="course professor" type="text" outline></v-text-field>
          <v-text-field v-model="courseRoom" label="course room" type="text" outline></v-text-field>
        </v-form>
        <div class="success" v-show="successfulAdd">Course has been successfully added!</div>
        <div class="failed" v-show="failedAdd">{{error}}</div>
        <v-btn v-on:click="addCourse()" :disabled="!courseDept || !courseName || !courseNumber || !courseSection || !courseDescription || !courseUnit || !courseProf || !courseRoom" class="btn-small waves-effect waves-light" type="submit">Add Course</v-btn>
        <v-btn v-on:click="discard()" class="btn-small waves-effect waves-light" type="submit">Discard</v-btn>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseDrawer from "@/components/CourseDrawer.vue";
import depts from "./depts"

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
      error: ""
    };
  },
  mounted() {
    this.depts = depts,
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    discard() {
      this.courseDept = ''
      this.courseName = ''
      this.courseNumber = ''
      this.courseSection = ''
      this.courseDescription = ''
      this.courseUnit = ''
      this.courseProf = ''
      this.courseRoom = ''
    },
    async addCourse() {
      if (!this.courseDept || !this.courseName.replace( /\s/g, '') || !this.courseNumber.replace( /\s/g, '') || !this.courseSection.replace( /\s/g, '') || !this.courseDescription.replace( /\s/g, '') || !this.courseUnit.replace( /\s/g, '') || !this.courseProf.replace( /\s/g, '') || !this.courseRoom.replace( /\s/g, '')) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = "One or more of the fields are empty."
        return
      }

      const course = {dept: this.courseDept, name: this.courseName, number: this.courseNumber, section: this.courseSection, description: this.courseDescription, unit: this.courseUnit, professor: this.courseProf, room: this.courseRoom}

      try {
        const response = await CourseService.addCourse(course)

        console.log(response.data)

        this.discard()
        this.failedAdd = false
        this.successfulAdd = true
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
    "course-drawer": CourseDrawer
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
}
</style>