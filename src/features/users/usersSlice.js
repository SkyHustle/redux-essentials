import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id: "1", name: "Tim" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Alice" },
  { id: "4", name: "Jane" },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default usersSlice.reducer
