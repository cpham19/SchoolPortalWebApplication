<template>
  <v-container fluid>
    <v-card height="55px">
      <v-bottom-nav :active.sync="active" :value="true">
        <v-btn color="teal" flat :to="{name: 'CourseSearch'}"><span>Search</span></v-btn>
        <v-btn v-show="isUserProfessor" color="blue" flat :to="{name: 'CourseAdd'}"><span>Add</span></v-btn>
        <v-btn v-show="isUserProfessor" color="red" flat :to="{name: 'CourseRemove'}"><span>Remove</span></v-btn>
        <v-btn v-show="isUserProfessor" color="green" flat :to="{name: 'CourseEdit'}"><span>Edit</span></v-btn>
        <v-btn v-show="!isUserProfessor" color="white" flat :to="{name: 'CourseDrop'}"><span>Drop</span></v-btn>
      </v-bottom-nav>
    </v-card>
    </v-container>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "CourseNavigation",
  data() {
    return {
    };
  },
  computed: {
    ...mapState([
      'isUserProfessor'
    ])
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
</style>