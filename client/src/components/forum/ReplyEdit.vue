<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex sm8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h1 class="display-1">Editting Reply</h1>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-textarea v-model="reply.description" label="description of reply" :rules="[required]" outline></v-textarea>
              </v-form>
              <div class="failed" v-show="failedEdit">{{error}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-on:click="editReply()" :disabled="!reply.description" class="success" type="submit">Edit</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
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
  name: 'ReplyEdit',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      reply: {},
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
    this.getReply()
    this.courseId = this.$store.state.route.params.courseId
    this.courseName = this.$store.state.route.params.courseName
    this.threadId = this.$store.state.route.params.threadId
  },
  methods: {
    back: function() {
      this.$router.push(`/forums/${this.courseId}/${this.courseName}/${this.reply.threadId}`)
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async getReply() {
      const replyId = this.$store.state.route.params.replyId
      const response = await ForumService.getReply(replyId)
      this.reply = response.data.reply
    },
    async editReply() {
      if (!this.reply.description) {
        this.failedEdit = true
        this.successfulEdit = false
        this.error = "One or more of the fields are empty."
        return
      }

      delete this.reply.__v

      try {
        const response = await ForumService.editReply(this.reply)
        this.failedEdit = false
        this.successfulEdit = true
              this.$router.push(`/forums/${this.courseId}/${this.courseName}/${this.threadId}`)
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