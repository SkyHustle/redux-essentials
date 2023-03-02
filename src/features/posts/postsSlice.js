import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import { client } from "../../api/client"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts")
  return response.data
})

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post("/fakeApi/posts", initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated(state, action) {
      postsAdapter.updateOne(state, action.payload)
    },
    postDeleted(state, action) {
      postsAdapter.removeOne(state, action.payload.id)
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload
      const reactions = state.entities[id].reactions
      const updatedReactionCount = reactions[reaction] + 1
      postsAdapter.updateOne(state, {
        id,
        changes: {
          reactions: {
            ...reactions,
            [reaction]: updatedReactionCount,
          },
        },
      })
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload)
      })
  },
})

export const { postUpdated, postDeleted, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities,
  selectTotal,
} = postsAdapter.getSelectors((state) => state.posts)
