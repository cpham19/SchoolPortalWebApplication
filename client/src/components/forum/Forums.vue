<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout align-center justify-center>
      <v-flex xs8>
        <v-card>
          <v-toolbar flat dark>
            <v-toolbar-title>Search</v-toolbar-title>
          </v-toolbar>
          <v-form>
              <v-text-field v-model="query" label="Search for ..." type="text" v-on:keyup="search()"></v-text-field>
              <v-checkbox v-model="checkbox" :label="'All Forums'" @change="searchAllForums">></v-checkbox>
          </v-form>
        </v-card>
        <br/><br/>
        <table class="table table-striped table-light">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Forum Name</th>
              <th scope="col">Threads</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-show="!query" v-for="course in courses" :key="course._id + course.name">
              <td>
                <a :style="'color:blue;'" v-on:click="navigateTo({name: 'Forum', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name}})">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}}</a>
              </td>
              <td>
                {{course.threads.length}}
              </td>
            </tr>
             <tr scope="row" v-show="query" v-for="course in searchedForums" :key="course._id">
              <td>
                <a :style="'color:blue;'" v-on:click="navigateTo({name: 'Forum', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name}})">{{course.dept}}{{course.number}}-{{course.section}} {{course.name}}</a>
              </td>
              <td>
                {{course.threads.length}}
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ForumService from "@/services/ForumService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import { mapState } from "vuex";

export default {
  name: "Forum",
  data() {
    return {
      courses: [],
      query: null,
      searchedForums: [],
      checkbox: false,
    };
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserProfessor"])
  },
  mounted() {
    this.checkLoggedIn();
    this.getUserCoursesAndThreads();
    this.searchedForums = this.courses
  },
  methods: {
    search: function () {
      // If courseDept is empty, do nothing
      if (!this.query) {
        this.searchedForums = this.courses
        return
      }

      var array = []
      if (this.query.split(" ").length > 1) {
        var arrayOfWords = this.query.split(" ").filter(word => word != "")
        arrayOfWords.forEach(word => {
          this.courses.forEach(course => {
            if ((course.dept + '' + course.number).toLowerCase().includes(word.toLowerCase()) || course.dept.toLowerCase().includes(word.toLowerCase()) || course.name.toLowerCase().includes(word.toLowerCase()) || course.number.toLowerCase().includes(word.toLowerCase())) {
              array.push(course)
            }
          })
        })
      }
      else {
        this.courses.forEach(course => {
            if ((course.dept + '' + course.number).toLowerCase().includes(this.query.toLowerCase()) || course.dept.toLowerCase().includes(this.query.toLowerCase()) || course.name.toLowerCase().includes(this.query.toLowerCase()) || course.number.toLowerCase().includes(this.query.toLowerCase())) {
              array.push(course)
            }
        })
      }

      this.searchedForums = Array.from(new Set(array))
    },
    async searchAllForums () {
      this.query = null

      if (this.checkbox == true) {
        this.courses = [];

        try {
          const courseResponse = await CourseService.fetchCourses();
          const forumResponse = await ForumService.getThreads();

          this.courses = courseResponse.data.courses;
          this.courses.forEach(course => {
            course.threads = [];
          });
        

          this.courses.forEach(course => {
            forumResponse.data.threads.forEach(thread => {
              if (course._id === thread.courseId) {
                course.threads.push(thread);
              }
            });
          });
        } 
        catch (err) {
          this.error = err.response.data;
        }
      }
      else {
        this.getUserCoursesAndThreads();
      }
    },
    navigateTo: function(route) {
      this.$router.push(route);
    },
    async getUserCoursesAndThreads() {
      this.courses = [];

      try {
        const courseResponse = await CourseService.fetchCourses();
        const forumResponse = await ForumService.getThreads();

        if (this.isUserProfessor) {
          this.courses = courseResponse.data.courses;
          this.courses.forEach(course => {
            course.threads = [];
          });
        } 
        else {
          this.user.courses.forEach(courseId => {
            courseResponse.data.courses.forEach(course => {
              if (course._id === courseId) {
                course.threads = [];
                this.courses.push(course);
              }
            });
          });
        }

        this.courses.forEach(course => {
          forumResponse.data.threads.forEach(thread => {
            if (course._id === thread.courseId) {
              course.threads.push(thread);
            }
          });
        });
      } 
      catch (err) {
        this.error = err.response.data;
      }
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async removeThread(threadId) {
      try {
        const response = await ForumService.removeThread(threadId);
        this.getUserCoursesAndThreads();
        this.$router.push("/forum");
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-light {
  border: solid 5px;
}
</style>