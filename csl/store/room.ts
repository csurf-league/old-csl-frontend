import { RoomState } from '@/types/store'
import { defineStore } from 'pinia'
import { ApiStatus } from '~~/types'
import { Room } from '../types/store/room'

//* =======================================================================================
//* Room store
//* =======================================================================================

export const useRoomStore = defineStore('room', {
  state: () =>
    ({
      loadStatus: ApiStatus.NONE,
      currentRoom: {} as Room,
      errors: [],
    } as RoomState),
  getters: {},
  actions: {},
})
