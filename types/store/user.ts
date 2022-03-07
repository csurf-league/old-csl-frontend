export interface UserState {
  isLoggedIn: boolean
  userInfo: ISteamUser
}

export interface ISteamUser {
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

export interface IPlayerStats {
  id: number
  player_steamid: string
  map_id: number
  kills: number
  deaths: number
  assists: number
  shots: number
  hits: number
  damage: number
  first_blood: number
  aces: number
  headshots: number
  no_ccope: number
  count: number
  playtime: number
  match_win: number
  match_lose: number
  match_draw: number
  rounds_won: number
  rounds_lost: number
  mvp: number
}

export enum Role {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}