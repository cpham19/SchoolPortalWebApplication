<template>
  <div :style="'border: 1px solid;'">
    <v-toolbar dark>
      <v-toolbar-title>Assignments</v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-sheet v-show="assignments.length == 0">
          <p>No assigned assignments.</p>
      </v-sheet>
      <v-tab v-show="assignments.length != 0" v-for="assignment in assignments" :key="assignment._id">{{assignment.title}}</v-tab>
      <v-tab-item v-for="assignment in assignments" :key="assignment._id">
        <v-card flat tile>
          <v-card-text>
            <v-card-title>{{assignment.courseName}}</v-card-title>
            <hr />
            <p>Due Date: {{assignment.dueDate}}</p>
            <div class="text--primary">{{assignment.description}}</div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MyAssignments",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  props: ["assignments"]
};
</script>

<style scoped>
</style>