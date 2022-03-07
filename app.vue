<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  setup() {
    const axios = useAxios()
    axios
      .get('/profile')
      .then((response) => {
        // save user in pinia
        console.dir(response.data)
      })
      .catch((err) => {
        // user is not logged in, remove it from pinia?
        console.log(err)
      })
  }
})

definePageMeta({
  layout: false,
})
</script>

<style lang="scss"></style>
