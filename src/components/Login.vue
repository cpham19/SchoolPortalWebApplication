<template>
  <div>
    <img src="../assets/img/csula-logo.png" class="center" width="300px">

    <div class="col-lg-4 col-lg-offset-4">
      <input v-model="userName" placeholder="name" type="text">
      <input v-model="password" placeholder="password" type="password">
      <button
        v-on:click="login()"
        :disabled="!userName || !password"
        class="btn-small waves-effect waves-light"
        type="button"
      >Login</button>
      <a v-on:click="toggleRegister()">New User?</a>
      <div class="failed" v-show="failedLogin">{{error}}</div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Vue from "vue";
import Router from "vue-router";
import { store } from "../store/store.js";

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
        await AuthenticationService.login(credentials).then(response => {
          console.log(response)
          if (response.status == 200) {
            store.setUser(response.data.user)
            this.failedLogin = false
            this.$router.push("/home")
          }
          else {
            this.failedLogin = true
            this.error = response.data.error
          }
        })
      }
      catch (err) {
        console.log(err.response.data.error)
      }
    },
    toggleRegister: function() {
      this.$router.push("/register");
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