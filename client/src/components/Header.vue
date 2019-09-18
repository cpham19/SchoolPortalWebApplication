<template>
 <v-card>
    <v-toolbar fixed dense>
      <v-toolbar-title class="mr-4">
        <v-btn dark :to="{name: 'Landing'}">School Portal Center</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn v-show="!this.$store.state.isUserLoggedIn" :to="{name: 'Login'}">Login</v-btn>
        <v-btn v-show="!this.$store.state.isUserLoggedIn" :to="{name: 'Register'}">Register</v-btn>

        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Home'}">Home</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'CourseSearch'}">Course</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Assignment'}">Assignments</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Forum'}">Forum</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" v-on:click="logout()">Log Out</v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" @click="scrollToTop" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :style="'background:rgba(29,29,29,0.8);padding-top:50px;'" right temporary fixed absolute width="200" height="400" id="drawer">
      <v-list v-show="!this.$store.state.isUserLoggedIn">
        <v-list-item :to="{name: 'Landing'}">
            <v-list-item-title style="font-size:24px;color:white;">Home</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Login'}">
            <v-list-item-title style="font-size:24px;color:white;">Login</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Register'}">
            <v-list-item-title style="font-size:24px;color:white;">Register</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-show="this.$store.state.isUserLoggedIn">
        <v-list-item :to="{name: 'Home'}">
            <v-list-item-title style="font-size:24px;color:white;">Home</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'CourseSearch'}">
            <v-list-item-title style="font-size:24px;color:white;">Courses</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Assignment'}">
            <v-list-item-title style="font-size:24px;color:white;">Assignments</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{name: 'Forum'}">
            <v-list-item-title style="font-size:24px;color:white;">Forums</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="logout()">
            <v-list-item-title style="font-size:24px;color:white;">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
 </v-card>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: null,
    };
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setToken", null);
      this.$router.push("/");
    },
    scrollToTop() {
      window.scrollTo(0,0);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>