<template>
  <div :style="'border: 1px solid;background: rgba(255, 255, 255, 1);'">
    <v-row>
      <v-col>
        <v-toolbar dark>
          <v-toolbar-title>Calender</v-toolbar-title>
        </v-toolbar>
        <vue-cal class="vuecal--blue-theme" :selected-date="today" hide-view-selector default-view="week" style="height: 700px" :events="events"></vue-cal>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: "myCalender",
  data() {
    return {
      "today": "",
    };
  },
  computed: {},
  mounted() {
      var timestamp = new Date() 
      var month = ('0' + (timestamp.getMonth() + 1)).slice(-2)
      var day = ('0' + timestamp.getDate()).slice(-2)
      var year = timestamp.getFullYear()
      this.today = year + "-" + month + "-" + day
      console.log(this.events)
  },
  methods: {
  },
  components: {"vue-cal": VueCal},
  props: ["events"],
};  
</script>

<style>
/* Green-theme. */
.vuecal__menu, .vuecal__cell-events-count {background-color: #5842b9;}
.vuecal__menu li {border-bottom-color: rgb(0, 0, 0);color: #fff;}
.vuecal__menu li.active {background-color: rgb(30, 255, 0);}
.vuecal__cell.today, .vuecal__cell.current {background-color: rgba(2, 2, 238, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(10, 233, 66, 0.1);}
.vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
.vuecal__event {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff; font-size: 12px; }
</style>