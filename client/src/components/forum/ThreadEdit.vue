<template>
  <div>
      <v-text-field v-model="thread.title" label="title of thread" type="text" required :rules="[required]" outline></v-text-field>
      <v-textarea v-model="thread.description" label="description of thread" :rules="[required]" outline></v-textarea>
      <v-btn v-on:click="editThread()" :disabled="!thread.title || !thread.description" class="success" type="submit">Edit</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
      <div class="failed" v-show="failedEdit">{{error}}</div>
  </div>
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
    const threadId = this.$store.state.route.params.threadId
    const response = await ForumService.getThread(threadId)
    this.thread = response.data.thread
  },
  methods: {
    back: function() {
      this.$router.push(`/forum/${this.thread._id}`)
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