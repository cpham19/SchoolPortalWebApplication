<template>
  <div>
    <div v-for="course in courses" :key="course._id">
      <h1 class="display-1">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}} <v-btn fab dark color="indigo" :to="{name: 'AssignmentAdd', params: {courseId: course._id}}" type="submit"><v-icon dark>add</v-icon></v-btn></h1>
      <v-data-table :headers="headers" :items="course.assignments" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td><a v-on:click="navigateTo({name: 'AssignmentView', params: {assignmentId: props.item._id}})">{{props.item.title}}</a></td>
          <td>{{props.item.dueDate}}</td>
          <td v-show="admin"><v-btn :to="{name: 'AssignmentEdit', params: {assignmentId: props.item._id}}" color="success" type="submit"><v-icon>edit</v-icon></v-btn><v-btn v-on:click="removeAssignment(props.item._id)" class="error" type="submit"><v-icon>remove</v-icon></v-btn></td>
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
      courses: [],
      admin: false,
    };
  },
  mounted() {
    this.checkLoggedIn()
    this.getUserCoursesAndAssignments()
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route)
    },
    async getUserCoursesAndAssignments() {
      this.userName = this.$store.state.user.userName

      try {
        const courseResponse = await CourseService.fetchCourses()
        const assignmentResponse = await AssignmentService.getAssignments()

        if (this.admin) {
          this.courses = courseResponse.data.courses
          this.courses.forEach(course => {
            course.assignments = []
          })
        }
        else {
          this.$store.state.user.courses.forEach(courseId => {
          courseResponse.data.courses.forEach(course => {
             if (course._id === courseId) {
                course.assignments = []
                this.courses.push(course)
              }
            })
          })
        }

        this.courses.forEach(course => {
          assignmentResponse.data.assignments.forEach(assignment => {
            if (course._id === assignment.courseId) {
              course.assignments.push(assignment)
            }
          })
        })
      }
      catch(err) {
        //this.error = err.response.data
      }
    },
    checkLoggedIn: function() {
      if (!(this.$store.state.isUserLoggedIn)) {
        this.$router.push("/")
      }
      this.admin = this.$store.state.isUserAdmin
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