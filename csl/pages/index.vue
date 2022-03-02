<template>
  <span>home</span>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default defineNuxtComponent({
  mounted() {
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts:
      name: 'home', // Use socket "home"
      channel: '/index', // connect to '/index'

      // socket.io-client opts:
      reconnection: false,
    })
  },

  setup() {
    const router = useRouter()
  },
})
</script>

<style lang="scss"></style>
