import {
  // createSlice,
  createSelector,
  // createAsyncThunk,
  // createEntityAdapter,
} from "@reduxjs/toolkit"
// import { client } from "../../api/client"

import { apiSlice } from "../api/apiSlice"

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   const response = await client.get("/fakeApi/users")
//   return response.data
// })

// const usersAdapter = createEntityAdapter()
// const initialState = usersAdapter.getInitialState()

// same object as apiSlice, important when using TypeScript
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
})

export const { useGetUsersQuery } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
)

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
)

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
//       usersAdapter.setAll(state, action.payload)
//     })
//   },
// })
//
// export default usersSlice.reducer
//
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors((state) => state.users)
