<template>
  <h1>rooms</h1>
  <button v-on:click="getRooms">get-rooms</button>
  <button value="HAHAHAHAHA" v-on:click="joinRoom(1)">join room 1</button>
  <button value="XDDDDDDDDDDDDDDD" v-on:click="joinRoom(2)">join room 2</button>
  <button v-on:click="joinRoom(3)">join room 3</button>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      ws: null as WebSocket,
    }
  },

  methods: {
    joinRoom: function(v: number) {
      console.log(v)
      //this.$router.redirect("")
    },

    getRooms: function () {
      this.ws.send(JSON.stringify({
        action: 'get-rooms',
        message: '',
        sender: '',
        created: 'today', //TODO: today date? doesnt rly matter tho
      }))
    },
  },

  mounted() {
    this.ws = new WebSocket('ws://localhost:8081/api/rooms')

    this.ws.onopen = function () {
      alert('Connected...')
    }

    this.ws.onmessage = function (msg) {
      alert(msg.data)
    }

    this.ws.onclose = function () {
      alert('Connection is closed...')
    }

    this.ws.onerror = function (err) {
      // TODO: redirect to error page
      console.dir(err)
    }

    /* didnt work :C
    this.socket = this.$nuxtSocket({
      // nuxt-socket-io opts:
      name: 'csl', // Use socket "home"
      // socket.io-client opts:
      reconnection: false,
    })
    */
  },
})
</script>
<style>
</style>