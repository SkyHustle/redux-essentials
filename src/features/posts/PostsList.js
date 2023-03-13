import { Spinner } from "../../components/Spinner"
import { PostExcerpt } from "./PostExcerpt"
import { useGetPostsQuery } from "../api/apiSlice"

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery()

  let content
  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = posts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
