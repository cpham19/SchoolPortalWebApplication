<template>
  <v-card height="100px" flat>
    <div class="headline text-xs-center pa-2">Course Page</div>
    <v-bottom-nav :value="true" absolute color="transparent">
      <v-btn color="teal" flat v-on:click="navigateTo('/course/search')"><span>Search</span></v-btn>
      <v-btn color="teal" flat v-on:click="navigateTo('/course/add')"><span>Add</span></v-btn>
      <v-btn color="teal" flat v-on:click="navigateTo('/course/remove')"><span>Remove</span></v-btn>
      <v-btn color="teal" flat v-on:click="navigateTo('/course/edit')"><span>Edit</span></v-btn>
      <v-btn color="teal" flat v-on:click="navigateTo('/course/drop')"><span>Drop</span></v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: "CourseNavigation",
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