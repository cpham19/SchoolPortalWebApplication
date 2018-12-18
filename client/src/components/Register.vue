<template>
  <v-layout column>
      <v-flex xs3 offset>
          <v-form>
            <v-text-field v-model="firstName" label="first name" type="text" outline></v-text-field>
            <v-text-field v-model="lastName" label="last name" type="text" outline></v-text-field>
            <v-text-field v-model="streetAddress" label="street address" type="text" outline></v-text-field>
            <v-text-field v-model="city" label="city" type="text" outline></v-text-field>
            <v-select :items="states" v-model="state" label="state" outline></v-select>
            <v-text-field v-model="zipCode" label="zipCode" type="text" outline></v-text-field>
            <v-text-field v-model="email" label="email address" type="text" outline></v-text-field>
            <v-text-field v-model="phoneNumber" label="phone number" type="text" outline></v-text-field>
            <v-text-field v-model="userName" label="username" type="text" outline></v-text-field>
            <v-text-field v-model="password" label="password" type="password" outline></v-text-field>
            <v-switch :label="`Admin: ${admin.toString()}`" v-model="admin" outline></v-switch>
          </v-form>
          <div class="failed" v-show="failedRegister">{{error}}</div>
          <v-btn v-on:click="register()" :disabled="!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !email || !phoneNumber || !userName || !password" class="btn-small waves-effect waves-light" type="submit">Register</v-btn>
          <v-btn v-on:click="back()" class="btn-small waves-effect waves-light" type="submit">Back</v-btn>
      </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import Vue from 'vue'
import Router from 'vue-router'
import states from './states'

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
      states: [],
      zipCode: "",
      email: "",
      phoneNumber: "",
      userName: "",
      password: "",
      admin: false,
      failedRegister: false,
      error: "",
    };
  },
  mounted() {
    this.states = states
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
        const response = await AuthenticationService.register(credentials)
        this.failedRegister = false
        this.$router.push('/')
      }
      catch (err) {
        this.failedRegister = true
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