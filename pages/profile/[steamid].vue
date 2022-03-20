<template>
  <h1>profile {{ id }}</h1>
  <h1>data {{ data }}</h1>
</template>

<script setup lang="ts">
const { id } = useUser()
const data = await useNuxtApp().$api().user.getOneSteam(id as string)
</script>

<style></style>
