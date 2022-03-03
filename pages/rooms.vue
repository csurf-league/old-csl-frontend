<template>
  <div v-if="ws != null">
    <h1>rooms lobby</h1>
    <h3>your steamid: {{ steamid }}</h3>
    <div v-if="rooms != []">
      <div v-for="r in rooms" :key="r.id">
        <button v-on:click="joinRoom(r.id)">
          join room {{ r.id }}; current players: {{ r.clients == null ? 0 : r.clients.length }}; maxplayers: {{ r.maxplayers }}
        </button>
        <br />
      </div>
    </div>
    <h3>Current players in the hub:</h3>
    <ul>
      <li :key="p" v-for="p in hubPlayers">
        {{ p }}
      </li>
    </ul>

<!-- TODO: chat component (for room and hub) -->
    <h2>hub chat</h2>
    <table></table>
    <fieldset>
      <legend>Enter your message..</legend>
      <div>
        <input type="text" placeholder="Your message..." style="height: 60px" v-model="chatMessage" />
        <button v-on:click="onSendMsg">Send message</button>
      </div>
    </fieldset>
    <h2>hub messages:</h2>
    <ul>
      <li :key="msg" v-for="msg in chat">
        {{ msg }}
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
      rooms: [],
      steamid: (Math.floor(Math.random() * 10000) + 7000).toString(), // TODO: local storage steamid / auth token
      chatMessage: '' as string,
      chat: [] as string[]
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
        })
      )
    },
    getCurrentPlayers: function () {
      this.ws.send(
        JSON.stringify({
          action: 'get-hub-players',
        })
      )
    },
    onSendMsg: function (): void {
      this.ws.send(
        JSON.stringify({
          action: 'hub-msg',
          message: this.chatMessage,
          sender: this.steamid,
        })
      )
    },
    //* Socket stuff
    onSocketConnect: function (): void {
      //this.getRooms() // backend will automatically send us current rooms when client enters the hub
      //this.getCurrentPlayers()
    },
    onSocketClose: function (): void {},
    onSocketMessage: function (evt): void {
      var msg = JSON.parse(evt.data)
      console.log(msg.action)

      switch (msg.action) {
        // called once on mounted
        case 'get-rooms': {
          // TODO:
          this.rooms = []
          msg.data.forEach((element) => {
            this.rooms.push(element)
          })
          console.dir(msg)
          break
        }
        case 'get-hub-players': {
          this.hubPlayers = []
          msg.data.forEach((element) => {
            this.hubPlayers.push(element.steamid)
          })
          break
        }
        // called everytime some one joins/leaves
        case 'join-hub': {
          this.chat.push(`${msg.sender} has joined the hub.`)
          this.hubPlayers.push(msg.sender)
          break
        }
        case 'left-hub': {
          this.chat.push(`${msg.sender} has left the hub.`)
          this.hubPlayers.pop(msg.sender)
          break
        }
        case 'hub-msg': {
          this.chat.push(`${msg.sender} : ${msg.message}`)
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