<template>
  <v-container fluid>
    <v-card height="55px">
      <v-bottom-nav :active.sync="active" :value="true">
        <v-btn color="teal" flat :to="{name: 'CourseSearch'}"><span><i class="fas fa-search"></i> Search</span></v-btn>
        <v-btn v-show="isUserProfessor" color="blue" flat :to="{name: 'CourseAdd'}"><span><i class="fas fa-plus"></i> Add</span></v-btn>
        <v-btn v-show="isUserProfessor" flat :to="{name: 'CourseConfigure'}"><span><i class="fas fa-minus"></i> <i class="fas fa-edit"></i> Configure</span></v-btn>
        <v-btn v-show="!isUserProfessor" color="orange" flat :to="{name: 'CourseDrop'}"><span><i class="fas fa-tint"></i> Drop</span></v-btn>
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
.fas fa-edit {
  color:green;
}

.fas fa-minus {
  color:red;
}
</style>