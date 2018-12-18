<template>
  <div>
    <h1>Course Search</h1>
    <course-drawer/>
    <br/><br/>
    <v-form>
      <v-select :items="depts" v-model="dept" label="department" v-on:change="searchCourse()" outline></v-select>
      <v-text-field v-model="number" label="course number" type="text" v-on:keyup="searchCourse()" outline></v-text-field>
    </v-form>

    <v-data-table :headers="headers" :items="searchedCourses" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{props.item.dept}}</td>
        <td>{{props.item.number}}</td>
        <td>{{props.item.section}}</td>
        <td>{{props.item.name}}</td>
        <td>{{props.item.unit}}</td>
        <td>{{props.item.professor}}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseDrawer from "@/components/CourseDrawer.vue";

export default {
  name: "CourseSearch",
  data() {
    return {
      headers: [{text: "Department", value: "dept"}, {text: "Number", value: "number"}, {text: "Section", value: "section"}, {text: "Name", value: "name"}, {text: "Unit", value: "unit"}, {text: "Professor", value: "professor"}],
      depts: ["CS", "ME", "BIOL", "PHYS", "CHEM", "COMM", "CE"],
      courses: null,
      searchedCourses: [],
      dept: "",
      number: ""
    };
  },
  mounted() {
    this.fetchCourses(), this.checkLoggedIn()
  },
  methods: {
    searchCourse: function () {
      // If courseDept is empty, do nothing
      if (!this.dept || (!this.dept && !this.number)) {
        return
      }

      // Filter the complete list of courses in database
      // If user only selected a department OR
      // If user selected a department and typed a course number
      this.searchedCourses = this.courses.filter(course => {
        if (course.dept === this.dept && !this.number) {
          return course
        }
        else if (course.dept === this.dept && course.number.includes(this.number)) {
          return course
        }
      })

      // Filter the search results based on the user's enrolled courses
      this.$store.state.user.courses.forEach(courseId => {
        this.searchedCourses = this.searchedCourses.filter(course => !(courseId === course._id))
      })
    },
    async fetchCourses() {
      const response = await CourseService.fetchCourses()
      this.courses = response.data.courses
      this.searchedCourses = response.data.courses
    },
    checkLoggedIn() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    }
  },
  components: {
    "course-drawer": CourseDrawer
  }
};
</script>