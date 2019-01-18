<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <a href="#" @click="log($event)">ClickLog</a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    log() {
      console.log(`url : ${process.env.VUE_APP_TOS_WEB_URL}`);
    },
  },
};
</script>
