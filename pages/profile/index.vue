<template>
  <h1>index </h1>
  <h1>data: {{ data }} </h1>
</template>

<script lang="ts">
    import { useNuxtApp } from '#app'

export default defineNuxtComponent({
  async setup() {
    const config = useRuntimeConfig()

    let data 

    let { $axios } = useNuxtApp()
    const axios = $axios()
    axios.get(config.API_URL + '/profile').then((response) => {
      /* do things with response and response.data */
      data = response.data
    }).catch((err) => {
        console.dir(err)
    })

    return { data }
  },
})
</script>

<style></style>
