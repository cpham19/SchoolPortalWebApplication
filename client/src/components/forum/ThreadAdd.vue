<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex sm8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>
              <h1 class="display-1">Adding thread to {{course.dept}}{{course.number}}-{{course.section}} {{course.name}}</h1>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="title" label="title of thread" type="text" required :rules="[required]" outline></v-text-field>
              <v-textarea v-model="description" label="description of thread" :rules="[required]" outline></v-textarea>
            </v-form>
            <div class="failed" v-show="failedAdd">{{error}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn v-on:click="addThread()" :disabled="!title || !description" class="success" type="submit">Add</v-btn><v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
           </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ForumService from "@/services/ForumService"
import CourseService from "@/services/CourseService"
import Router from "vue-router"
import {mapState} from "vuex"

export default {
  name: 'ThreadAdd',        
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
      this.$router.push(`/forums/${this.course._id}/${this.course.dept + ' ' + this.course.number + ' ' + this.course.section + ' ' +  this.course.name}`)
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
        this.$router.push(`/forums/${this.course._id}/${this.course.dept + ' ' + this.course.number + ' ' + this.course.section + ' ' +  this.course.name}`)
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