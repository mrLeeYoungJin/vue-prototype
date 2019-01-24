<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="LeftDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Total Operation System</v-toolbar-title>
  </v-toolbar>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    LeftDrawer() {
      this.$emit('left-drawer');
    },
  },
};

</script>

<style lang="scss" scoped>

</style>
