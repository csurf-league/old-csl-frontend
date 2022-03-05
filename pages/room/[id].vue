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
  setup() {
    //* Data
    const router = useRouter()
    const route = useRoute()
    const roomID = ref<number>(0)
    const ws = ref<WebSocket>(null)
    const steamid = ref((Math.floor(Math.random() * 10000) + 7000).toString())
    const chatMessage = ref<string>('')
    const chat = ref<string[]>([])

    //* Lifecycle hooks
    onUnmounted(() => {
      if (ws.value != null && ws.value.readyState != WebSocket.CLOSED) {
        ws.value.close(1000, 'Client has left the room')
      }
    })
    onMounted(() => {
      roomID.value = Number.parseInt(route.params.id as string, 10)

      // connect to room websocket
      ws.value = new WebSocket(`ws://localhost:8081/api/room/${roomID.value}?steamid=${steamid.value}`)
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
    const onSendMsg = () => {
      ws.value.send(
        JSON.stringify({
          action: 'room-msg',
          message: chatMessage.value,
          sender: steamid.value,
        })
      )
    }
    const onLeaveRoom = () => {
      router.push('/rooms') 
    }
    const onSocketConnect = () => {}
    const onSocketClose = () => {}
    const onSocketError = (evt: Event) => {
      router.push('/404') // TODO: error page/component showing the error ig
    }
    const onSocketMessage = (evt: MessageEvent<any>) => {
      var msg = JSON.parse(evt.data)
      console.log(msg)
      switch (msg.action) {
        case 'room-msg': {
          chat.value.push(`${msg.sender} : ${msg.message}`)
          break
        }
        case 'join-room': {
          chat.value.push(`${msg.sender} has entered the room.`)
          break
        }
        case 'left-room': {
          chat.value.push(`${msg.sender} has left the room.`)
          break
        }
      }
    }

    return { roomID, ws, chatMessage, chat, onSendMsg, onLeaveRoom }
  },
})
</script>

<style>
</style>