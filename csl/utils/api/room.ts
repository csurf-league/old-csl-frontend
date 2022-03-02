import { Room } from '@/types/store'
import { AxiosInstance } from 'axios'

export const RoomApi = (instance: AxiosInstance) => ({
  async getOne(id: number) {
    const { data } = await instance.get<Room>('/rooms/'{
      params:{
        id
      }
    })
    return data
  },

  async getAll() {
    const { data } = await instance.get<Room[]>('/rooms', {})
    return data
  },
})
