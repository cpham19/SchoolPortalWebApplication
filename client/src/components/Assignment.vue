<template>
  <div>
    <h1>Assignment Page</h1>
    {{ status }}
  </div>
</template>

<script>
import AssignmentService from "@/services/AssignmentService";
import Router from "vue-router";

export default {
  name: "Assignment",
  data() {
    return {
      status: ""
    };
  },
  mounted() {
     this.fetchAssignment(),
     this.checkLoggedIn()
  },
  methods: {
    async fetchAssignment() {
      const response = await AssignmentService.fetchAssignment();
      this.status = response.data;
    },
    checkLoggedIn() {
      if (!(this.$store.state.isUserLoggedIn)) {
        this.$router.push("/")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>