import { USER_TYPE } from '../api/types';

export interface SessionsState {
  userId?: string,
  username?: string,
  userType: USER_TYPE
}