<template>
  <div>
    <h1>Course Drop</h1>
    <course-drawer />

    <v-data-table :headers="headers" :items="enrolledCourses" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{props.item.dept}}</td>
        <td>{{props.item.number}}</td>
        <td>{{props.item.section}}</td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.unit}}</td>
        <td>{{props.item.professor}}</td>
        <td><v-btn v-on:click="dropCourse(props.item._id)" class="edit" type="button">Drop</v-btn></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseDrawer from "@/components/course/CourseDrawer.vue";

export default {
  name: "CourseDrop",
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
      enrolledCourses: [],
      userName: ""
    };
  },
  mounted() {
    this.checkLoggedIn(), 
    this.getUserCourses()
  },
  methods: {
    async dropCourse(courseId) {
      const course = {userName: this.userName, courseId: courseId}
      console.log(course)
      try {
        const response = await CourseService.dropCourse(course)

        this.$store.dispatch('dropCourse', response.data.courseId)
        // Filter the search results based on the user's enrolled courses
        this.enrolledCourses = this.enrolledCourses.filter(course => !(course._id === response.data.courseId))
        this.$router.push("/course/drop")
      }
      catch(err) {
        console.log(err.response)
      }
    },
    checkLoggedIn() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async getUserCourses() {
      this.userName = this.$store.state.user.userName
      this.enrolledCourses = [];

      const response = await CourseService.fetchCourses();

      this.$store.state.user.courses.forEach(courseId => {
        response.data.courses.forEach(course => {
            if (course._id === courseId) {
              this.enrolledCourses.push(course)
            }
        })
      });
    }
  },
  components: {
    "course-drawer": CourseDrawer
  }
};
</script>