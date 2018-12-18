<template>
  <div>
    <h1>Course Edit</h1>
    <course-drawer />
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseDrawer from "@/components/CourseDrawer.vue";

export default {
  name: "CourseEdit",
  data() {
    return {
      searchedCourses: [],
      courseDept: "",
      courseNumber: ""
    };
  },
  methods: {
    searchCourse: function(dept, number) {

    }
  },
  components: {
    "course-drawer": CourseDrawer
  }
};
</script>