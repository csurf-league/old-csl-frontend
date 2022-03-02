<template>
<div v-if="ws != null">
  <h1>rooms</h1>
  <button v-on:click="getRooms">get-rooms</button>
  <button value="HAHAHAHAHA" v-on:click="joinRoom(1)">join room 1</button>
  <button value="XDDDDDDDDDDDDDDD" v-on:click="joinRoom(2)">join room 2</button>
  <button v-on:click="joinRoom(3)">join room 3</button>
  </div>
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
      //this.$router.redirect("/room/"+v)
    },
    getRooms: function () {
      this.ws.send(JSON.stringify({
        action: 'get-rooms',
        message: '',
        sender: '',
      }))
    },
    //* Socket stuff
    onSocketConnect: function (): void {
    },
    onSocketClose: function (): void {
    },
    onSocketMessage: function (evt): void {
      alert(evt.data)
    },
    onSocketError: function (evt): void {
    },
  },
  unmounted() {
    if (this.ws != null && this.ws.readyState != WebSocket.CLOSED)
      this.ws.close(1000, 'Client has left the hub')
  },
  mounted() {
    // connect to hub websocket
    this.ws = new WebSocket('ws://localhost:8081/api/rooms')
    const _m = this // used to call vue methods
    this.ws.onopen = function () {
      _m.onSocketConnect()
    }
    this.ws.onclose = function () {
      _m.onSocketClose()
    }
    this.ws.onmessage = function (evt) {
      _m.onSocketMessage(evt)
    }
    this.ws.onerror = function (evt) {
      _m.onSocketError(evt)
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