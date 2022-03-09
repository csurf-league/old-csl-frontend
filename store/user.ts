import { defineStore } from 'pinia'
import { ISteamUser, UserState } from '../types/store/user'

//* =======================================================================================
//* User store
//* =======================================================================================

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      isLoggedIn: false,
      userInfo: {} as ISteamUser,
    } as UserState),
  getters: {},
  actions: {
    setUserSettings(user: ISteamUser) {
      this.userInfo = user
      this.isLoggedIn = true
    },
    removeUserSettings() {
      useCookie('session-csl').value = null
      this.userInfo = {} as ISteamUser
      this.isLoggedIn = false
    },
  },
})
