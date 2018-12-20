<template>
  <div>
    <h1>Assignment Page</h1>
      <div v-for="course in enrolledCourses" :key="course._id">
        <h3 class="display-2">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <button v-on:click="navigateTo({name: 'AssignmentAdd', params: {courseId: course._id}})" type="submit">+</button></h3>
        <v-data-table :headers="headers" :items="course.assignments" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td><a v-on:click="navigateTo({name: 'AssignmentView', params: {assignmentId: props.item._id}})">{{props.item.title}}</a></td>
            <td>{{props.item.dueDate}}</td>
            <td><v-btn type="button">Edit</v-btn><v-btn type="button">Delete</v-btn></td>
          </template>
        </v-data-table>
      </div>
  </div>
</template>

<script>
import AssignmentService from "@/services/AssignmentService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";

export default {
  name: "Assignment",
  data() {
    return {
      headers: [
        { text: "Title", value: "title" },
        { text: "Due Date", value: "dueDate" },
        { text: "Action", value: "_id" },
      ],
      enrolledCourses: [],
    };
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCoursesAndAssignments()
  },
  methods: {
    navigateTo: function(path) {
      this.$router.push(path)
    },
    async getUserCoursesAndAssignments() {
      this.userName = this.$store.state.user.userName
      this.enrolledCourses = []

      try {
        const courseResponse = await CourseService.fetchCourses()

        this.$store.state.user.courses.forEach(courseId => {
          courseResponse.data.courses.forEach(course => {
              if (course._id === courseId) {
                course.assignments = []
                this.enrolledCourses.push(course)
              }
          })
        })
      }
      catch(err) {
        console.log("CANT GET COURSES")
      }

      try {
        const assignmentResponse = await AssignmentService.getAssignments()

        this.assignments = assignmentResponse.data.assignments

        this.enrolledCourses.forEach(course => {
            assignmentResponse.data.assignments.forEach(assignment => {
              if (course._id === assignment.courseId) {
                course.assignments.push(assignment)
              }
          })
        })
      }
      catch(err) {
        console.log("CANT GET ASSIGNMENTS")
      }
    },
    checkLoggedIn: function() {
      if (!(this.$store.state.isUserLoggedIn)) {
        this.$router.push("/")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>