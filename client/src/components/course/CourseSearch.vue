<template>
  <v-container fluid>
    <course-nav />
    <br/><br/><br/><br/>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark>
            <v-toolbar-title>Search</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-select :items="depts" v-model="dept" label="department" v-on:change="searchCourse()" outline></v-select>
              <v-text-field v-model="number" label="course number" type="text" v-on:keyup="searchCourse()" outline></v-text-field>
            </v-form>
          </v-card-text>
          <v-data-table :headers="headers" :items="searchedCourses" v-model="selected" :single-select="singleSelect" show-select :single-expand="singleExpand" :expanded.sync="expanded" show-expand item-key="_id" class="elevation-1">
            <template v-slot:top>
              <v-toolbar>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                <v-switch v-model="singleExpand" label="Single expand" class="pa-3"></v-switch>
              </v-toolbar>
            </template>
             <template v-slot:expanded-item="{ headers, item}">
                <td :colspan="headers.length">
                  {{item.description}}
                </td>
            </template>
            <template v-slot:footer>
              <hr/>
              <v-btn v-show="!isUserProfessor" v-on:click="enrollCourse" class="success" type="button">Enroll</v-btn>
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
import {mapState} from "vuex"
import CourseNavigation from "@/components/course/CourseNavigation.vue"

export default {
  name: "CourseSearch",
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
      depts: ["CS", "ME", "BIOL", "PHYS", "CHEM", "COMM", "CE"],
      courses: null,
      expanded: [],
      singleExpand: false,
      selected: [],
      singleSelect: false,
      searchedCourses: [],
      dept: "",
      number: "",
      failedEnroll: false,
      error: "",
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
    this.fetchCourses()
    this.checkLoggedIn()
    // Remove the Action tab if you are professor (because you don't need to enroll)
    if (this.isUserProfessor) {
      this.headers.pop();
    }
  },
  methods: {
    searchCourse: function () {
      // If courseDept is empty, do nothing
      if (!this.dept || (!this.dept && !this.number)) {
        return
      }

      // Filter the complete list of courses in database
      // If user only selected a department OR
      // If user selected a department and typed a course number
      this.searchedCourses = this.courses.filter(course => {
        if (course.dept === this.dept && !this.number) {
          return course
        }
        else if (course.dept === this.dept && course.number.includes(this.number)) {
          return course
        }
      })

      // Filter the search results based on the user's enrolled courses
      this.user.courses.forEach(courseId => {
        this.searchedCourses = this.searchedCourses.filter(course => !(course._id === courseId))
      })
    },
    async enrollCourse() {
      if (this.selected.length == 0) {
        return;
      }

      var id = this.user._id
      try {
        for(const course of this.selected) {
            const obj = {userId: id, courseId: course._id}
            const response = await CourseService.enrollCourse(obj)
            this.$store.dispatch('enrollCourse', response.data.courseId)
            // Filter the search results based on the user's enrolled courses
            this.searchedCourses = await this.searchedCourses.filter(courseObj => !(courseObj._id === response.data.courseId))
        }
        //this.$router.push("/course/search")
      }
      catch(err) {
        console.log(err.response)
      }
    },
    async fetchCourses() {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    }
  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>

<style scoped>
</style>