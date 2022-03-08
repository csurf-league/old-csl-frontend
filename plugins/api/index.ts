import { defineNuxtPlugin } from '#app'
import axios from 'axios'

import { RoomApi } from './room'
import { UserApi } from './user'

export type ApiReturnType = {
  room: ReturnType<typeof RoomApi>
  user: ReturnType<typeof UserApi>
}

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token')

  const api = (): ApiReturnType => {
    const instance = axios.create({
      baseURL: useRuntimeConfig().API_URL || '',
      headers: {
        Cookie: 'session-csl=' + useCookie('session-csl').value,
      },
      withCredentials: true,
    })

    const apis = {
      room: RoomApi,
      user: UserApi,
    }

    const result = Object.entries(apis).reduce((prev, [key, f]) => {
      return {
        ...prev,
        [key]: f(instance),
      }
    }, {} as ApiReturnType)

    return result
  }

  return {
    provide: {
      api,
    },
  }
})
