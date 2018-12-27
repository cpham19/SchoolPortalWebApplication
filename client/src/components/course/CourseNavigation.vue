<template>
  <v-card height="55px" flat>
    <v-bottom-nav :active.sync="active" :value="true" absolute color="transparent">
      <v-btn dark color="teal" flat :to="{name: 'CourseSearch'}"><span>Search</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="blue" flat :to="{name: 'CourseAdd'}"><span>Add</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="red" flat :to="{name: 'CourseRemove'}"><span>Remove</span></v-btn>
      <v-btn v-show="this.$store.state.isUserAdmin" dark color="green" flat :to="{name: 'CourseEdit'}"><span>Edit</span></v-btn>
      <v-btn v-show="!this.$store.state.isUserAdmin" dark color="black" flat :to="{name: 'CourseDrop'}"><span>Drop</span></v-btn>
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