import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const myURL = "http://localhost:3100/connect";

const initialState = {
  status: "online",
  usersList: [
    {
      name: "Mitch",
      id: "1",
    },
    {
      name: "Phil",
      id: "2",
    },
  ],
};

export const listAllUsers = createAsyncThunk("users/listAllUsers", async () => {
  const response = await fetch(myURL);
  const usersList = await response.json();
  return usersList;
});

export const usersSlice = createSlice({
  name: "users",

  //state listed in variable at top of page
  initialState,

  //Reducers
  reducers: {
    fetchAllUsers: (state) => state.usersList,
  },
  extraReducers(builder) {
    // builder.addcase("users/listAllUsers/fulfilled", (state, action) => {
    //   state.usersList = action.payload;
    // });
  },
});

export const { fetchAllUsers } = usersSlice.actions;

export const fetchUsersList = createAsyncThunk(
  "users/fetchUsersList",
  async (req, res) => {
    console.log("starting fetUsersList")
    const response = await fetch("http://localhost:3100/users/get-all-users");
    console.log(response)
  }
);

export const selectAllUsers = (state) => state.users.usersList;

export default usersSlice.reducer;
