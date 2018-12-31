<template>
  <div>
    <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
    <v-responsive>
      <v-container grid-list-md text-xs-center fill-height>
        <v-layout>
          <v-flex xs12>
            <h1>User Information</h1>
            <v-img :src="`${user.avatar}`" height="300" contain></v-img>

            <h2>Full Name</h2>
            <p class="lead">{{user.firstName}} {{user.lastName}}</p>

            <h2>Address</h2>
            <p class="lead">{{user.streetAddress}}, {{user.city}} {{user.state}} {{user.zipCode}}</p>

            <h2>Email</h2>
            <p class="lead">{{user.email}}</p>

            <h2>Phone Number</h2>
            <p class="lead">{{user.phoneNumber}}</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
import HomeService from "@/services/HomeService"
import {mapState} from "vuex"
import Router from "vue-router"

export default {
  name: "User",
  data() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
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
      if (this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async getUser() {
        const userId = this.$store.state.route.params.userId
        const response = await HomeService.getUser(userId)
        this.user = response.data.user
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>