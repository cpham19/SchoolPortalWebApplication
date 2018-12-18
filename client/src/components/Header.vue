<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">CSULA CENTER</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark v-on:click="navigateTo('/home')">Home</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark v-on:click="navigateTo('/course')">Courses</v-btn>
      <v-btn v-if="this.$store.state.isUserLoggedIn" flat dark v-on:click="navigateTo('/assignment')">Assignments</v-btn>
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
    navigateTo(path) {
      this.$router.push(path)
    },
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