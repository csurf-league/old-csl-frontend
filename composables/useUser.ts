export default function useUser() {
  const router = useRouter()
  const route = useRoute()
  const id = route.params.steamid

  onBeforeMount(() => {
    // TODO valid user
    // ...
    const isValid = true

    if (!isValid) router.push('/404')
  })

  return { id }
}
