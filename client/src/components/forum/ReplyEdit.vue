<template>
  <div>
      <v-textarea v-model="reply.description" label="description of reply" :rules="[required]" outline></v-textarea>
      <v-btn v-on:click="editReply()" :disabled="!reply.description" class="success" type="submit">Edit</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
      <div class="failed" v-show="failedEdit">{{error}}</div>
  </div>
</template>

<script>
import ForumService from "@/services/ForumService";

export default {
  name: 'ReplyEdit',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      reply: {},
      failedEdit: false,
      successfulEdit: false,
      error: "",
    }
  },
  async mounted() {
    this.checkLoggedIn()
    const replyId = this.$store.state.route.params.replyId
    const response = await ForumService.getReply(replyId)
    this.reply = response.data.reply
  },
  methods: {
    back: function() {
      this.$router.push(`/forum/${this.reply.threadId}`)
    },
    checkLoggedIn: function() {
      if (!(this.$store.state.isUserLoggedIn)) {
        this.$router.push("/")
      }
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
        this.$router.push(`/forum/${this.reply.threadId}`)
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