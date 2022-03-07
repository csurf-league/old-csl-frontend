import { UserState } from '@/types/store'
import { defineStore } from 'pinia'
import { ISteamUser } from '../types/store/user'

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
  },
})
