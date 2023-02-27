import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts } from "./postsSlice"
import { Spinner } from "../../components/Spinner"
import { PostExcerpt } from "./PostExcerpt"

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.posts)
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === "pending") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === "loading") {
    content = <Spinner text="Loading..." />
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === "failed") {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
