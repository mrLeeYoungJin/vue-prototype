<template>
  <div id="app">
    <v-app id="inspire">
    <Navbar />
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2018</span>
    </v-footer>

    <!-- set progressbar -->
    <vue-progress-bar></vue-progress-bar>
    </v-app>
  </div>
</template>

<script>

import Navbar from '@/components/layouts/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
