export default function useUser() {
  const route = useRoute()
  const steamid = route.params.steamid

  onBeforeMount(() => {
    if (this.$route.params.steamid == undefined) {
      // TODO: if user is not logged in, we can not redirect him to his page, so we must avoid that
      this.steamid = '1' /*state / local storage*/
    } else {
      this.steamid = this.$route.params.steamid
    }
  })

  return { steamid }
}
