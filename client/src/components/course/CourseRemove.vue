<template>
  <div>
    <course-nav v-bind:active="active"/>
    <br/><br/><br/>
    <v-data-table :headers="headers" :items="courses" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{props.item.dept}}</td>
        <td>{{props.item.number}}</td>
        <td>{{props.item.section}}</td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.unit}}</td>
        <td>{{props.item.professor}}</td>
        <td><v-btn v-on:click="removeCourse(props.item._id)" class="error" type="button"><v-icon>remove</v-icon></v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import CourseNavigation from "@/components/course/CourseNavigation.vue"
import {mapState} from "vuex"

export default {
  name: "CourseRemove",
  data() {
    return {
      headers: [
        { text: "Department", value: "dept" },
        { text: "Number", value: "number" },
        { text: "Section", value: "section" },
        { text: "Name", value: "name" },
        { text: "Unit", value: "unit" },
        { text: "Professor", value: "professor" },
        { text: "Action", value: "_id" }
      ],
      courses: [],
      active: 2,
    };
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
    ])
  },
  mounted() {
    this.fetchCourses()
    this.checkLoggedIn()
  },
  methods: {
    async fetchCourses() {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/")
      }
    },
    async removeCourse(courseId) {
      try {
        const response = await CourseService.removeCourse(courseId)
        this.$store.dispatch("removeCourse", response.data.courseId)
        this.fetchCourses()
        this.$router.push("/course/remove")
      }
      catch (err) {
        console.log(err.response)
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