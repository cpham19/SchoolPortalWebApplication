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
        this.courses = response.data.courses.filter(course => course.professor === this.user.firstName + " " + this.user.lastName);
      }
      else {
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

          var date = new Date()
          var today = date.getDay()
          var diff = null
          switch (selectedDay) {
            case "Sunday":
              diff = date.getDate() - today
              break;
            case "Monday":
              diff = date.getDate() - today + (today == 0 ? -6 : 1)
              break;
            case "Tuesday":
              diff = date.getDate() - today + (today == 0 ? -5 : 2)
              break;
            case "Wednesday":
              diff = date.getDate() - today + (today == 0 ? -4 : 3)
              break;
            case "Thursday":
              diff = date.getDate() - today + (today== 0 ? -3 : 4)
              break;
            case "Friday":
              diff = date.getDate() - today + (today == 0 ? -2 : 5)
              break;
            case "Saturday":
              diff = date.getDate() - today +  (today == 0 ? -1 : 6)
              break;
            default:
              break;
          }
          var timestamp = new Date(date.setDate(diff)) 
          var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
          var day = ('0' + timestamp.getDate()).slice(-2)
          var year = timestamp.getFullYear()
          var formattedDate = year + "-" + month + "-" + day
          eventObj.start = formattedDate + " " + course.startingTime
          eventObj.end = formattedDate + " " + course.endingTime

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
