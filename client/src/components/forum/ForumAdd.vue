<template>
  <div>
      <h1 class="display-2">Adding thread to {{course.dept}}{{course.number}}-{{course.section}} {{course.name}}</h1>
      <v-text-field v-model="title" label="title of thread" type="text" required :rules="[required]" outline></v-text-field>
      <v-textarea v-model="description" label="description of thread" :rules="[required]" outline></v-textarea>
      <v-btn v-on:click="addThread()" :disabled="!title || !description" class="success" type="submit">Add</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
      <div class="failed" v-show="failedAdd">{{error}}</div>
  </div>
</template>

<script>
import ForumService from "@/services/ForumService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"

export default {
  name: 'ForumAdd',        
  data () {
    return {
      required: (value) => !!value || 'Required Field',
      course: {},
      title: "",
      description: "",
      failedAdd: false,
      successfulAdd: false,
      error: '',
    }
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn'
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
      this.$router.push("/forum")
    },
    async addThread() {
      const thread = {courseId: this.course._id, author: {_id: this.user._id, userName: this.user.userName, avatar: this.user.avatar}, title: this.title, description: this.description}
      
      if (!Object.keys(thread).every(key => !!thread[key])) {
        this.failedAdd = true
        this.successfulAdd = false
        this.error = "One or more of the fields are empty."
        return
      }

      try {
        const response = await ForumService.postThread(thread)
        this.failedAdd = false
        this.successfulAdd = true
        this.$router.push('/forum')
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