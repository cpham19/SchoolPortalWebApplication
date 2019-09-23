<template>
  <v-container fluid>
    <v-layout align-center justify-center>
        <v-flex sm8>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>
                <h1 class="display-1">Adding assignment to {{course.dept}}{{course.number}}-{{course.section}} {{course.name}}</h1>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-date-picker v-model="date" required :rules="[required]"></v-date-picker><br/><br/>
                <v-text-field v-model="title" label="title of assignment" type="text" required :rules="[required]" outline></v-text-field>
                <v-textarea v-model="description" label="description of assignment" :rules="[required]" outline></v-textarea>
              </v-form>
              <div class="failed" v-show="failedAdd">{{error}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="addAssignment()" :disabled="!date || !title || !description" class="success" type="submit">Add</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AssignmentService from "@/services/AssignmentService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"

export default {
  name: 'AssignmentAdd',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      course: {},
      date: "",
      title: "",
      description: "",
      failedAdd: false,
      successfulAdd: false,
      error: '',
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
    ])
  },
  async mounted() {
    this.checkLoggedIn()
    const courseId = this.$store.state.route.params.courseId
    const response = await CourseService.getCourse(courseId)
    this.course = response.data.course
  },
  methods: {
    back: function() {
      this.$router.push("/assignments")
    },
    async addAssignment() {
      const assignment = {courseId: this.course._id, date: this.date, title: this.title, description: this.description}

      if (!Object.keys(assignment).every(key => !!assignment[key])) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = "One or more of the fields are empty."
        return
      }

      try {
        const response = await AssignmentService.postAssignment(assignment)
        this.failedAdd = false
        this.successfulAdd = true
        this.$router.push('/assignments')
      }
      catch (err) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = err.response.data.error
      }
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    }
  },
  components: {
  }
};
</script>

<style scoped>
  .failed {
    color: red;
  }

  .success {
    color: green;
  }
</style>