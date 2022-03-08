<template>
  <h1>index</h1>
  <h1>data: {{ data }}</h1>
</template>

<script setup lang="ts">
const axios = useAxios()

let data

axios
  .get('/profile')
  .then((response) => {
    /* do things with response and response.data */
    console.dir(response.data)
    data = response.data
  })
  .catch((err) => {
    console.dir(err)
  })
</script>

<style></style>
