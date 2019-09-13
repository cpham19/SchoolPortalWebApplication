<template>
  <v-toolbar fixed dark prominent>
    <v-toolbar-title class="mr-4">School Portal Center</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!this.$store.state.isUserLoggedIn" :to="{name: 'Landing'}">Home</v-btn>
      <v-btn v-if="!this.$store.state.isUserLoggedIn" :to="{name: 'Login'}">Login</v-btn>
      <v-btn v-if="!this.$store.state.isUserLoggedIn" :to="{name: 'Register'}">Register</v-btn>

      <v-btn v-if="this.$store.state.isUserLoggedIn" :to="{name: 'Home'}">Home</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" :to="{name: 'CourseSearch'}">Course</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" :to="{name: 'Assignment'}">Assignments</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" :to="{name: 'Forum'}">Forum</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" v-on:click="logout()">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {

    };
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setToken', null)
      this.$router.push('/')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>