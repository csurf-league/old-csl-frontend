<template>
  <h1>room {{ roomID }} </h1>
  <div>
			<table></table>
			<fieldset>
				<legend>Enter your message..</legend>
				<div>
					<input type="text" placeholder="Your message..." style="height:60px" v-model="chatMessage" />
          <button v-on:click="onSendMsg">Send message</button>
          <button v-on:click="onLeaveRoom">Leave room</button>
				</div>
			</fieldset>
      <h2> chat: </h2>
      <ul>
        <li :key="m" v-for="m in getChatMessages">
          {{m}}
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
      chatMessage: "" as string,
      chat: [""] as string[], // TODO: as ChatMessage maybe with objects (sender, message, etc..) instead of strings.
      steamid: (Math.floor(Math.random() * 10000) + 7000).toString(), // TODO: local storage steamid ofc
    }
  },
  computed: {
    getChatMessages: function (): string[] {
      return this.chat; //FIXME: chat doesnt update?
    }
  },
  methods: {
    onSendMsg: function () {
      this.ws.send(JSON.stringify({
        action: 'room-msg',
        message: this.chatMessage,
        sender: this.steamid,
        //created: 'today', //TODO: today date? doesnt rly matter tho
      }))
    },
    onReceiveMsg: function (msg) {
      console.log(msg)
      // handle message action... if room-msg ... else if ... 
    },
    onLeaveRoom: function () {
      this.$router.push("/rooms");
    },
  },
  mounted() {
    const route = useRoute();

    const id = Number.parseInt(route.params.id as string, 10);
    if (id == undefined || isNaN(id) /*|| room id does not exist */) {
      this.$router.push("/404");
      console.log('nan')
    }

    this.roomID = id;
    this.ws = new WebSocket(`ws://localhost:8081/api/room/${this.roomID}?steamid=${this.steamid}`)

    this.ws.onopen = function () {
      alert('Connected...')
    }

    this.ws.onmessage = function (evt) {
      //this.onReceiveMsg(evt.data) //FIXME: this.onReceiveMsg is not a function ?
      // this code should be on onReceiveMsg:
      var msg = JSON.parse(evt.data);
      console.log(msg)

      if (msg.action == "room-msg") {
        //this.chat.push(`${msg.sender}: ${msg.message}`) //FIXME: Cannot read properties of undefined (reading 'push') ?
        // This is how I fixed it but doesnt look like the right solution:
        let arr = this.chat || []
        arr.push(msg.message)
        this.chat = arr
      }
    }

    this.ws.onclose = function () {
      alert('Connection is closed...')
    }

    this.ws.onerror = function (err) {
      this.$router.push("/404"); // TODO: 404 page
      console.dir(err)
    }

  },
})
</script>

<style>
</style>