import axios from 'axios'

import { RoomApi } from './room'

export type ApiReturnType = {
  room: ReturnType<typeof RoomApi>
}

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: process.env.API_URL || '',
    headers: {
      Authorization: 'Bearer ' + process.env.API_URL,
      //   'X-Auth-Token': process.env.API_URL || '',
    },
    params: {
      //   token: process.env.API_URL,
    },
  })

  const apis = {
    room: RoomApi,
  }

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    }
  }, {} as ApiReturnType)

  return result
}
