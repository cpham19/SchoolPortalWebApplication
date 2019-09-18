<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <p class="display">
          <a class="text-dark" v-on="on">{{course.dept}}{{course.number}} {{course.name}} - Section {{course.section}}</a>
        </p>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{course.dept}}{{course.number}} {{course.name}} - Section {{course.section}}</v-card-title>
          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Department</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.dept}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Number</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.number}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Title</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.name}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.section}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Professor</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.professor}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Room</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.room}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Units</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.unit}}</v-card-text>

          <v-toolbar dark color="primary" dense>
            <v-toolbar-title>Description</v-toolbar-title>
          </v-toolbar>
          <v-card-text>{{course.description}}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "CourseDialog",
  data() {
    return {
      dialog:false,
    };
  },
  async mounted() {
    
  },
  computed: {

  },
  methods: {
  },
  components: {
  },
  props: ['course']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>