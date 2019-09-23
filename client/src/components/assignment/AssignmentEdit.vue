<template>
  <v-container fluid fill-height grid-list-md>
      <v-layout align-center justify-center>
        <v-flex sm10>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>
                <h1 class="display-1">Editting Assignment</h1>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-date-picker v-model="assignment.dueDate" required :rules="[required]"></v-date-picker>
              <br/><br/>
              <v-text-field v-model="assignment.title" label="title of assignment" type="text" required :rules="[required]" filled></v-text-field>
              <v-textarea v-model="assignment.description" label="description of assignment" :rules="[required]" filled></v-textarea>
              <v-btn v-on:click="editAssignment()" :disabled="!assignment.dueDate || !assignment.title || !assignment.description" class="success" type="submit">Edit</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
              <div class="failed" v-show="failedEdit">{{error}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import AssignmentService from "@/services/AssignmentService"
import {mapState} from "vuex"

export default {
  name: 'AssignmentEdit',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      assignment: {},
      failedEdit: false,
      successfulEdit: false,
      error: "",
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
      this.$router.push("/assignments")
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async editAssignment() {
      if (!this.assignment.dueDate || !this.assignment.title || !this.assignment.description) {
        this.failedEdit = true
        this.successfulEdit = false
        this.error = "One or more of the fields are empty."
        return
      }

      delete this.assignment.__v

      try {
        const response = await AssignmentService.editAssignment(this.assignment)
        this.failedEdit = false
        this.successfulEdit = true
        this.$router.push('/assignments')
      }
      catch (err) {
        this.failedEdit = true
        this.successfulEdit = false
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