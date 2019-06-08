<template>
  <div id="app">
    <v-app>
      <page-header/>
      <!-- <v-parallax src="static/csula.jpg" height="1200"> -->
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
      <!-- </v-parallax> -->

      <v-footer dark height="auto">
        <v-card flat tile class="blue lighten-1 white--text text-xs-center" >
          <v-card-text class="white--text pt-0">
            This site was created by a Computer Science Student to prototype a school portal site for students and teachers using MongoDB, Express, VueJS, and NodeJS. The purpose of the site is to provide simplistic and <non-clunky> </non-clunky> features that students and teachers can use. This site uses both Bootstrap and Vuetify for styling components.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text">
            &copy;2019 — <strong><a href="https://github.com/cpham19"><font color="red">Calvin Pham</font></a></strong>
          </v-card-text>
        </v-card>
      </v-footer>
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