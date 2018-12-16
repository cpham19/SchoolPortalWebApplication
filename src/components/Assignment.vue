<template>
  <div>
    <h1>Assignment Page</h1>
    {{ status }}
  </div>
</template>

<script>
import AssignmentService from "@/services/AssignmentService";
import Router from "vue-router";
import {store} from '../store/store.js'

export default {
  name: "Assignment",
  data() {
    return {
      status: ""
    };
  },
  mounted() {
     this.fetchAssignment();
  },
  methods: {
    async fetchAssignment() {
      const response = await AssignmentService.fetchAssignment();
      this.status = response.data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>