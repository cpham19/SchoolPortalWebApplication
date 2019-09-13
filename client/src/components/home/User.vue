<template>
  <v-container fluid>
  <v-layout>
    <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
    <v-flex xs12 md12>
      <div class="text-xs-center">
        <div class="headline" v-show="this.isUserProfessor">isUserProfessor</div>
        <div class="headline" v-show="!this.isUserProfessor">Student</div>
        <v-avatar size="250px">
          <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
        </v-avatar>
        <div class="headline">
          <!-- <v-img v-show="isUserProfessor" src="static/isUserProfessor.png" height="30px" alt="isUserProfessor" contain></v-img> -->
          <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
        </div>

        <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>

        <h2>Address</h2>
        <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

        <h2>Phone Number</h2>
        <p class="lead">{{user.phoneNumber}}</p>
      </div>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import HomeService from "@/services/HomeService"
import { mapState } from "vuex"
import Router from "vue-router"

export default {
  name: "User",
  data() {
    return {
      user: {},
      threadId: ""
    };
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "isUserProfessor"
    ])
  },
  mounted() {
    this.checkLoggedIn()
    this.getUser()
  },
  methods: {
    back: function() {
      this.$router.push(`/forum/${this.$store.state.route.params.threadId}`)
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/")
      }
    },
    async getUser() {
      const userId = this.$store.state.route.params.userId
      this.threadId = this.$store.state.route.params.threadId
      const response = await HomeService.getUser(userId)
      this.user = response.data.user
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>