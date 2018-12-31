<template>
  <div>
    <course-nav />
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import CourseNavigation from "@/components/course/CourseNavigation.vue";

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
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    }
  },
  components: {
    "course-nav": CourseNavigation
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>