<template>
  <v-footer>
    <v-card color="grey darken-4" padless width="100%">
      <v-card-text class="text-light">
        Copyright &copy; {{ new Date().getFullYear() }} —
        <strong>
          <a href="https://github.com/cpham19">
            <font color="red">Calvin Pham</font>
          </a>
        </strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>