// user
export enum USER_TYPE {
  User = 'User',
  Guest = 'Guest'
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  type: USER_TYPE;
} 

export interface Room {
  id: string,
  name: string,
  users: string[],
  hosts: string[],
  pin: number,
  requestingUsers: string[]
}

export interface RoomsFetchResponse {
  room: Room[]
}