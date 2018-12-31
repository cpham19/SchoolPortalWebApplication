<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Title</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{assignment.title}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Due Date</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{assignment.dueDate}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Description</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{assignment.description}}</v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AssignmentService from "@/services/AssignmentService"
import {mapState} from "vuex"

export default {
  name: 'AssignmentView',        
  data () {
    return {
      assignment: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
    ])
  },
  async mounted() {
    this.checkLoggedIn()
    const assignmentId = this.$store.state.route.params.assignmentId
    const response = await AssignmentService.getAssignment(assignmentId)
    this.assignment = response.data.assignment
  },
  methods: {
    back: function() {
      this.$router.push("/assignment")
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/")
      }
    }
  },
  components: {
  }
};
</script>

<style scoped>

</style>