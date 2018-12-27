<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">CSULA CENTER</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark :to="{name: 'Home'}">Home</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark :to="{name: 'CourseSearch'}">Course</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark :to="{name: 'Assignment'}">Assignments</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark :to="{name: 'Forum'}">Forum</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark v-on:click="logout()">Log Out</v-btn>
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
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
</style>