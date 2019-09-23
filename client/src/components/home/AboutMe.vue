<template>
  <div class="text-center text-white" :style="'background: rgba(71, 71, 71, 0.9)'">
    <div v-show="!isUserProfessor" class="headline">Student</div>
    <div v-show="isUserProfessor" class="headline">Professor</div>
    <v-avatar size="250px" color="white">
      <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
    </v-avatar>
    <div class="headline">
      <v-avatar size="30px" color="white">
        <v-img :src="images.professor" v-show="isUserProfessor"></v-img>
      </v-avatar>
      <br />
      <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
    </div>
    <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>
    <h2>Address</h2>
    <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>
    <h2>Phone Number</h2>
    <p class="lead">{{user.phoneNumber}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AboutMe",
  data() {
    return {
      courses: [],
      assignments: [],
      images: {
        professor: require("../../assets/static/professor.png")
      }
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserProfessor"])
  },
  methods: {
  },
  components: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
