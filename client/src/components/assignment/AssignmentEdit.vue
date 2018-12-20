<template>
  <div>
      <v-date-picker v-model="assignment.dueDate" required :rules="[required]"></v-date-picker>
      <v-text-field v-model="assignment.title" label="title of assignment" type="text" required :rules="[required]" outline></v-text-field>
      <v-textarea v-model="assignment.description" label="description of assignment" :rules="[required]" outline></v-textarea>
      <v-btn v-on:click="editAssignment()" :disabled="!assignment.dueDate || !assignment.title || !assignment.description" type="submit">Edit</v-btn><v-btn v-on:click="back()" type="submit">Back</v-btn>
      <div class="failed" v-show="failedEdit">{{error}}</div>
  </div>
</template>

<script>
import AssignmentService from "@/services/AssignmentService";

export default {
  name: 'AssignmentEdit',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      assignment: {},
      failedEdit: false,
      error: "",
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
    },
    async editAssignment() {
      if (!Object.keys(assignment).every(key => !!assignment[key])) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = "One or more of the fields are empty."
        return
      }

      delete this.assignment.__v

      try {
        const response = await AssignmentService.postAssignment(assignment)
        console.log(response)
        this.failedAdd = false
        this.successfulAdd = true
        this.$router.push('/assignment')
      }
      catch (err) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = err.response.data.error
      }
    },
  },
  components: {
  }
};
</script>

<style scoped>

</style>