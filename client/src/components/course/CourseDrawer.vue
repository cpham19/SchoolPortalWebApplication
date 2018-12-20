<template>
  <v-navigation-drawer permanent>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">Course Options</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list dense class="pt-0">
      <v-list-tile v-on:click="navigateTo('/course/search')">
        <v-list-tile-content>
          <v-list-tile-title>Search Courses</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-on:click="navigateTo('/course/add')">
        <v-list-tile-content>
          <v-list-tile-title>Add Course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-on:click="navigateTo('/course/remove')">
        <v-list-tile-content>
          <v-list-tile-title>Remove Course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-on:click="navigateTo('/course/edit')">
        <v-list-tile-content>
          <v-list-tile-title>Edit Course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile v-on:click="navigateTo('/course/drop')">
        <v-list-tile-content>
          <v-list-tile-title>Drop Course</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "CourseDrawer",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    navigateTo(path) {
      this.$router.push(path);
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