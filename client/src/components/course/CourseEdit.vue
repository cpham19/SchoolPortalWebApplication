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
        <td><v-btn v-on:click="navigateTo({name: 'CourseToEdit', params: {courseId: props.item._id}})" class="success" type="button"><v-icon>edit</v-icon></v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseNavigation from "@/components/course/CourseNavigation.vue"
import depts from "./depts";

export default {
  name: "CourseEdit",
  data() {
    return {
      headers: [
        { text: "Department", value: "dept" },
        { text: "Number", value: "number" },
        { text: "Section", value: "section" },
        { text: "Name", value: "name" },
        { text: "Unit", value: "unit" },
        { text: "Professor", value: "professor" },
        { text: "Action", value: "_id"}
      ],
      courses: [],
      active: 3,
    };
  },
  async mounted() {
    this.checkLoggedIn()
    const response = await CourseService.fetchCourses()
    this.courses = response.data.courses
  },
  methods: {
    back: function() {
      this.$router.push('/course/edit')
    },
    checkLoggedIn: function() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    navigateTo: function(path) {
      this.$router.push(path)
    },

  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>

<style scoped>
.failed {
  color:red;
}
</style>