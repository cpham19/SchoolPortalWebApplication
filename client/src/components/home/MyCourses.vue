<template>
  <div :style="'border: 1px solid;'">
    <v-toolbar dark>
      <v-toolbar-title v-show="!isUserProfessor">Currently Enrolled in {{courses.length}} Course(s)</v-toolbar-title>
      <v-toolbar-title v-show="isUserProfessor">Currently Teaching {{courses.length}} Course(s)</v-toolbar-title>
    </v-toolbar>
    <v-carousel :show-arrows-on-hover="true" height="150px;">
      <v-carousel-item v-for="course in courses" :key="course._id">
        <v-sheet :style="'background:rgba(192, 192, 192, 0.7);'" height="150px" tile>
          <v-row class="fill-height" align="center" justify="center">
            <p class="display">
              <course-dialog :course="course" />
            </p>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CourseDialog from "../course/CourseDialog";

export default {
  name: "MyCourses",
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapState([, "isUserLoggedIn", "isUserProfessor"])
  },
  components: {
    "course-dialog" : CourseDialog,
  },
  props: ["courses"],
};
</script>

<style scoped>
.display {
  font-size: 36px;
}

@media (max-width: 768px) {
  .lead {
    font-size:12px;
  }

  .display {
    font-size:18px;
    padding: 20px;
  }
}
</style>