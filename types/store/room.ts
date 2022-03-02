import { ApiStatus } from '..'
import { User } from './user'

export interface RoomState {
  loadStatus: ApiStatus
  currentRoom: Room
  errors: []
}

export interface Room {
  id: number
  name: string
  captainId: number
  maxPlayers: MaxPlayers
  isPrivate: boolean
  isShare: boolean
  status: StatusRoom
  createdAt: Date
  udaptedAt: Date
  users: User[]
}

export const maxPlayers = [2, 3, 5] as const
export type MaxPlayers = typeof maxPlayers[number]

export const statusRoom = ['pending', 'searching', 'confirmation'] as const
export type StatusRoom = typeof statusRoom[number]
