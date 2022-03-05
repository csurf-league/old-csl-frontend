<template>
  <h1>profile {{ steamid }}</h1>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const steamid = route.params.steamid

    return { steamid }
  },
})
</script>

<style></style>
