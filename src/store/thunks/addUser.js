import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "./commonFunctions";
import { faker } from "@faker-js/faker";
const addUser = createAsyncThunk("users/add", async () => {
  await pause(1000);
  const payload = { name: faker.name.fullName() };
  const response = await axios.post("http://localhost:3001/users", payload);
  //   const data = await response.json();
  return response.data;
});
export { addUser };
