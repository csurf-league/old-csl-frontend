<template>
  <h1>index</h1>
  <h1>data: {{ data }}</h1>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'

definePageMeta({
  middleware: 'auth'
})

const userStore = useUserStore()

const data = userStore.userInfo
</script>

<style></style>
