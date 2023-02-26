import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import { client } from "../../api/client"

// import { sub } from "date-fns"
// const initialState = [
//   {
//     id: "1",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     user: "1",
//     title: "First Post!",
//     content: "Contents of the first post",
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   },
//   {
//     id: "2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     user: "2",
//     title: "Second Post",
//     content: "Contents of the second post",
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   },
// ]

const initialState = {
  posts: [],
  status: "pending",
  error: null,
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts")
  return response.data
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    postDeleted(state, action) {
      return state.posts.filter((post) => post.id !== action.payload.id)
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
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
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { postAdded, postUpdated, reactionAdded, postDeleted } =
  postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
