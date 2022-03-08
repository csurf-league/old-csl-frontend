import { useUserStore } from '../store/user'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('auth middleware')
  const { isLoggedIn } = useUserStore()

  if (isLoggedIn) {
    // TODO Check is user auth and do smth
  }
})
