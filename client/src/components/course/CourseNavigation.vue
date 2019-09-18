<template>
  <v-container fluid>
    <v-card dark height="55px">
      <v-bottom-navigation :value="true">
        <v-btn color="teal"  :to="{name: 'CourseSearch'}"><span><i class="fas fa-search"></i> Search</span></v-btn>
        <v-btn v-show="isUserProfessor" color="blue"  :to="{name: 'CourseAdd'}"><span><i class="fas fa-plus"></i> Add</span></v-btn>
        <v-btn v-show="isUserProfessor" color="red" :to="{name: 'CourseConfigure'}"><span><i class="fas fa-minus"></i> <i class="fas fa-edit"></i> Configure</span></v-btn>
        <v-btn v-show="!isUserProfessor" color="red"  :to="{name: 'CourseDrop'}"><span><i class="fas fa-tint"></i> Drop</span></v-btn>
      </v-bottom-navigation>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fas fa-edit {
  color:green;
}

.fas fa-minus {
  color:red;
}
</style>