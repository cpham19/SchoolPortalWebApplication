<template>
  <v-footer height="auto" dark>
    <v-layout justify-center row wrap>
      <v-flex py-3 text-xs-center xs12>
        Copyright &copy; {{ new Date().getFullYear() }} —
        <strong>
          <a href="https://github.com/cpham19">
            <font color="red">Calvin Pham</font>
          </a>
        </strong>
      </v-flex>
    </v-layout>
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