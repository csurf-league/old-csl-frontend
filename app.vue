<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from './store'

await useAsyncData('auth', async () => {
  const data = await useNuxtApp().$api().user.auth()
  if (data) useUserStore().setUserSettings(data)
})
</script>

<style lang="scss"></style>
