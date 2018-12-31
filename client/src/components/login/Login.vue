<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-img src="static/csula-logo.png" aspect-ratio="1.3"></v-img>
        <v-card-text>
          <v-form>
            <v-text-field v-model="userName" label="username" type="text" required :rules="[required]" outline></v-text-field>
            <v-text-field v-model="password" label="password" type="password" required :rules="[required]" outline></v-text-field>
          </v-form>
          <div class="failed" v-show="failedLogin">{{error}}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-on:click="login()" :disabled="!userName || !password" class="btn-small waves-effect waves-light" type="button">Login</v-btn>
          <a v-on:click="toggleRegister()">New User?</a>
        </v-card-actions>
      </v-card>
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
      required: (value) => !!value || 'Required Field',
      failedLogin: false
    };
  },
  mounted() {
    this.checkLoggedIn()
  },
  methods: {
    async login() {
        const credentials = { userName: this.userName, password: this.password }

      // Reject if user doesn't put name or password
      if (!Object.keys(credentials).every(key => !!credentials[key])) {
        return;
      }

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
    checkLoggedIn: function() {
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push("/home")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.failed {
  color: red;
}
</style>