<template>
  <h1>profile {{ steamid }}</h1>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const steamid = route.params.steamid // in case no steamid is sent, nuxt will redirect to 404

    return { steamid }
  },
})
</script>

<style></style>
