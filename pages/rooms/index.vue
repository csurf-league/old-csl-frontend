<template>
  <div v-if="ws != null">
    <h1>rooms lobby</h1>
    <h3>your steamid: {{ steamid }}</h3>
    <div v-if="rooms != []">
      <div v-for="r in rooms" :key="r.id">
        <button v-on:click="joinRoom(r.id)">
          join room {{ r.id }}; current players: {{ r.clients == null ? 0 : r.clients.length }}; maxplayers:
          {{ r.maxplayers }}
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

<script setup lang="ts">
//* Data
const router = useRouter()
const ws = ref<WebSocket>(null)
const hubPlayers = ref<string[]>([])
const rooms = ref([])
const steamid = ref((Math.floor(Math.random() * 10000) + 7000).toString())
const chatMessage = ref<string>('')
const chat = ref<string[]>([])

//* Lifecycle hooks
onUnmounted(() => {
  if (ws.value != null && ws.value.readyState != WebSocket.CLOSED) {
    ws.value.close(1000, 'Client has left the hub')
  }
})
onMounted(() => {
  // connect to hub websocket
  ws.value = new WebSocket(`ws://localhost:8081/api/rooms?steamid=${steamid.value}`)
  ws.value.onopen = function (evt: Event) {
    onSocketConnect()
  }
  ws.value.onclose = function (evt: CloseEvent) {
    onSocketClose()
  }
  ws.value.onmessage = function (evt: MessageEvent<any>) {
    onSocketMessage(evt)
  }
  ws.value.onerror = function (evt: Event) {
    onSocketError(evt)
  }
})

//* Methods
const joinRoom = (id: number) => {
  router.push(`/room/${id}`)
}
const getRooms = () => {
  ws.value.send(JSON.stringify({ action: 'get-rooms' }))
}
const getCurrentPlayers = () => {
  ws.value.send(JSON.stringify({ action: 'get-hub-players' }))
}
const onSendMsg = () => {
  ws.value.send(
    JSON.stringify({
      action: 'hub-msg',
      message: chatMessage.value,
      sender: steamid.value,
    })
  )
}
const onSocketConnect = () => {}
const onSocketClose = () => {}
const onSocketError = (evt: Event) => {
  router.push('/404') // TODO: error page/component showing the error ig
}
const onSocketMessage = (evt: MessageEvent<any>) => {
  var msg = JSON.parse(evt.data)
  console.log(msg.action)

  switch (msg.action) {
    // called once on mounted
    case 'get-rooms': {
      // TODO:
      rooms.value = []
      msg.data.forEach((element) => {
        rooms.value.push(element)
      })
      console.dir(msg)
      break
    }
    case 'get-hub-players': {
      hubPlayers.value = []
      msg.data.forEach((element) => {
        hubPlayers.value.push(element.steamid)
      })
      break
    }
    // called everytime some one joins/leaves
    case 'join-hub': {
      chat.value.push(`${msg.sender} has joined the hub.`)
      hubPlayers.value.push(msg.sender)
      break
    }
    case 'left-hub': {
      chat.value.push(`${msg.sender} has left the hub.`)
      hubPlayers.value = hubPlayers.value.filter(function (value, index, arr) {
        return value != msg.sender
      })
      break
    }
    case 'hub-msg': {
      chat.value.push(`${msg.sender} : ${msg.message}`)
      break
    }
  }
}

// Return only what's needed outside of <script>
</script>
<style></style>
