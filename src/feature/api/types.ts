// user
export enum USER_TYPE {
  User = 'User',
  Guest = 'Guest'
}

export interface Coords {
  long: number;
  lat: number;
  radius: number;
  timestamp: number;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
  type: USER_TYPE;
  coords: Coords | undefined;
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

export interface MyRoomsFetchResponse {
  host: Room[],
  user: Room[],
  request: Room[],
}