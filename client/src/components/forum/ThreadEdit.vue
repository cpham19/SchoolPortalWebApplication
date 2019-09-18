<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex sm8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h1 class="display-1">Editting Thread</h1>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field v-model="thread.title" label="title of thread" type="text" required :rules="[required]" outline></v-text-field>
                <v-textarea v-model="thread.description" label="description of thread" :rules="[required]" outline></v-textarea>
              </v-form>
              <div class="failed" v-show="failedEdit">{{error}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="editThread()" :disabled="!thread.title || !thread.description" class="success" type="submit">Edit</v-btn>
              <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ForumService from "@/services/ForumService"
import {mapState} from "vuex"

export default {
  name: 'ThreadEdit',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      thread: {},
      failedEdit: false,
      successfulEdit: false,
      courseId: "",
      courseName: "",
      error: "",
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted() {
    this.checkLoggedIn()
    this.courseId = this.$store.state.route.params.courseId
    this.courseName = this.$store.state.route.params.courseName
    const threadId = this.$store.state.route.params.threadId
    const response = await ForumService.getThread(threadId)
    this.thread = response.data.thread
  },
  methods: {
    back: function() {
      this.$router.push(`/forums/${this.courseId}/${this.courseName}/${this.thread._id}`)
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async editThread() {
      if (!this.thread.title || !this.thread.description) {
        this.failedEdit = true
        this.successfulEdit = false
        this.error = "One or more of the fields are empty."
        return
      }

      delete this.thread.__v

      try {
        const response = await ForumService.editThread(this.thread)
        this.failedEdit = false
        this.successfulEdit = true
        this.$router.push(`/forum/${this.thread._id}`)
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