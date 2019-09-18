<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout>
      <v-flex xsm6 :style="'background:rgba(71, 71, 71, 0.5);color:white;'">
        <div class="text-center">
          <div v-show="!isUserProfessor" class="headline">Student</div>
          <div v-show="isUserProfessor" class="headline">Professor</div>
          <v-avatar size="250px">
            <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
          </v-avatar>
          <div class="headline">
            <img :src="images.professor" height="30px" v-show="isUserProfessor"/>
            <br/>
            <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
          </div>
          <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>
          <h2>Address</h2>
          <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>
          <h2>Phone Number</h2>
          <p class="lead">{{user.phoneNumber}}</p>
        </div>
      </v-flex>
      <v-flex xsm8 :style="'background:rgba(71, 71, 71, 0.9); color:white;'">
          <v-toolbar dark>
            <v-toolbar-title v-show="!isUserProfessor">Currently Enrolled in {{courses.length}} Course(s)</v-toolbar-title>
            <v-toolbar-title v-show="isUserProfessor">Currently Teaching {{courses.length}} Course(s)</v-toolbar-title>
          </v-toolbar>
          <v-carousel :show-arrows-on-hover="true" height="150px;">
            <v-carousel-item v-for="course in courses" :key="course._id">
              <v-sheet :style="'background:rgba(192, 192, 192, 0.7);'" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <p class="display">
                    <course-dialog :course="course"/>
                  </p>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HomeService from "@/services/HomeService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import { mapState } from "vuex";
import CourseDialog from "../course/CourseDialog"

export default {
  name: "Home",
  data() {
    return {
      courses: [],
      images: {
        professor: require('../../assets/static/professor.png')
      },
    };
  },
  mounted() {
    this.checkLoggedIn();
    this.getUserCourses();
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
      this.courses = [];

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
    }
  },
  components: {
    "course-dialog" : CourseDialog
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.display {
  font-size: 36px;
}
@media (max-width: 768px) {
  .lead {
    font-size:12px;
  }

  .display {
    font-size:12px;
    padding: 20px;
  }
}
</style>
