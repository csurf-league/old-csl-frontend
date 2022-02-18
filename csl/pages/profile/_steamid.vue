<template></template>

<script lang="ts">
export default {
  data: () => ({
    steamid: "", // steamid64
  }),

  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 3000);
    });

    if (this.$route.params.steamid == undefined) {
      // TODO: if user is not logged in, we can not redirect him to his page, so we must avoid that
      this.steamid = "1" /*state / local storage*/;
    } else {
      this.steamid = this.$route.params.steamid;
    } 
  },
};
</script>

<style>
</style>