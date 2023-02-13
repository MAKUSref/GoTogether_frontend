import { USER_TYPE } from '../api/types';

export interface SessionsState {
  userId?: string,
  userType: USER_TYPE
}