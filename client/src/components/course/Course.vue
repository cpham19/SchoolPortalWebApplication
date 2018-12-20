<template>
  <div>
    <h1>Course Page</h1>
    <course-drawer />
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";

import CourseDrawer from "@/components/course/CourseDrawer.vue";

export default {
  name: "Course",
  data() {
    return {
      
    };
  },
  mounted() {
    this.checkLoggedIn()
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>