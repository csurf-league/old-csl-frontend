export interface UserState {
  isLoggedIn: boolean
  userInfo: User
}

export interface User {
  id: number
  steamid: string
  personaname: string
  lastlogoff: 1646052798
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  realname: string
  primaryclanid: string
  timecreated: 1423135332
  loccountrycode: string
  created_at: Date
  updated_at: Date
}

export enum Role {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

export interface UserAuth {
  User: User
  Token: string
}
