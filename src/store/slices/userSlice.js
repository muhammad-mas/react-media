import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";
import { fetchUsers } from "../thunks/fetchUsers";

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // getUsers(state, action) {
    //   state.isLoading = true;
    // },
    // setUsers(state, action) {
    //   state.isLoading = false;
    //   state.data = action.payload;
    // },
    // setError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // addUser(state, action) {
    //   state.data.push(action.payload);
    // },
    // removeUser(state, action) {
    //   state.data = state.data.filter((user) => user.id !== action.payload);
    // },
    // updateUser(state, action) {
    //   const { id, name, email } = action.payload;
    //   const existingUser = state.users.find((user) => user.id === id);
    //   if (existingUser) {
    //     existingUser.name = name || existingUser.name;
    //     existingUser.email = email || existingUser.email;
    //   }
    // },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const reducer = usersSlice.reducer;
