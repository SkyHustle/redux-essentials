import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"

const initialState = [
  {
    id: "1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    user: "1",
    title: "First Post!",
    content: "Contents of the first post",
  },
  {
    id: "2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    user: "2",
    title: "Second Post",
    content: "Contents of the second post",
  },
]

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
