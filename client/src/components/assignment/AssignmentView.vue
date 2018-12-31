<template>
  <div>
      <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
      <h1 class="display-2">{{assignment.title}}</h1>
      <p class="lead">Due Date: {{assignment.dueDate}}</p>
      <p class="lead">{{assignment.description}}</p>
  </div>
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