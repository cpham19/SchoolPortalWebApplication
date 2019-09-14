<template>
  <div>
    <course-nav v-bind:active="active"/>
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
          <v-data-table :headers="headers" :items="searchedCourses" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{props.item.dept}}</td>
              <td>{{props.item.number}}</td>
              <td>{{props.item.section}}</td>
              <td>{{props.item.name}}</td>
              <td>{{props.item.description}}</td>
              <td>{{props.item.unit}}</td>
              <td>{{props.item.professor}}</td>
              <td v-show="!isUserProfessor"><v-btn v-on:click="enrollCourse(props.item._id)" class="success" type="button">Enroll</v-btn></td>
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
import {mapState} from "vuex"
import CourseNavigation from "@/components/course/CourseNavigation.vue"

export default {
  name: "CourseSearch",
  data() {
    return {
      headers: [{text: "Department", value: "dept"}, {text: "Number", value: "number"}, {text: "Section", value: "section"}, {text: "Name", value: "name"}, {text: "Description", value: "description"}, {text: "Unit", value: "unit"}, {text: "Professor", value: "professor"}, {text: "Action", value: "_id"}],
      depts: ["CS", "ME", "BIOL", "PHYS", "CHEM", "COMM", "CE"],
      courses: null,
      searchedCourses: [],
      dept: "",
      number: "",
      failedEnroll: false,
      error: "",
      active: 0,
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
    async enrollCourse(courseId) {
      const obj = {userId: this.user._id, courseId: courseId}
      console.log(obj)
      try {
        const response = await CourseService.enrollCourse(obj)
        console.log(response)
        this.$store.dispatch('enrollCourse', response.data.courseId)
        // Filter the search results based on the user's enrolled courses
        this.user.courses.forEach(courseId => {
           this.searchedCourses = this.searchedCourses.filter(course => !(course._id === courseId))
        })
        this.$router.push("/course/search")
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