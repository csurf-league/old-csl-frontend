<template>
  <div>
    <span>home</span>
    <NuxtLink to="/profile/1">profile</NuxtLink>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: ' OI'
})
</script>

<style lang="scss">
.page-content {
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  gap: 15px;
  padding: 5px;
}
</style>
