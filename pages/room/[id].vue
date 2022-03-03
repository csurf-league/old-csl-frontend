<template>
  <div v-if="roomID != 0 && ws != null">
    <h1>room {{ roomID }}</h1>

    <!-- TODO: chat component (for room and hub) -->
    <h2>room chat</h2>
    <table></table>
    <fieldset>
      <legend>Enter your message..</legend>
      <div>
        <input type="text" placeholder="Your message..." style="height: 60px" v-model="chatMessage" />
        <button v-on:click="onSendMsg">Send message</button>
        <button v-on:click="onLeaveRoom">Leave room</button>
      </div>
    </fieldset>
        <button v-on:click="onLeaveRoom">Back to lobby</button>
    <h2>room messages:</h2>
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
      roomID: 0 as number,
      ws: null as WebSocket, // room websocket
      chatMessage: '' as string,
      chat: [] as string[], // TODO: as ChatMessage struct maybe with objects (sender, message, etc..) instead of hardcoded strings.
      steamid: (Math.floor(Math.random() * 10000) + 7000).toString(), // TODO: local storage steamid ofc
    }
  },
  methods: {
    onSendMsg: function (): void {
      this.ws.send(
        JSON.stringify({
          action: 'room-msg',
          message: this.chatMessage,
          sender: this.steamid,
        })
      )
    },
    onLeaveRoom: function (): void {
      this.$router.push('/rooms')
    },
    //* Socket stuff
    onSocketConnect: function (): void {
    },
    onSocketClose: function (): void {
    },
    onSocketMessage: function (evt): void {
      var msg = JSON.parse(evt.data)
      console.log(msg)

      switch (msg.action) {
        case "room-msg": {
          this.chat.push(`${msg.sender} : ${msg.message}`)
          break
        }
        case "join-room": {
          this.chat.push(`${msg.sender} has entered the room.`)
          break
        }
        case "left-room": {
          this.chat.push(`${msg.sender} has left the room.`)
          break
        }
      }
    },
    onSocketError: function (evt): void {
      this.$router.push('/404') // TODO: 404 page/component showing the error ig
    },
  },
  unmounted() {
    console.log('id unmounted')
    console.dir(this.ws)
    if (this.ws != null && this.ws.readyState != WebSocket.CLOSED)
      this.ws.close(1000, 'Client has left the room')
  },
  mounted() {
    const route = useRoute()

    const id = Number.parseInt(route.params.id as string, 10)
    if (id == undefined || isNaN(id) /*|| TODO: room id does not exist */) {
      return this.$router.push('/404')
    }

    this.roomID = id

    // connect to room websocket
    this.ws = new WebSocket(`ws://localhost:8081/api/room/${this.roomID}?steamid=${this.steamid}`)
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
  },
})
</script>

<style>
</style>