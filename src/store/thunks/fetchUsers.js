import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./commonFunctions";
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  // await pause(1000);
  const response = await axios.get("http://localhost:3001/users");
  //   const data = await response.json();
  return response.data;
});

//DEV Only

//fetchUsers.pending
//fetchUsers.fulfilled
//fetchUsers.rejected
export { fetchUsers };
