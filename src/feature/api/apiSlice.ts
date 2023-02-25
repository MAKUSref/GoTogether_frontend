import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import appConfig from "../../../appConfig";
import { RootState } from "../store";
import { Coords, IUser, MyRoomsFetchResponse, RoomsFetchResponse } from "./types";
// import dotenv from "dotenv";

// dotenv.config();



const API_URL = `http://${appConfig.ip}:4040/api`;

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
  tagTypes: ["room", "user", "coords"],
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
      invalidatesTags: ['room']
    }),
    register: builder.mutation<{ message: string }, { name: string, login: string, password: string }>({
      query: ({ login, name, password }) => ({
        url: USER_API_PATH,
        method: 'POST',
        body: { name, login, password }
      })
    }),
    updateCoords: builder.mutation<{ message: string }, Coords>({
      query: (coords) => ({
        url: `${USER_API_PATH}/coords`,
        method: 'PATCH',
        body: { ...coords }
      }),
      invalidatesTags: ['coords']
    }),
    fetchUser: builder.query<{user: IUser[]}, { userId: string, i?: number }>({
      query: ({ userId, i }) => `${USER_API_PATH}/${userId}`,
      providesTags: ["user"]
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
    fetchUsersInfoFromRoom: builder.query<{ user: IUser[] }, string>({
      query: (roomPin) => `${USER_API_ROOMS}/filter/room-users-info/${roomPin}`,
      providesTags: ['user', 'coords']
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
    acceptUser: builder.mutation<{ message: string }, { roomId: string, userId: string }>({
      query: ({ roomId, userId }) => ({
        url: `${USER_API_ROOMS}/accept-user`,
        method: 'PATCH',
        body: { roomId, userId }
      }),
      invalidatesTags: ["room"]
    }),
    grantHost: builder.mutation<{ message: string }, { roomId: string, userId: string }>({
      query: ({ roomId, userId }) => ({
        url: `${USER_API_ROOMS}/grant-host`,
        method: 'PATCH',
        body: { roomId, userId }
      }),
      invalidatesTags: ["room"]
    }),

    deleteRequested: builder.mutation<{ message: string }, { roomId: string, userId: string }>({
      query: ({ roomId, userId }) => ({
        url: `${USER_API_ROOMS}/delete/requested`,
        method: 'DELETE',
        body: { roomId, userId }
      }),
      invalidatesTags: ["room"]
    }),
    deleteUser: builder.mutation<{ message: string }, { roomId: string, userId: string }>({
      query: ({ roomId, userId }) => ({
        url: `${USER_API_ROOMS}/delete/users`,
        method: 'DELETE',
        body: { roomId, userId }
      }),
      invalidatesTags: ["room"]
    }),
    deleteHost: builder.mutation<{ message: string }, { roomId: string, userId: string }>({
      query: ({ roomId, userId }) => ({
        url: `${USER_API_ROOMS}/delete/hosts`,
        method: 'DELETE',
        body: { roomId, userId }
      }),
      invalidatesTags: ["room"]
    }),
    leaveRoom: builder.mutation<{ message: string }, { roomId: string }>({
      query: ({ roomId }) => ({
        url: `${USER_API_ROOMS}/delete/self`,
        method: 'DELETE',
        body: { roomId }
      }),
      invalidatesTags: ["room"]
    }),

  }),
  
});

export const { 
  // check
  useGetStatusQuery,

  // user
  useFetchUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateCoordsMutation,

  //rooms
  useFetchRoomQuery,
  useFetchRoomByPinQuery,
  useFetchRoomsQuery,
  useFetchMyRoomsQuery,
  useFetchUsersInfoFromRoomQuery,
  useCreateRoomMutation,
  useJoinToRoomMutation,
  useDeleteRequestedMutation,
  useDeleteUserMutation,
  useDeleteHostMutation,
  useAcceptUserMutation,
  useGrantHostMutation,
  useLeaveRoomMutation,
} = apiSlice;
export default apiSlice;
