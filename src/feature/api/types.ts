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