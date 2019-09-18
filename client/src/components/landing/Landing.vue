<template>
  <v-container class="landing" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <h1 class="text-uppercase font-weight-bold">Welcome to the School Portal Website!</h1>
        <hr class="divider my-4" />
        <p :style="'font-family:arial; font-size:24px;'">This site is designed to emulate the sites that students and teachers use for school purposes.</p>
        <v-btn class="mx-2" v-show="!isUserLoggedIn" :to="{name: 'Login'}">Login</v-btn>
        <v-btn class="mx-2" v-show="!isUserLoggedIn" :to="{name: 'Register'}">Register</v-btn>
        <p
          v-show="isUserLoggedIn"
          :style="'font-family:fantasy; font-size:24px;'"
        >You are currently logged in.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Router from "vue-router";

Vue.use(Router);

export default {
  name: "Landing",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserProfessor"])
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "Varela Round";
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 0.8rem;
}

.btn {
  -webkit-box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0.1875rem 0.1875rem 0 rgba(0, 0, 0, 0.1) !important;
  padding: 1.25rem 2rem;
  font-family: "Varela Round";
  font-size: 80%;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
  border: 0;
}

.btn-primary {
  background-color: black;
  color: white;
}
.btn-primary:hover {
  background-color: gray;
  color: black;
}
.btn-primary:focus {
  background-color: black;
  color: white;
}
.btn-primary:active {
  background-color: #467370 !important;
}

.landing {
  background-image: url("../../assets/static/landing.jpg");
}

@@media (max-width: 768px) {
  .box h1 {
    font-size: 3rem;
    line-height: 3.5rem;
    letter-spacing: 0.8rem;
  }
  .box h2 {
    max-width: 20rem;
    font-size: 1.25rem;
  }
}
</style>