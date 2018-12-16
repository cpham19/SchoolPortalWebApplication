<template>
  <div>
    <img src="../assets/img/csula-logo.png" class="center" width="300px">
    <div class="col-lg-4 col-lg-offset-4">
      <input v-model="firstName" placeholder="first name" type="text">
      <input v-model="lastName" placeholder="last name" type="text">
      <input v-model="streetAddress" placeholder="street address" type="text">
      <input v-model="city" placeholder="city" type="text">
      <select class="browser-default" v-model="state">
        <option state disabled hidden value>Choose your state</option>
        <option v-for="stateAbbrev in states" v-bind:value="stateAbbrev" v-bind:key="stateAbbrev">{{stateAbbrev}}</option>
      </select>
      <input v-model="zipCode" placeholder="zipCode" type="text">
      <input v-model="email" placeholder="email address" type="text">
      <input v-model="phoneNumber" placeholder="phone number" type="text">
      <input v-model="userName" placeholder="username" type="text">
      <input v-model="password" placeholder="password" type="password">
      <div class="switch">
        <label>
          Student
          <input type="checkbox" v-model="admin">
          <span class="lever"></span>
          Admin (Professor)
        </label>
      </div>
      <button v-on:click="register()" :disabled="!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !email || !phoneNumber || !userName || !password" class="btn-small waves-effect waves-light" type="submit">Register</button>
      <button v-on:click="back()" class="btn-small waves-effect waves-light" type="submit">Back</button>
      <div class="failed" v-show="failedRegister">{{error}}</div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import states from "./states.js"
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
      states: states,
      userName: "",
      password: "",
      admin: false,
      failedRegister: false,
      error: "",
    };
  },
  mounted() {
  },
  methods: {
    back: function() {
      this.$router.push('/')
    },
    async register () {
      // Reject if user doesn't put name or password
      if (!this.firstName.replace(/\s/g, "") || !this.lastName.replace(/\s/g, "") || !this.streetAddress.replace(/\s/g, "") || !this.city.replace(/\s/g, "") || !this.state.replace(/\s/g, "") || !this.zipCode.replace(/\s/g, "") || !this.email.replace(/\s/g, "") || !this.phoneNumber.replace(/\s/g, "") || !this.userName.replace(/\s/g, "") || !this.password.replace(/\s/g, "")) {
        this.error = "Some fields are empty. Please check."
        this.failedRegister = true
        return
      }

      const credentials = {firstName: this.firstName, lastName: this.lastName, streetAddress : this.streetAddress, city : this.city, state: this.state, zipCode: this.zipCode, email: this.email, phoneNumber : this.phoneNumber, userName: this.userName, password: this.password, admin: this.admin}

      try {
        await AuthenticationService.register(credentials).then(response => {
          if (response.status == 200) {
            this.failedRegister = false
            this.$router.push('/')
          }
          else {
            this.failedRegister = true
            this.error = response.data.error
          }
        })
      }
      catch (err) {
        this.error = err.response.data.error
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