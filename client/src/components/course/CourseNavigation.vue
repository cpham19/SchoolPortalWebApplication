<template>
  <v-card height="55px" flat>
    <v-bottom-nav :active.sync="active" :value="true" absolute color="transparent">
      <v-btn dark color="teal" flat v-on:click="navigateTo('/course/search')"><span>Search</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="blue" flat v-on:click="navigateTo('/course/add')"><span>Add</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="red" flat v-on:click="navigateTo('/course/remove')"><span>Remove</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="green" flat v-on:click="navigateTo('/course/edit')"><span>Edit</span></v-btn>
      <v-btn v-show="!this.$store.state.isUserAdmin" dark color="black" flat v-on:click="navigateTo('/course/drop')"><span>Drop</span></v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: "CourseNavigation",
  data() {
    return {
    };
  },
  mounted() {

  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  },
  props: ['active']
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