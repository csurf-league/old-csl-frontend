import { ISteamUser } from 'types/store'
import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => ({
  async auth(): Promise<ISteamUser> {
    const { data } = await instance.put<ISteamUser>('/auth')
    return data
  },

  async getOneSteam(id: string) {
    const { data } = await instance.get<ISteamUser>(`/api/steam/${id}`)
    return data
  },

  async getAllSteam() {
    const { data } = await instance.get<ISteamUser[]>('/api/steam', {})
    return data
  },
})
