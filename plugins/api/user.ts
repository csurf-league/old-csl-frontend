import { ISteamUser } from 'types/store'
import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => ({
  async auth(): Promise<ISteamUser> {
    const { data } = await instance.put<ISteamUser>('/auth')

    return data
  },

  async getOne(id: number) {
    const { data } = await instance.get<ISteamUser>('/user/', {
      params: {
        id,
      },
    })
    return data
  },

  async getAll() {
    const { data } = await instance.get<ISteamUser[]>('/user', {})
    return data
  },
})
