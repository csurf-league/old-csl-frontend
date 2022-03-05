<template></template>

<script>
export default defineNuxtComponent({
  setup() {
    const config = useRuntimeConfig()

    onMounted(() => {
      window.location.replace(config.API_URL + '/login')
    })
  },
})

definePageMeta({
  layout: false,
})
</script>

<style></style>
