import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { IUser, MyRoomsFetchResponse, RoomsFetchResponse } from "./types";
// import dotenv from "dotenv";

// dotenv.config();

const API_URL = `http://192.168.154.82:4040/api`;

const USER_API_PATH = '/user';
const USER_API_ROOMS = '/room';

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const userId = (getState() as RootState).session.userId;
      

      if (userId) {
        headers.set("x-user-id", userId);
      }

      return headers;
    },
  }),
  tagTypes: ["room", "user"],
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
      })
    }),
    register: builder.mutation<{ message: string }, { name: string, login: string, password: string }>({
      query: ({ login, name, password }) => ({
        url: USER_API_PATH,
        method: 'POST',
        body: { name, login, password }
      })
    }),


    // room
    fetchRoom: builder.query<RoomsFetchResponse, { roomId: string, i?: number }>({
      query: ({ roomId, i }) => `${USER_API_ROOMS}/${roomId}`,
      providesTags: ["room"]
    }),
    fetchRoomByPin: builder.query<RoomsFetchResponse, { roomPin: string, i?: number }>({
      query: ({ roomPin, i }) => `${USER_API_ROOMS}/filter/pin/${roomPin}`,
      providesTags: ["room"]
    }),
    fetchRooms: builder.query<RoomsFetchResponse, void>({
      query: () => USER_API_ROOMS,
      providesTags: ["room"]
    }),
    fetchMyRooms: builder.query<MyRoomsFetchResponse, void>({
      query: () => `${USER_API_ROOMS}/my-rooms`,
      providesTags: ["room"]
    }),
    createRoom: builder.mutation<{ message: string }, { name: string }>({
      query: ({ name }) => ({
        url: USER_API_ROOMS,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ["room"]
    }),
    joinToRoom: builder.mutation<{ message: string }, { pin: string, userId: string }>({
      query: ({ pin, userId }) => ({
        url: `${USER_API_ROOMS}/join-user`,
        method: 'PATCH',
        body: { pin, userId }
      }),
      invalidatesTags: ["room"]
    }),
  }),
  
});

export const { 
  // check
  useGetStatusQuery,

  // user
  useLoginMutation,
  useRegisterMutation,

  //rooms
  useFetchRoomQuery,
  useFetchRoomByPinQuery,
  useFetchRoomsQuery,
  useFetchMyRoomsQuery,
  useCreateRoomMutation,
  useJoinToRoomMutation,
} = apiSlice;
export default apiSlice;
