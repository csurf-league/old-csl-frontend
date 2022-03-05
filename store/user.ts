import { UserState } from '@/types/store'
import { defineStore } from 'pinia'
import { User } from '../types/store/user'

//* =======================================================================================
//* User store
//* =======================================================================================

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      isLoggedIn: false,
      userInfo: {} as User,
    } as UserState),
  getters: {},
  actions: {
    setUserSettings(user: User) {
      this.userInfo = user
      this.isLoggedIn = true
    },
  },
})
