import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./types";

const API_URL = 'http://192.168.189.82:4040/api';
// const API_URL = 'http://10.77.20.199:4040/api';

const USER_API_PATH = '/user';

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    // check
    getStatus: builder.query<{ status: string }, number>({
      query: (number) => "/",
    }),

    // user
    login: builder.mutation<{ user: IUser; message: string }, { login: string; password: string }>({
      query: ({ login, password }) => ({
        url: `${USER_API_PATH}/login`,
        method: "POST",
        body: { login, password },
      }),
    }),
    register: builder.mutation<{ message: string }, { name: string, login: string, password: string }>({
      query: ({ login, name, password }) => ({
        url: USER_API_PATH,
        method: 'POST',
        body: { name, login, password }
      })
    }),

    // room
  }),
});

export const { 
  // check
  useGetStatusQuery,

  // user
  useLoginMutation,
  useRegisterMutation,
} = apiSlice;
export default apiSlice;
