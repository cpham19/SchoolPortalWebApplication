<template>
  <div id="app">
    <v-app id="inspire">
      <page-header/>
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
    "page-footer": Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.wrapper {
  background-image: url('./assets/static/abstract.jpg');
  background-repeat: repeat-y;
  display:flex;
}

/* We tell all items to be 100% width, via flex-basis */
.wrapper > * {
  flex: 1 100%;
}
</style>