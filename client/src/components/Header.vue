<template>
  <div>
    <v-toolbar fixed dark prominent app>
      <v-toolbar-title class="mr-4"><a :href="'/'" :style="'color:white;'">School Portal Center</a></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn v-show="!this.$store.state.isUserLoggedIn" :to="{name: 'Landing'}">Home</v-btn>
        <v-btn v-show="!this.$store.state.isUserLoggedIn" :to="{name: 'Login'}">Login</v-btn>
        <v-btn v-show="!this.$store.state.isUserLoggedIn" :to="{name: 'Register'}">Register</v-btn>

        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Home'}">Home</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'CourseSearch'}">Course</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Assignment'}">Assignments</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" :to="{name: 'Forum'}">Forum</v-btn>
        <v-btn v-show="this.$store.state.isUserLoggedIn" v-on:click="logout()">Log Out</v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" @click="scrollToTop" class="hidden-md-and-up"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :style="'background:rgba(29,29,29,0.8);padding-top:50px;'" right temporary fixed absolute width="200" height="400" id="drawer">
      <v-list v-show="!this.$store.state.isUserLoggedIn">
        <v-list-tile :to="{name: 'Landing'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'Login'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'Register'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Register</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-show="this.$store.state.isUserLoggedIn">
        <v-list-tile :to="{name: 'Home'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'CourseSearch'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Courses</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'Assignment'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Assignments</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'Forum'}">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Forums</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-on:click="logout()">
          <v-list-tile-content>
            <v-list-tile-title style="font-size:24px;color:white;">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
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