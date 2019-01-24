<template>
  <div class="home">
    <a href="#" @click="log($event)">ClickLog</a><br />
    <a href="#" @click="toastShow">toastShow</a><br />
    <a href="#" @click="submit()">UserInfo</a> : {{user}}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
  },
  methods: {
    // async submit() {
    //   const userInfo = {
    //     email: 'lyjguy',
    //     password: '12345',
    //   };
    //   try {
    //     await this.$store.getters['user/user'];
    //   } catch (error) {
    //     this.$toasted.error('Hmm, those details don\'t seem right.');
    //   }
    // },
    log() {
      console.log(`url : ${process.env.VUE_APP_TOS_WEB_URL}`);
    },
    toastShow() {
      this.$toasted.show('my message', { /* some option */ });
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>
