import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id: "0", name: "Tim" },
  { id: "1", name: "Bob" },
  { id: "2", name: "Alice" },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default usersSlice.reducer
