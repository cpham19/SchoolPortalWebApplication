<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<script>
import HomeService from "@/services/HomeService";
import Router from "vue-router";
import {store} from '../store/store.js'

export default {
  name: "Home",
  data() {
    return {
      status: "",
    };
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>