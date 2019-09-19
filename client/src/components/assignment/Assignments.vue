<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs10>
        <div v-for="course in courses" :key="course._id" hover>
          <v-card class="my-3" hover>
            <v-toolbar dark>
              <v-toolbar-title>
                <h1 class="display">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}}
                  <v-btn v-show="isUserProfessor" fab dark color="indigo" width="25" height="25" :to="{name: 'AssignmentAdd', params: {courseId: course._id}}" type="submit"><v-icon>add</v-icon></v-btn>
                </h1>
              </v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="headers" :items="course.assignments" class="elevation-1">
              <template v-slot:item="{ item}">
                <td><a :style="'color:blue;'" v-on:click="navigateTo({name: 'AssignmentView', params: {assignmentId: item._id}})">{{item.title}}</a></td>
                <td>{{item.dueDate}}</td>
                <td v-show="isUserProfessor">
                  <div class="btn-group">
                    <v-btn :to="{name: 'AssignmentEdit', params: {assignmentId: item._id}}" class="success" type="submit">
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn v-on:click="removeAssignment(item._id)" class="error" type="submit">
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </div>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AssignmentService from "@/services/AssignmentService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"

export default {
  name: "Assignments",
  data() {
    return {
      headers: [
        { text: "Title", value: "title" },
        { text: "Due Date", value: "dueDate" },
        { text: "Action", value: "_id" },
      ],
      courses: [],
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
    this.getUserCoursesAndAssignments()
    // Remove the Action tab if you are professor (because you don't need to enroll)
    if (!this.isUserProfessor) {
      this.headers.pop();
    }
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route)
    },
    async getUserCoursesAndAssignments() {
      try {
        const courseResponse = await CourseService.fetchCourses()
        const assignmentResponse = await AssignmentService.getAssignments()

        if (this.isUserProfessor) {
          courseResponse.data.courses.forEach(course => {
          if (course.professor === this.user.firstName + " " + this.user.lastName) {
              this.courses.push(course);
            }
          });

          this.courses.forEach(course => {
            course.assignments = []
          })
        }
        else {
          this.user.courses.forEach(courseId => {
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
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async removeAssignment(assignmentId) {
      try {
        const response = await AssignmentService.removeAssignment(assignmentId)
        this.getUserCoursesAndAssignments()
        this.$router.push("/assignments")
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
.display {
  font-size: 25px;
}

@media (max-width: 768px) {
  .lead {
    font-size:12px;
  }

  .display {
    font-size:13px;
  }

  .display-btn {
    width:20px;
    height:20px;
  }

  .success {
    width:20x;
  }

  .error {
    width: 20px;
  }
}
</style>