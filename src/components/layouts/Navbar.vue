<template>
  <div>
  <v-navigation-drawer
    fixed
    v-model="drawer"
    dark
    temporary
  >
    <v-list class="pa-1">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img alt="user_img" src="@/assets/images/leeyoungjin.png">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>이영진</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>

    <v-list expand>
      <v-divider light></v-divider>

      <v-list-group
        prepend-icon="account_circle"
        group
        value="true"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>실시간현황</v-list-tile-title>
        </v-list-tile>

        <v-list-tile :key="" to="/">
          <v-list-tile-title>통합현황</v-list-tile-title>
        </v-list-tile >
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

        <v-list-tile :key="" to="/about">
          <v-list-tile-title>개별 설비 현황</v-list-tile-title>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

        <v-list-tile :key="" >
          <v-list-tile-title>설비 가동 현황</v-list-tile-title>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

      </v-list-group>
      <v-divider light></v-divider>

      <v-list-group
        prepend-icon="account_circle"
        group
        value="true"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>종합 통계</v-list-tile-title>
        </v-list-tile>

        <v-list-tile :key="" >
          <v-list-tile-title>일간 보고서</v-list-tile-title>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

        <v-list-tile :key="" >
          <v-list-tile-title>월간 보고서</v-list-tile-title>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

        <v-list-tile :key="" >
          <v-list-tile-title>년간 보고서</v-list-tile-title>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon v-text=""></v-icon>
        </v-list-tile-action>

      </v-list-group>
      <v-divider light></v-divider>

      <v-list-tile to="/login">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Login</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>LogOut</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>

  <Header @left-drawer="showDrawer" />
</div>
</template>

<script>

import Header from '@/components/layouts/Header.vue';

export default {
  name: 'navbar',
  data: () => ({
    drawer: null,
  }),
  components: {
    Header,
  },
  methods: {
    showDrawer() {
      this.drawer = !this.drawer;
    },
    async logout() {
      await this.$store.dispatch('user/userLogout');
      this.$router.push({ name: 'login' });
      document.location.href = '/login';
    },
  },
  computed: {
  },
};

</script>

<style lang="scss" scoped>

</style>
