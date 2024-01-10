import { configureStore } from "@reduxjs/toolkit";
import { reducer as usersReducer } from "./slices/userSlice";
const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export { store };
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
