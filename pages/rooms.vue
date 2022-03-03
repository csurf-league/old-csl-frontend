<template>
  <div v-if="ws != null">
    <h1>rooms lobby</h1>
    <h3>your steamid: {{ steamid }}</h3>
    <button v-on:click="getRooms">get-rooms</button>
    <button v-on:click="joinRoom(1)">join room 1</button>
    <button v-on:click="joinRoom(2)">join room 2</button>
    <button v-on:click="joinRoom(3)">join room 3</button>

    <h3>Current players in the hub:</h3>
    <ul>
      <li :key="p" v-for="p in hubPlayers">
        {{ p }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      ws: null as WebSocket,
      hubPlayers: [] as string[], // TODO: user interface
      steamid: (Math.floor(Math.random() * 10000) + 7000).toString(), // TODO: local storage steamid ofc
    }
  },

  methods: {
    joinRoom: function (v: number) {
      this.$router.push('/room/' + v)
    },
    getRooms: function () {
      this.ws.send(
        JSON.stringify({
          action: 'get-rooms',
          message: '',
          sender: '',
        })
      )
    },
    getCurrentPlayers: function () {
      this.ws.send(
        JSON.stringify({
          action: 'get-hub-players',
          message: '',
          sender: '',
        })
      )
    },
    //* Socket stuff
    onSocketConnect: function (): void {
      this.getRooms()
      this.getCurrentPlayers()
      console.log('socket conn')
    },
    onSocketClose: function (): void {},
    onSocketMessage: function (evt): void {
      var msg = JSON.parse(evt.data)
      console.log(msg)

      switch (msg.action) {
        case 'get-rooms': {
          // TODO:
          break
        }
        case 'get-hub-players': {
          this.hubPlayers = []
          msg.data.forEach((element) => {
            this.hubPlayers.push(element.steamid)
          })
          break
        }
        case 'join-hub': {
          this.hubPlayers.push(msg.sender)
          break
        }
        case 'left-hub': {
          this.hubPlayers.filter(s => s == msg.sender || s === msg.sender) //FIXME: not removing?
          break
        }
      }
    },
    onSocketError: function (evt): void {
      this.$router.push('/404') // TODO: 404 page/component showing the error ig
    },
  },
  unmounted() {
    if (this.ws != null && this.ws.readyState != WebSocket.CLOSED) {
      this.ws.close(1000, 'Client has left the hub')
    }
  },
  mounted() {
    // connect to hub websocket
    this.ws = new WebSocket(`ws://localhost:8081/api/rooms?steamid=${this.steamid}`)
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