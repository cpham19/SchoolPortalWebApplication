<template>
  <div>
    <h1>Course Page</h1>
    {{ status }}
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import {store} from '../store/store.js'

export default {
  name: "Course",
  data() {
    return {
      status: ""
    };
  },
  mounted() {
     this.fetchCourse();
  },
  methods: {
    async fetchCourse() {
      const response = await CourseService.fetchCourse();
      this.status = response.data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>