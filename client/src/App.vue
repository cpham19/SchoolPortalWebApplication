<template>
  <div id="app">
    <v-app id="inspire">
      <page-header />

      <v-content class="wrapper">
        <router-view />
      </v-content>

      <page-footer />
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
   data() {
    return {
    };
   },
  components: {
    "page-header": PageHeader,
    "page-footer" : Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.wrapper {
  background: url('/static/abstract.jpg');
  background-repeat: repeat-y;
}
</style>