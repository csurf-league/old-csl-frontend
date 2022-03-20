<template>
  <div>
    <h1>home</h1>
    <NuxtLink to="/profile">your profile</NuxtLink> <br />
    <NuxtLink to="/profile/1">profile player 1</NuxtLink> <br />
    <NuxtLink to="/profile/2">profile player 2</NuxtLink> <br />
    <NuxtLink to="/profile/3">profile player 3</NuxtLink> <br />
  </div>
</template>

<script setup lang="ts"></script>

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
