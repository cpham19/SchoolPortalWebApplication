<template>
  <div>
    <div>
      <v-form>
        <v-select :items="depts" v-model="course.dept" label="department" required :rules="[required]" outline></v-select>
        <v-text-field v-model="course.name" label="course name" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.number" label="course number" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.section" label="course section" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.description" label="course description" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.unit" label="course unit" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.professor" label="course professor" type="text" required :rules="[required]" outline></v-text-field>
        <v-text-field v-model="course.room" label="course room" type="text" required :rules="[required]" outline></v-text-field>
      </v-form>
      <div class="failed" v-show="failedEdit">{{error}}</div>
      <v-btn v-on:click="editCourse()" :disabled="!course.dept || !course.name || !course.number || !course.section || !course.description || !course.unit || !course.professor || !course.room" class="green" type="submit">Submit Changes</v-btn>
      <v-btn v-on:click="back()" class="back" type="submit">Back and Discard Changes</v-btn>
    </div>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";
import Router from "vue-router";
import depts from "./depts";

export default {
  name: "CourseEdit",
  data() {
    return {
      headers: [
        { text: "Department", value: "dept" },
        { text: "Number", value: "number" },
        { text: "Section", value: "section" },
        { text: "Name", value: "name" },
        { text: "Unit", value: "unit" },
        { text: "Professor", value: "professor" },
        { text: "Action", value: "_id"}
      ],
      depts: [],
      course: {},
      failedEdit: false,
      successfulEdit: false,
      required: (value) => !!value || 'Required Field',
      error: ""
    };
  },
  async mounted() {
    this.depts = depts
    const courseId = this.$store.state.route.params.courseId
    const response = await CourseService.getCourse(courseId)
    this.course = response.data.course
  },
  methods: {
    back: function() {
      this.$router.push('/course/edit')
    },
    checkLoggedIn: function() {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push("/");
      }
    },
    async editCourse() {
      if (!this.course.dept || !this.course.name || !this.course.number || !this.course.section || !this.course.description || !this.course.unit || !this.course.professor || !this.course.room) {
        this.failedEdit = true
        this.successfulEdit = false
        this.error = "One or more of the fields are empty."
        return
      }

      delete this.course.__v

      try {
        const response = await CourseService.editCourse(this.course)
        this.failedEdit = false
        this.edit = false
        this.successfulEdit = true
        this.$router.push('/course/edit')
      }
      catch (err) {
        this.failedEdit = true
        this.successfulEdit = false
        this.error = err.response.data.error
      }
    }
  },
  components: {
  }
};
</script>

<style scoped>
.submit {
  color: green;
}

.back {
  color: black;
}

.edit {
  color:blue;
}

.failed {
  color:red;
}
</style>