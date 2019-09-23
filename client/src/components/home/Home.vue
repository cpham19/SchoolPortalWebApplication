<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout align-center justify-center>
      <v-flex sm10>
        <about-me />
        <br />
        <my-courses v-bind:courses="courses" />
        <br />
        <my-assignments v-bind:assignments="assignments" />
        <br />
        <my-calender v-bind:events="events"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HomeService from "@/services/HomeService";
import CourseService from "@/services/CourseService";
import AssignmentService from "@/services/AssignmentService";
import Router from "vue-router";
import { mapState } from "vuex";
import AboutMe from "./AboutMe";
import MyCourses from "./MyCourses";
import MyAssignments from "./MyAssignments";
import MyCalender from "./MyCalender";

export default {
  name: "Home",
  data() {
    return {
      courses: [],
      assignments: [],
      events: [],
    };
  },
  mounted() {
    this.checkLoggedIn();
    this.getUserCourses();
    this.getUserAssignments();
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserProfessor"])
  },
  methods: {
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async getUserCourses() {
      const response = await CourseService.fetchCourses();

      if (this.isUserProfessor) {
        response.data.courses.forEach(course => {
          if (
            course.professor ===
            this.user.firstName + " " + this.user.lastName
          ) {
            this.courses.push(course);
          }
        });
      } else {
        this.user.courses.forEach(courseId => {
          response.data.courses.forEach(course => {
            if (course._id === courseId) {
              this.courses.push(course);
            }
          });
        });
      }

      await this.courses.forEach(course => {
        course.selectedDays.forEach(selectedDay => {
          var eventObj = {};
          eventObj.title = course.dept + course.number + "-" + course.section + " " + course.name;
          switch (selectedDay) {
            case "Sunday":
              var d = new Date();
              var sunday = d.getDay()
              var diff = d.getDate() - sunday;
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Monday":
              var d = new Date();
              var monday = d.getDay()
              var diff = d.getDate() - monday + (monday == 0 ? -6 : 1);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Tuesday":
              var d = new Date();
              var tuesday = d.getDay()
              var diff = d.getDate() - tuesday + (tuesday == 0 ? -5 : 2);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Wednesday":
              var d = new Date();
              var wednesday = d.getDay()
              var diff = d.getDate() - wednesday + (wednesday == 0 ? -4 : 3);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Thursday":
              var d = new Date();
              var thursday = d.getDay()
              var diff = d.getDate() - thursday + (thursday == 0 ? -3 : 4);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Friday":
              var d = new Date();
              var friday = d.getDay()
              var diff = d.getDate() - friday + (friday == 0 ? -2 : 5);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            case "Saturday":
              var d = new Date();
              var saturday = d.getDay()
              var diff = d.getDate() - saturday + (saturday == 0 ? -1 : 6);
              var timestamp = new Date(d.setDate(diff)) 
              var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
              var day = ('0' + timestamp.getDate()).slice(-2)
              var year = timestamp.getFullYear()
              var formattedDate = year + "-" + month + "-" + day
              eventObj.start = formattedDate + " " + course.startingTime
              eventObj.end = formattedDate + " " + course.endingTime
              break;
            default:
              break;
          }

          this.events.push(eventObj);
        });
      })
    },
    async getUserAssignments() {
      const response = await AssignmentService.getAssignments();

      await this.courses.forEach(course => {
        response.data.assignments.forEach(assignment => {
          if (course._id === assignment.courseId) {
            assignment.courseName = course.name;
            this.assignments.push(assignment);
          }
        });
      });

      this.assignments = this.assignments.sort(this.compare)
    },
    async compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    },
  },
  components: {
    "about-me": AboutMe,
    "my-courses": MyCourses,
    "my-assignments": MyAssignments,
    "my-calender": MyCalender
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display {
  font-size: 36px;
}

@media (max-width: 768px) {
  .lead {
    font-size: 12px;
  }

  .display {
    font-size: 18px;
    padding: 20px;
  }
}
</style>
