import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reducer as usersReducer } from "./slices/userSlice";
import { albumsApi } from "./apis/albumsApi";
const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
});

setupListeners(store.dispatch);
export { store };
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/deleteUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} from "./apis/albumsApi";
