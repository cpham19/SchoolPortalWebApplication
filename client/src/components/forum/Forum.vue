<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-center>
      <v-flex xs8>
        <h3 class="text-white">
          {{course.dept}}{{course.number}}-{{course.section}} {{course.name}}
          <a v-on:click="navigateTo({name: 'ThreadAdd', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name}})"><v-icon :style="'color:white;'">add</v-icon></a>
        </h3>
        <table class="table table-striped table-light">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Thread</th>
              <th scope="col">Posted Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="thread in threads" :key="thread._id">
              <td>
                <a :style="'color:blue;'" v-on:click="navigateTo({name: 'ThreadView', params: {courseId: course._id, courseName: course.dept + ' ' + course.number + ' ' + course.section + ' ' +  course.name, threadId: thread._id}})">{{thread.title}}</a>
              </td>
              <td>{{thread.postedDate}}</td>
              <td>
                <v-btn v-show="isUserProfessor || user.userName === thread.author.userName" v-on:click="removeThread(thread._id)" class="error" type="submit">
                  <v-icon>remove</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ForumService from "@/services/ForumService";
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import { mapState } from "vuex";
export default {
  name: "Forum",
  data() {
    return {
      course: {},
      threads: [],
    };
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "isUserProfessor"])
  },
  mounted() {
    this.checkLoggedIn();
    this.getThreads();
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route);
    },
    async getThreads() {
      try {
        const courseId = this.$store.state.route.params.courseId;
        const courseResponse = await CourseService.getCourse(courseId);
        this.course = courseResponse.data.course;
        const forumResponse = await ForumService.getThreads();
        const repliesResponse = await ForumService.getReplies();
        this.threads = await forumResponse.data.threads.filter(thread => thread.courseId === this.course._id)
      }
      catch (err) {
        this.error = err.response.data;
      }
    },
    checkLoggedIn: function() {
      if (!this.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async removeThread(threadId) {
      try {
        const response = await ForumService.removeThread(threadId);
        this.getThreads();
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-light {
  border: solid 5px;
}
</style>