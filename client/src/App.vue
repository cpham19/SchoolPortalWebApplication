<template>
  <div id="app">
    <v-app>
      <page-header/>
        <v-content>
          <v-container fluid>
            <router-view/>
          </v-container>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: "App",
  components: {
    "page-header": PageHeader,
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}


</style>