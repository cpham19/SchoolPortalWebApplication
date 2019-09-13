<template>
  <v-container fluid bg fill-height grid-list-md text-xs-center :style="cssProps">
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Registration Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="firstName" label="first name" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="lastName" label="last name" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="streetAddress" label="street address" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="city" label="city" type="text" required :rules="[required]" outline></v-text-field>
                <v-select :items="states" v-model="state" label="state" required :rules="[required]" outline></v-select>
                <v-text-field v-model="zipCode" label="zipCode" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="email" label="email address" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="phoneNumber" label="phone number (XXX-XXX-XXXX)" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="userName" label="username" type="text" required :rules="[required]" outline></v-text-field>
                <v-text-field v-model="password" label="password" type="password" required :rules="[required]" outline></v-text-field>
                <v-switch :label="`Professor?: ${isProfessor.toString()}`" v-model="isProfessor" outline></v-switch>
              </v-form>
              <div class="failed" v-show="failedRegister">{{error}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="register()" color="success" block rounded :disabled="!firstName || !lastName || !streetAddress || !city || !state || !zipCode || !email || !phoneNumber || !userName || !password" type="submit">Register</v-btn>
              <v-btn v-on:click="back()" color="accent" block rounded>Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
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
      isProfessor: false,
      failedRegister: false,
      required: (value) => !!value || 'Required Field',
      error: "",
      cssProps: {
        backgroundImage: "url('/static/login.jpg')"
      }
    };
  },
  mounted() {
    this.states = states
  },
  methods: {
    back: function() {
      this.$router.push('/login')
    },
    async register () {
      const credentials = {firstName: this.firstName, lastName: this.lastName, streetAddress : this.streetAddress, city : this.city, state: this.state, zipCode: this.zipCode, email: this.email, phoneNumber : this.phoneNumber, userName: this.userName, password: this.password, isProfessor: this.isProfessor}

      try {
        const response = await AuthenticationService.register(credentials)
        this.failedRegister = false
        this.$router.push('/login')
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

.failed {
  color: red;
}
</style>