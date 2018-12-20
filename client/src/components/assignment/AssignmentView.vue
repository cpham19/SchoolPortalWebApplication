<template>
  <div>
      <button v-on:click="back()" type="submit">Back</button>
      <h1 class="display-2">{{assignment.title}}</h1>
      <p class="lead">Due Date: {{assignment.dueDate}}</p>
      <p class="lead">{{assignment.description}}</p>
  </div>
</template>

<script>
import AssignmentService from "@/services/AssignmentService";

export default {
  name: 'AssignmentView',        
  data () {
    return {
      assignment: {}
    }
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
      if (!(this.$store.state.isUserLoggedIn)) {
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