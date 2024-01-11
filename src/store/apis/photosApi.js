import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../thunks/commonFunctions";
const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    fetchFn: async (...args) => {
      //   await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, err, album) => {
          const resultTags = result?.map(({ id }) => ({ type: "Photo", id }));
          console.log(resultTags);
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
            url: faker.image.abstract(150, 150, true),
            thumbnailUrl: faker.image.abstract(150, 150, true),
          },
        }),
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, err, photo) => {
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
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;

export default photosApi;
