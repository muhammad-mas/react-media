import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  await pause(10000);
  const response = await axios.get("http://localhost:3001/users");
  //   const data = await response.json();
  return response.data;
});

//DEV Only
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//fetchUsers.pending
//fetchUsers.fulfilled
//fetchUsers.rejected
export { fetchUsers };
