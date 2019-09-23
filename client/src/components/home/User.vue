<template>
  <v-container fluid fill-height grid-list-md>
    <v-layout>
      <v-flex xsm8>
        <div class="text-center text-white" :style="'background: rgba(71, 71, 71, 0.9)'">
          <div v-show="!user.isProfessor" class="headline">Student</div>
          <div v-show="user.isProfessor" class="headline">Professor</div>
          <v-avatar size="250px" color="white">
            <v-img class="img-circle elevation-7 mb-1" :src="user.avatar"></v-img>
          </v-avatar>
          <div class="headline">
            <v-avatar size="30px" color="white">
              <v-img :src="images.professor" height="30px" v-show="user.isProfessor"></v-img>
            </v-avatar>
            <br/>
            <span style="font-weight:bold">{{user.firstName}} {{user.lastName}}</span>
          </div>
          <div class="subheading text-xs-center grey--text pt-1 pb-3">{{user.email}}</div>
          <p class="lead">From {{user.city}}, {{user.state}}</p>
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
      images: {
        professor: require('../../assets/static/professor.png')
      },
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