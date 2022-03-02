<template>
  <h1>profile {{ steamid }}</h1>
</template>

<script lang="ts">
import useUser from '../../composables/useUser'

export default defineNuxtComponent({
  //? what???
  async mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 3000)
    })
    if (this.$route.params.steamid == undefined) {
      // TODO: if user is not logged in, we can not redirect him to his page, so we must avoid that
      this.steamid = '1' /*state / local storage*/
    } else {
      this.steamid = this.$route.params.steamid
    }
  },

  setup() {
    const { steamid } = useUser()

    return { steamid }
  },
})
</script>

<style></style>
