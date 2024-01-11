import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../thunks/commonFunctions";
//reducer Path is used to specify the path/key that is stored in redux store .
const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, err, arg) => {
          const resultTag = result?.map(({ id }) => ({ type: "Album", id }));
          return [
            {
              type: "UsersAlbums",
              id: arg?.id,
            },
            ...resultTag,
          ];
        },
        query: (user) => ({
          url: "/albums",
          params: { userId: user.id },
          method: "GET",
        }),
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, err, arg) => {
          return [
            {
              type: "UsersAlbums",
              id: arg?.id,
            },
          ];
        },
        query: (user) => ({
          url: "/albums",
          method: "POST",
          body: {
            userId: user.id,
            title: faker.commerce.productName(),
          },
        }),
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, err, arg) => {
          return [
            {
              type: "Album",
              id: arg.id,
            },
          ];
        },
        query: (arg) => ({
          url: `/albums/${arg.id}`,
          method: "DELETE",
        }),
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
