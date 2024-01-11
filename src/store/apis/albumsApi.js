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
      fetchPhotos: builder.query({
        providesTags: (result, err, album) => {
          const resultTags = result?.map(({ id }) => ({ type: "Photo", id }));
          return [
            {
              type: "PhotosAlbum",
              id: album?.id,
            },
            ...resultTags,
          ];
        },

        query: (album) => {
          return {
            url: `/photos`,
            method: "GET",
            params: { albumId: album.id },
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, err, album) => {
          return [
            {
              type: "PhotosAlbum",
              id: album.id,
            },
          ];
        },
        query: (album) => ({
          url: `/photos`,
          method: "POST",
          body: {
            albumId: album.id,
            title: faker.commerce.productName(),
            url: faker.image.imageUrl(),
            thumbnailUrl: faker.image.imageUrl(),
          },
        }),
      }),
      deletePhoto: builder.mutation({
        providesTags: (result, err, photo) => {
          return [
            {
              type: "Photo",
              id: photo.id,
            },
          ];
        },
        query: (arg) => {
          return {
            url: `/photos/${arg.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = albumsApi;
export { albumsApi };
