import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./commonFunctions";

const deleteUser = createAsyncThunk("users/delete", async (userId) => {
  await pause(1000);
  console.log(userId, `http://localhost:3001/users/${userId}`);
  const response = await axios.delete(`http://localhost:3001/users/${userId}`);
  //   const data = await response.json();
  return userId;
});
export { deleteUser };
