<template>
  <div>
    <div v-for="course in enrolledCourses" :key="course._id">
      <h3 class="display-2">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <v-btn fab dark color="indigo" v-on:click="navigateTo({name: 'AssignmentAdd', params: {courseId: course._id}})" type="submit"><v-icon dark>add</v-icon></v-btn></h3>
      <v-data-table :headers="headers" :items="course.assignments" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td><a v-on:click="navigateTo({name: 'AssignmentView', params: {assignmentId: props.item._id}})">{{props.item.title}}</a></td>
          <td>{{props.item.dueDate}}</td>
          <td><v-btn v-on:click="navigateTo({name: 'AssignmentEdit', params: {assignmentId: props.item._id}})" color="success" type="submit"><v-icon>edit</v-icon></v-btn><v-btn v-on:click="removeAssignment(props.item._id)" class="error" type="submit"><v-icon>remove</v-icon></v-btn></td>
        </template>
      </v-data-table>
      <br/><br/>
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
        this.error = err.response.data.error
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
        this.error = err.response.data.error
      }
    },
    checkLoggedIn: function() {
      if (!(this.$store.state.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async removeAssignment(assignmentId) {
      try {
        const response = await AssignmentService.removeAssignment(assignmentId)
        this.getUserCoursesAndAssignments()
        this.$router.push("/assignment")
      }
      catch(err) {
        this.error = err.response.data.error
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>