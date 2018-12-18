<template>
  <v-layout column>
    <v-flex>
      <img src="../assets/img/csula-logo.png" class="center" width="300px">
      <div class="col-lg-4 col-lg-offset-4">
        <v-form>
          <v-text-field v-model="userName" label="username" type="text" outline></v-text-field>
          <v-text-field v-model="password" label="password" type="password" outline></v-text-field>
        </v-form>
        <div class="failed" v-show="failedLogin">{{error}}</div>
        <v-btn v-on:click="login()" :disabled="!userName || !password" class="btn-small waves-effect waves-light" type="button">Login</v-btn>
        <a v-on:click="toggleRegister()">New User?</a>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      error: "",
      failedLogin: false
    };
  },
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    async login() {
      // Reject if user doesn't put name or password
      if (
        !this.userName.replace(/\s/g, "") ||
        !this.password.replace(/\s/g, "")
      ) {
        return;
      }

      const credentials = { userName: this.userName, password: this.password };

      try {
        const response = await AuthenticationService.login(credentials)
        this.failedLogin = false
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setToken', response.data.token)
        this.$router.push("/home")
      }
      catch (err) {
        this.failedLogin = true
        this.error = err.response.data.error
      }
    },
    toggleRegister: function() {
      this.$router.push("/register");
    },
    checkLoggedIn() {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push("/home")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

.failed {
  color: red;
}
</style>